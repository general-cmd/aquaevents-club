import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://aquaevents.club';

// Static pages
const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/eventos', changefreq: 'daily', priority: '0.9' },
  { url: '/federaciones', changefreq: 'weekly', priority: '0.8' },
  { url: '/blog', changefreq: 'weekly', priority: '0.8' },
  { url: '/enviar-evento', changefreq: 'monthly', priority: '0.7' },
];

// Generate sitemap XML
const generateSitemap = () => {
  const urls = staticPages.map(page => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return xml;
};

// Write sitemap to public directory
const sitemap = generateSitemap();
const outputPath = join(__dirname, '../client/public/sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`✅ Static sitemap generated at ${outputPath}`);

