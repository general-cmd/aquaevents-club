import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import compression from "compression";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import eventsRouter from "../routes/events";
import uploadImageRouter from "../routes/upload-image";
import sitemapRouter from "../sitemap";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // Trust proxy for Railway/Heroku (needed for rate limiting and HTTPS detection)
  app.set('trust proxy', 1);
  // Gzip compression for all responses (60-80% size reduction)
  app.use(compression({
    level: 6, // Compression level (0-9, 6 is default balance between speed and compression)
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req, res) => {
      // Don't compress if client doesn't support it
      if (req.headers['x-no-compression']) {
        return false;
      }
      // Use compression for all other responses
      return compression.filter(req, res);
    }
  }));

  // Security headers to prevent scraping and attacks
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP to allow inline scripts (needed for analytics)
    crossOriginEmbedderPolicy: false, // Allow embedding resources from other origins
  }));

  // Rate limiting to prevent scraping and abuse
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // Max 100 requests per hour per IP
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    // Skip rate limiting for static assets
    skip: (req) => {
      return !!req.path.match(/\.(css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot)$/);
    },
    // Use X-Forwarded-For header for IP detection (Railway uses proxies)
    validate: { trustProxy: true },
  });
  app.use(limiter);

  // Block known scraper bots
  app.use((req, res, next) => {
    const userAgent = req.get('user-agent') || '';
    const scraperPatterns = [
      /scrapy/i,
      /crawler/i,
      /spider/i,
      /bot/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python-requests/i,
      /axios/i,
      /node-fetch/i,
    ];
    
    // Allow legitimate bots (Google, Bing, etc.)
    const legitimateBots = [
      /googlebot/i,
      /bingbot/i,
      /slurp/i, // Yahoo
      /duckduckbot/i,
      /baiduspider/i,
      /yandexbot/i,
      /facebookexternalhit/i,
      /twitterbot/i,
      /linkedinbot/i,
    ];
    
    const isLegitimateBot = legitimateBots.some(pattern => pattern.test(userAgent));
    const isScraper = scraperPatterns.some(pattern => pattern.test(userAgent));
    
    if (isScraper && !isLegitimateBot) {
      console.log('[Anti-Scraping] Blocked suspicious user-agent:', userAgent);
      return res.status(403).json({ error: 'Access denied' });
    }
    
    next();
  });

  // WWW to non-WWW redirect (SEO best practice)
  // Also enforce HTTPS in production
  app.use((req, res, next) => {
    const host = req.get('host');
    // Use X-Forwarded-Proto to detect real protocol (Railway uses proxies)
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Redirect www to non-www
    if (host && host.startsWith('www.')) {
      const newHost = host.replace(/^www\./, '');
      const targetProtocol = isProduction ? 'https' : protocol;
      return res.redirect(301, `${targetProtocol}://${newHost}${req.originalUrl}`);
    }
    
    // Redirect HTTP to HTTPS in production
    if (isProduction && protocol === 'http') {
      return res.redirect(301, `https://${host}${req.originalUrl}`);
    }
    
    next();
  });

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Sitemap and robots.txt MUST be registered first (before any catch-all routes)
  app.use("", sitemapRouter);
  
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Events API
  app.use("/api/events", eventsRouter);
  // Image upload API
  app.use("/api/upload-image", uploadImageRouter);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Global error handling middleware (must be last)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[Server Error]', err);
    
    // Don't expose internal errors to clients
    const statusCode = err.statusCode || err.status || 500;
    const message = process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message || 'Something went wrong';
    
    res.status(statusCode).json({
      error: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  });

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
