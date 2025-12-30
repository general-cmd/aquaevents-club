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
      // Use process.cwd() for Railway compatibility
      const clientTemplate = path.resolve(
        process.cwd(),
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      // Server-side schema injection removed - all schemas now handled client-side
      // for proper multilingual support and dynamic content

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

            // Add isRelatedTo for Event → Product SEO connection
            structuredData["isRelatedTo"] = [
              {
                "@type": "Product",
                "name": "Gorros de Natación Personalizados",
                "category": "Sports Equipment",
                "url": "https://aquaevents.club/gorros-natacion"
              }
            ];

            // Add FAQ schema for swim caps (AI-SEO + Featured Snippets)
            const faqSchema = {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "¿Se usan gorros de natación personalizados en este evento?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `En eventos de ${event.discipline === 'swimming' ? 'natación' : event.discipline === 'open_water' ? 'aguas abiertas' : event.discipline === 'triathlon' ? 'triatlón' : 'deportes acuáticos'} como ${event.name.es}, es habitual el uso de gorros de natación personalizados para identificar categorías, clubes o patrocinadores. Los organizadores suelen optar por gorros de silicona con logo para competidores y staff.`
                  }
                }
              ]
            };

            const eventSchemaTag = `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
            const faqSchemaTag = `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
            template = template.replace('</head>', `${eventSchemaTag}${faqSchemaTag}</head>`);
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
  // Use process.cwd() for Railway compatibility instead of import.meta.dirname
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(process.cwd(), "dist", "public")
      : path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  // Skip for API routes, sitemap, and robots.txt (handled by routers registered earlier)
  app.use("*", async (req, res, next) => {
    // Don't serve index.html for API routes
    if (req.originalUrl.startsWith('/api/')) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    // Skip sitemap and robots - they are handled by dedicated router before this middleware
    if (req.originalUrl === '/sitemap.xml' || req.originalUrl === '/robots.txt') {
      // If we reach here, the router didn't handle it, so return 404
      return res.status(404).send('Not found');
    }

    const url = req.originalUrl;
    const indexPath = path.resolve(distPath, "index.html");

    // Server-side schema injection removed for gorros-natacion pages
    // All schemas now handled client-side for proper multilingual support

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

          // Add isRelatedTo for Event → Product SEO connection
          structuredData["isRelatedTo"] = [
            {
              "@type": "Product",
              "name": "Gorros de Natación Personalizados",
              "category": "Sports Equipment",
              "url": "https://aquaevents.club/gorros-natacion"
            }
          ];

          // Add FAQ schema for swim caps (AI-SEO + Featured Snippets)
          const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Se usan gorros de natación personalizados en este evento?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `En eventos de ${event.discipline === 'swimming' ? 'natación' : event.discipline === 'open_water' ? 'aguas abiertas' : event.discipline === 'triathlon' ? 'triatlón' : 'deportes acuáticos'} como ${event.name.es}, es habitual el uso de gorros de natación personalizados para identificar categorías, clubes o patrocinadores. Los organizadores suelen optar por gorros de silicona con logo para competidores y staff.`
                }
              }
            ]
          };

          const eventSchemaTag = `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
          const faqSchemaTag = `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
          html = html.replace('</head>', `${eventSchemaTag}${faqSchemaTag}</head>`);
          
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
