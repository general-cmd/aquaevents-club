import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { getEventBySlug } from "../services/mongodb";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      // Inject structured data for event pages
      const eventMatch = url.match(/^\/eventos?\/([^?#]+)/);
      if (eventMatch) {
        const slug = decodeURIComponent(eventMatch[1]);
        console.log('[SSR] Matched event URL:', url, 'slug:', slug);
        try {
          const event = await getEventBySlug(slug);
          console.log('[SSR] Event found:', !!event, event ? event.name?.es : 'N/A');
          if (event) {
            const structuredData: any = {
              "@context": "https://schema.org",
              "@type": "SportsEvent",
              "name": event.name.es,
              "startDate": event.date,
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": event.location.venue || event.location.city,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": event.location.city,
                  "addressRegion": event.location.region,
                  "addressCountry": "ES"
                }
              },
              "image": "https://aquaevents.club/logo.svg",
              "description": event.description?.es || `${event.name.es} en ${event.location.city}, ${event.location.region}`,
              "organizer": {
                "@type": "Organization",
                "name": "AquaEvents.club",
                "url": "https://aquaevents.club"
              }
            };

            if (event.registrationUrl) {
              structuredData["url"] = event.registrationUrl;
              structuredData["offers"] = {
                "@type": "Offer",
                "url": event.registrationUrl,
                "availability": "https://schema.org/InStock"
              };
            }

            if (event.contact?.email) {
              structuredData.organizer["email"] = event.contact.email;
            }

            if (event.contact?.phone) {
              structuredData.organizer["telephone"] = event.contact.phone;
            }

            const scriptTag = `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
            template = template.replace('</head>', `${scriptTag}</head>`);
          }
        } catch (err) {
          console.error('[SSR] Error injecting event structured data:', err);
        }
      }

      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  // Skip for API routes (sitemap and robots.txt are handled before this)
  app.use("*", async (req, res) => {
    // Don't serve index.html for API routes
    if (req.originalUrl.startsWith('/api/')) {
      return res.status(404).json({ error: 'Not found' });
    }

    const url = req.originalUrl;
    const indexPath = path.resolve(distPath, "index.html");

    // Inject structured data for event pages in production
    const eventMatch = url.match(/^\/eventos?\/([^?#]+)/);
    if (eventMatch) {
      const slug = decodeURIComponent(eventMatch[1]);
      console.log('[SSR Production] Matched event URL:', url, 'slug:', slug);
      try {
        const event = await getEventBySlug(slug);
        console.log('[SSR Production] Event found:', !!event, event ? event.name?.es : 'N/A');
        if (event) {
          // Read the index.html file
          let html = await fs.promises.readFile(indexPath, 'utf-8');
          
          const structuredData: any = {
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            "name": event.name.es,
            "startDate": event.date,
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": event.location.venue || event.location.city,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": event.location.city,
                "addressRegion": event.location.region,
                "addressCountry": "ES"
              }
            },
            "image": "https://aquaevents.club/logo.svg",
            "description": event.description?.es || `${event.name.es} en ${event.location.city}, ${event.location.region}`,
            "organizer": {
              "@type": "Organization",
              "name": "AquaEvents.club",
              "url": "https://aquaevents.club"
            }
          };

          if (event.registrationUrl) {
            structuredData["url"] = event.registrationUrl;
            structuredData["offers"] = {
              "@type": "Offer",
              "url": event.registrationUrl,
              "availability": "https://schema.org/InStock"
            };
          }

          if (event.contact?.email) {
            structuredData.organizer["email"] = event.contact.email;
          }

          if (event.contact?.phone) {
            structuredData.organizer["telephone"] = event.contact.phone;
          }

          const scriptTag = `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
          html = html.replace('</head>', `${scriptTag}</head>`);
          
          return res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
        }
      } catch (err) {
        console.error('[SSR Production] Error injecting event structured data:', err);
      }
    }

    // Default: serve index.html without modification
    res.sendFile(indexPath);
  });
}
