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

      // Inject structured data for swimming caps page
      if (url.startsWith('/gorros-natacion')) {
        const productSchema = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Gorros de Natación Personalizados para Competición",
          "description": "Gorros de silicona personalizados para eventos deportivos, clubes de natación y competiciones. 25 años de experiencia, más de 1 millón de gorros producidos. Envío gratis a toda Europa.",
          "image": [
            "https://aquaevents.club/gorros-piscina-personalizados-competicion-3.jpg",
            "https://aquaevents.club/gorros-natacion-personalizados-50-unidades-5.jpg",
            "https://aquaevents.club/gorros-natacion-personalizados-eventos-6.jpg"
          ],
          "brand": {
            "@type": "Brand",
            "name": "EuroSwimCaps"
          },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "2.30",
            "highPrice": "11.00",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2026-12-31",
            "offerCount": "7"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "500"
          },
          "category": "Equipamiento Deportivo > Natación"
        };

        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Cuál es el pedido mínimo de gorros personalizados?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "El pedido mínimo es de 50 unidades. Para clubes pequeños o eventos con menos participantes, podemos ofrecer soluciones alternativas como gorros de stock con pegatinas personalizadas."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuánto tarda la producción de gorros personalizados?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "El plazo estándar es de 10-15 días laborables desde la aprobación del diseño. Ofrecemos servicio express de 7 días con un recargo del 20%. Para pedidos urgentes, consúltanos disponibilidad."
              }
            },
            {
              "@type": "Question",
              "name": "¿Los gorros son aptos para competiciones oficiales?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, nuestros gorros cumplen con todas las normativas de FINA (World Aquatics) y RFEN. Son utilizados en campeonatos autonómicos, nacionales e internacionales sin ningún problema."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuánto cuestan los gorros de natación personalizados?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Los precios van desde 5,55€ por unidad (50 unidades) hasta 2,30€ por unidad (2.000+ unidades). Incluyen diseño personalizado, impresión y envío gratis a península. Ofrecemos descuentos para pedidos recurrentes."
              }
            },
            {
              "@type": "Question",
              "name": "¿Ofrecen descuentos para pedidos recurrentes?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, clubes y organizadores de eventos anuales reciben descuentos especiales de hasta el 15% en pedidos recurrentes. Además, almacenamos tu diseño para futuras reposiciones sin coste adicional."
              }
            }
          ]
        };

        // Review schema for testimonials (AI-SEO)
        const reviewSchemas = [
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Product",
              "name": "Gorros de Natación Personalizados"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Laura Martínez"
            },
            "reviewBody": "Comunicación excelente por teléfono y email. Gorros de silicona con impresión a 2 colores, aspecto y tacto geniales. Necesitábamos entrega urgente y llegaron según lo solicitado."
          },
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Product",
              "name": "Gorros de Natación Personalizados"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Organization",
              "name": "CN Sabadell"
            },
            "reviewBody": "Producto fantástico y servicio muy eficiente. Recomendado para todos los clubes."
          },
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Product",
              "name": "Gorros de Natación Personalizados"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Organization",
              "name": "CN Barcelona"
            },
            "reviewBody": "Pedimos 250 gorros y fueron brillantes en todo momento. Cambiamos el diseño varias veces y no hubo problema. Los gorros son exactamente lo que queríamos y la calidad es excelente."
          }
        ];

        const metaTags = `
    <title>Gorros de Natación Personalizados al Por Mayor – 50+ Unidades | AquaEvents</title>
    <meta name="description" content="Compra gorros de natación personalizados en España. Silicona premium con logo, mínimo 50 unidades, desde 2,30€. 25 años de experiencia, +1M gorros producidos. Envío gratis UE." />
    <meta name="keywords" content="gorros de natación personalizados, gorros natación personalizados al por mayor, gorros de natación con logo, gorros natación 50 unidades, gorros piscina personalizados, gorros silicona personalizados" />
    <link rel="canonical" href="https://aquaevents.club/gorros-natacion" />
    <meta property="og:title" content="Gorros de Natación Personalizados al Por Mayor – 50+ Unidades" />
    <meta property="og:description" content="25 años fabricando gorros de silicona para eventos y clubes. Más de 1 millón producidos. Envío gratis UE." />
    <meta property="og:image" content="https://aquaevents.club/gorros-piscina-personalizados-competicion-3.jpg" />
    <meta property="og:url" content="https://aquaevents.club/gorros-natacion" />
    <script type="application/ld+json">${JSON.stringify(productSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    ${reviewSchemas.map(r => `<script type="application/ld+json">${JSON.stringify(r)}</script>`).join('\n    ')}`;
        
        template = template.replace('</head>', metaTags + '</head>');
      }

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

    // Inject structured data for swimming caps page in production
    if (url.startsWith('/gorros-natacion')) {
      try {
        let html = await fs.promises.readFile(indexPath, 'utf-8');
        
        const productSchema = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Gorros de Natación Personalizados para Competición",
          "description": "Gorros de silicona personalizados para eventos deportivos, clubes de natación y competiciones. 25 años de experiencia, más de 1 millón de gorros producidos. Envío gratis a toda Europa.",
          "image": [
            "https://aquaevents.club/gorros-piscina-personalizados-competicion-3.jpg",
            "https://aquaevents.club/gorros-natacion-personalizados-50-unidades-5.jpg",
            "https://aquaevents.club/gorros-natacion-personalizados-eventos-6.jpg"
          ],
          "brand": {
            "@type": "Brand",
            "name": "EuroSwimCaps"
          },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "2.30",
            "highPrice": "11.00",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2026-12-31",
            "offerCount": "7"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "500"
          },
          "category": "Equipamiento Deportivo > Natación"
        };

        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Cuál es el pedido mínimo de gorros personalizados?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "El pedido mínimo es de 50 unidades. Para clubes pequeños o eventos con menos participantes, podemos ofrecer soluciones alternativas como gorros de stock con pegatinas personalizadas."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuánto tarda la producción de gorros personalizados?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "El plazo estándar es de 10-15 días laborables desde la aprobación del diseño. Ofrecemos servicio express de 7 días con un recargo del 20%. Para pedidos urgentes, consúltanos disponibilidad."
              }
            },
            {
              "@type": "Question",
              "name": "¿Los gorros son aptos para competiciones oficiales?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, nuestros gorros cumplen con todas las normativas de FINA (World Aquatics) y RFEN. Son utilizados en campeonatos autonómicos, nacionales e internacionales sin ningún problema."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuánto cuestan los gorros de natación personalizados?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Los precios van desde 5,55€ por unidad (50 unidades) hasta 2,30€ por unidad (2.000+ unidades). Incluyen diseño personalizado, impresión y envío gratis a península. Ofrecemos descuentos para pedidos recurrentes."
              }
            },
            {
              "@type": "Question",
              "name": "¿Ofrecen descuentos para pedidos recurrentes?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, clubes y organizadores de eventos anuales reciben descuentos especiales de hasta el 15% en pedidos recurrentes. Además, almacenamos tu diseño para futuras reposiciones sin coste adicional."
              }
            }
          ]
        };

        // Review schema for testimonials (AI-SEO)
        const reviewSchemas = [
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Product",
              "name": "Gorros de Natación Personalizados"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Laura Martínez"
            },
            "reviewBody": "Comunicación excelente por teléfono y email. Gorros de silicona con impresión a 2 colores, aspecto y tacto geniales. Necesitábamos entrega urgente y llegaron según lo solicitado."
          },
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Product",
              "name": "Gorros de Natación Personalizados"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Organization",
              "name": "CN Sabadell"
            },
            "reviewBody": "Producto fantástico y servicio muy eficiente. Recomendado para todos los clubes."
          },
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Product",
              "name": "Gorros de Natación Personalizados"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Organization",
              "name": "CN Barcelona"
            },
            "reviewBody": "Pedimos 250 gorros y fueron brillantes en todo momento. Cambiamos el diseño varias veces y no hubo problema. Los gorros son exactamente lo que queríamos y la calidad es excelente."
          }
        ];

        const metaTags = `
    <title>Gorros de Natación Personalizados al Por Mayor – 50+ Unidades | AquaEvents</title>
    <meta name="description" content="Compra gorros de natación personalizados en España. Silicona premium con logo, mínimo 50 unidades, desde 2,30€. 25 años de experiencia, +1M gorros producidos. Envío gratis UE." />
    <meta name="keywords" content="gorros de natación personalizados, gorros natación personalizados al por mayor, gorros de natación con logo, gorros natación 50 unidades, gorros piscina personalizados, gorros silicona personalizados" />
    <link rel="canonical" href="https://aquaevents.club/gorros-natacion" />
    <meta property="og:title" content="Gorros de Natación Personalizados al Por Mayor – 50+ Unidades" />
    <meta property="og:description" content="25 años fabricando gorros de silicona para eventos y clubes. Más de 1 millón producidos. Envío gratis UE." />
    <meta property="og:image" content="https://aquaevents.club/gorros-piscina-personalizados-competicion-3.jpg" />
    <meta property="og:url" content="https://aquaevents.club/gorros-natacion" />
    <script type="application/ld+json">${JSON.stringify(productSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    ${reviewSchemas.map(r => `<script type="application/ld+json">${JSON.stringify(r)}</script>`).join('\n    ')}`;
        
        html = html.replace('</head>', metaTags + '</head>');
        return res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
      } catch (err) {
        console.error('[SSR Production] Error injecting swimming caps structured data:', err);
      }
    }

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
