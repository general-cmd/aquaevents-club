/**
 * XML Sitemap Generation for Google Search Console
 * 
 * Generates a dynamic sitemap.xml with:
 * - Static pages
 * - All published events
 * - All blog posts
 * - All federation pages
 */

import { Router } from 'express';
import { getEvents, getPublishedBlogPosts, getAllFederations } from './db';

const router = Router();

const BASE_URL = 'https://aquaevents.club';

/**
 * Generate XML sitemap
 */
/**
 * Serve robots.txt
 */
router.get('/robots.txt', (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${BASE_URL}/sitemap.xml`;
  
  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

/**
 * Generate XML sitemap
 */
router.get('/sitemap.xml', async (req, res) => {
  try {
    // Static pages with priority and change frequency
    const staticPages = [
      { url: '/', changefreq: 'daily', priority: '1.0' },
      { url: '/eventos', changefreq: 'daily', priority: '0.9' },
      { url: '/federaciones', changefreq: 'weekly', priority: '0.8' },
      { url: '/blog', changefreq: 'weekly', priority: '0.8' },
      { url: '/enviar-evento', changefreq: 'monthly', priority: '0.7' },
    ];

    // Fetch dynamic content
    const events = await getEvents(1000); // Get up to 1000 events
    const blogPosts = await getPublishedBlogPosts();
    const federations = await getAllFederations();

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    for (const page of staticPages) {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    }

    // Add events
    for (const event of events) {
      // Extract slug from canonical URL if available
      let eventUrl = `/evento/${encodeURIComponent(String(event._id))}`;
      
      if (event.seo?.canonical) {
        // If canonical is full URL, extract path
        if (event.seo.canonical.startsWith('http')) {
          try {
            const url = new URL(event.seo.canonical);
            eventUrl = url.pathname;
          } catch {
            // Fallback to regex if URL parsing fails
            const match = event.seo.canonical.match(/\/eventos?\/([^?#]+)/);
            if (match) {
              eventUrl = `/eventos/${match[1]}`;
            }
          }
        } else {
          // If canonical is relative path, use it directly
          eventUrl = event.seo.canonical;
        }
      }
      
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}${eventUrl}</loc>\n`;
      xml += `    <lastmod>${new Date(event.updatedAt || event.date).toISOString().split('T')[0]}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    }

    // Add blog posts
    for (const post of blogPosts) {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/blog/${encodeURIComponent(post.slug)}</loc>\n`;
      if (post.publishedAt) {
        xml += `    <lastmod>${new Date(post.publishedAt).toISOString().split('T')[0]}</lastmod>\n`;
      }
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    }

    // Add federation pages
    for (const federation of federations) {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/federacion/${encodeURIComponent(federation.id)}</loc>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    }

    xml += '</urlset>';

    // Set proper headers for XML
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(xml);

    console.log(`[Sitemap] Generated with ${staticPages.length} static pages, ${events.length} events, ${blogPosts.length} blog posts, ${federations.length} federations`);
  } catch (error) {
    console.error('[Sitemap] Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

export default router;

