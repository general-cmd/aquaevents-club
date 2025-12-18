import { Router } from "express";
import { getEventsCollection } from "./services/mongodb";

const router = Router();

/**
 * Dynamic XML Sitemap Generator
 * Generates sitemap with all static pages + dynamic event pages
 */
router.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = "https://aquaevents.club";
    const currentDate = new Date().toISOString().split("T")[0];

    // Static pages with priority and change frequency
    const staticPages = [
      { url: "/", changefreq: "daily", priority: "1.0", lastmod: currentDate },
      { url: "/eventos", changefreq: "daily", priority: "0.9", lastmod: currentDate },
      { url: "/federaciones", changefreq: "weekly", priority: "0.8", lastmod: currentDate },
      { url: "/blog", changefreq: "weekly", priority: "0.7", lastmod: currentDate },
      { url: "/enviar-evento", changefreq: "monthly", priority: "0.6", lastmod: currentDate },
      { url: "/perfil", changefreq: "monthly", priority: "0.5", lastmod: currentDate },
    ];

    // Fetch ONLY FUTURE events from MongoDB (SEO best practice)
    let eventPages: Array<{ url: string; changefreq: string; priority: string; lastmod: string }> = [];

    try {
      const eventsCollection = await getEventsCollection();
      const now = new Date();
      
      // Filter: only events with startDate >= today OR date >= today
      const futureEvents = await eventsCollection.find({
        $or: [
          { startDate: { $gte: now } },
          { date: { $gte: now } }
        ]
      }).toArray();
      
      eventPages = futureEvents
        .filter(event => event.seo?.canonical) // Only include events with canonical URLs
        .map((event) => {
          // Extract slug from canonical URL
          const canonicalUrl = event.seo.canonical;
          const urlPath = canonicalUrl.replace('https://aquaevents.club', '');
          
          const eventDate = new Date(event.startDate || event.date);
          const lastmod = event.updatedAt 
            ? new Date(event.updatedAt).toISOString().split("T")[0]
            : currentDate;

          return {
            url: urlPath,
            changefreq: "weekly",
            priority: "0.8",
            lastmod,
          };
        });
    } catch (error) {
      console.error("[Sitemap] Error fetching events from MongoDB:", error);
      // Continue with static pages only if MongoDB fails
    }

    // Combine all pages
    const allPages = [...staticPages, ...eventPages];

    // Helper function to escape XML entities
    const escapeXml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(baseUrl + page.url)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("[Sitemap] Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});

/**
 * Robots.txt Generator
 * Tells search engines which pages to crawl
 */
router.get("/robots.txt", (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://aquaevents.club/sitemap.xml`;
  
  res.header("Content-Type", "text/plain");
  res.send(robotsTxt);
});

export default router;
