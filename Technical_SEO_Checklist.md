# Technical SEO Implementation Checklist

## Priority 1: Implement This Week (High Impact, Medium Effort)

### 1. Add Event Schema Markup to All Event Pages

**Why**: Google shows rich snippets for events in search results (date, location, price). This makes your listings stand out and increases click-through rate by 20-30%.

**How to implement**:

```javascript
// Add this JSON-LD schema to each event page
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "Campeonato de España de Natación en Piscina Corta 2025",
  "description": "Campeonato nacional de natación en piscina de 25 metros",
  "startDate": "2025-12-15T09:00:00+01:00",
  "endDate": "2025-12-18T18:00:00+01:00",
  "location": {
    "@type": "Place",
    "name": "Centro Acuático M-86",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Mondragón 8",
      "addressLocality": "Madrid",
      "addressRegion": "Madrid",
      "postalCode": "28029",
      "addressCountry": "ES"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Real Federación Española de Natación",
    "url": "https://rfen.es"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://aquaevents.club/eventos/campeonato-espana-natacion-piscina-corta-2025",
    "price": "15",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-10-01T00:00:00+01:00"
  },
  "image": "https://aquaevents.club/images/campeonato-espana-piscina-corta.jpg",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
}
</script>
```

**Test**: Use Google's Rich Results Test (https://search.google.com/test/rich-results) to verify schema is valid.

---

### 2. Optimize Meta Titles and Descriptions

**Why**: Meta titles and descriptions are the first thing users see in search results. Well-optimized metas can increase CTR by 15-25%.

**Current issue**: Many pages probably have generic or missing meta descriptions.

**Best practices**:
- **Title**: 55-60 characters, include primary keyword, add year
- **Description**: 150-160 characters, include secondary keywords, add call-to-action

**Examples**:

```html
<!-- Homepage -->
<title>Calendario de Eventos Acuáticos en España 2025 | Natación, Triatlón</title>
<meta name="description" content="Descubre más de 500 eventos de natación, triatlón y deportes acuáticos en España 2025. Calendario completo con fechas, ubicaciones e inscripciones. ¡Encuentra tu próximo reto!">

<!-- Events page -->
<title>Eventos de Natación en España 2025 - Competiciones y Travesías</title>
<meta name="description" content="Explora el calendario completo de eventos de natación en España: campeonatos RFEN, travesías en aguas abiertas, competiciones máster. Filtrar por región y disciplina.">

<!-- Blog post -->
<title>Guía Completa de Eventos de Natación en España 2025 | AquaEvents</title>
<meta name="description" content="Todo lo que necesitas saber sobre eventos de natación en España: tipos de competiciones, cómo participar, costes, calendario 2025. Guía definitiva para nadadores.">
```

---

### 3. Create and Submit XML Sitemap

**Why**: Helps Google discover and index all your pages faster. Essential for new content to appear in search results quickly.

**How to implement**:

1. Generate sitemap with all URLs (events, blog posts, static pages)
2. Submit to Google Search Console (https://search.google.com/search-console)
3. Update sitemap weekly as new events are added

**Sitemap structure**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aquaevents.club/</loc>
    <lastmod>2025-11-30</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://aquaevents.club/eventos</loc>
    <lastmod>2025-11-30</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aquaevents.club/blog/guia-eventos-natacion-espana-2025</loc>
    <lastmod>2025-11-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add all event pages with priority 0.7 -->
  <!-- Add all blog posts with priority 0.8 -->
</urlset>
```

---

### 4. Add Internal Links from Blog Posts to Event Calendar

**Why**: Internal links distribute "link juice" and help Google understand site structure. Also keeps users on your site longer.

**Strategy**:
- Every blog post should link to the event calendar 3-5 times
- Use descriptive anchor text with keywords
- Link to specific filtered views (e.g., "eventos de natación en Cataluña")

**Examples**:

```markdown
<!-- In blog post about swimming events -->
Para ver todos los [eventos de natación en España 2025](https://aquaevents.club/eventos?discipline=natacion), 
visita nuestro calendario completo.

Si buscas competiciones en tu región, consulta los 
[eventos de natación en Cataluña](https://aquaevents.club/eventos?region=cataluna&discipline=natacion).

¿Interesado en aguas abiertas? Descubre las mejores 
[travesías de natación en España](https://aquaevents.club/eventos?discipline=natacion&type=aguas-abiertas).
```

---

### 5. Optimize Images with Alt Text and Compression

**Why**: Images slow down page load (hurts SEO) and missing alt text means lost opportunities for image search rankings.

**Checklist**:
- [ ] Compress all images to <100KB (use TinyPNG or similar)
- [ ] Convert to WebP format for better compression
- [ ] Add descriptive alt text with keywords
- [ ] Use lazy loading for images below the fold

**Examples**:

```html
<!-- Bad -->
<img src="event.jpg">

<!-- Good -->
<img src="campeonato-espana-natacion-2025.webp" 
     alt="Nadadores compitiendo en el Campeonato de España de Natación en Piscina Corta 2025" 
     loading="lazy"
     width="800" 
     height="600">
```

---

## Priority 2: Implement Next Week (Medium Impact, Low Effort)

### 6. Add FAQ Schema to Blog Posts

**Why**: FAQ schema can trigger "People Also Ask" boxes in Google, giving you extra visibility in search results.

**Example**:

```javascript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "¿Necesito ser federado para participar en travesías en aguas abiertas?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "No necesariamente. Las travesías populares organizadas por clubes, ayuntamientos o empresas privadas suelen estar abiertas a nadadores no federados. Solo necesitas pagar la inscripción y presentar un certificado médico."
    }
  }, {
    "@type": "Question",
    "name": "¿Cuánto tiempo necesito entrenar para participar en mi primera competición?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Si ya nadas regularmente (2-3 veces por semana) y dominas los estilos básicos, podrías participar en una travesía corta (500-1000 metros) con 4-6 semanas de preparación específica."
    }
  }]
}
</script>
```

---

### 7. Create Breadcrumb Navigation

**Why**: Helps users navigate and helps Google understand site hierarchy. Can appear in search results as breadcrumb trails.

**Example**:

```html
<!-- Visual breadcrumb -->
<nav aria-label="breadcrumb">
  <ol>
    <li><a href="/">Inicio</a></li>
    <li><a href="/blog">Blog</a></li>
    <li>Guía de Eventos de Natación</li>
  </ol>
</nav>

<!-- BreadcrumbList schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Inicio",
    "item": "https://aquaevents.club/"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Blog",
    "item": "https://aquaevents.club/blog"
  }, {
    "@type": "ListItem",
    "position": 3,
    "name": "Guía de Eventos de Natación",
    "item": "https://aquaevents.club/blog/guia-eventos-natacion-espana-2025"
  }]
}
</script>
```

---

### 8. Add "Last Updated" Dates to Blog Posts

**Why**: Google and ChatGPT prioritize fresh content. Showing update dates signals that content is current.

**Implementation**:

```html
<!-- Add to top of blog posts -->
<p class="text-sm text-gray-600">
  <strong>Última actualización:</strong> 30 de noviembre de 2025
</p>

<!-- Add to Article schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guía Completa de Eventos de Natación en España 2025",
  "datePublished": "2025-11-30",
  "dateModified": "2025-11-30",
  "author": {
    "@type": "Person",
    "name": "Bruno - AquaEvents.club"
  }
}
</script>
```

---

### 9. Implement Canonical URLs

**Why**: Prevents duplicate content issues if same event appears in multiple filtered views.

**Example**:

```html
<!-- On event detail page -->
<link rel="canonical" href="https://aquaevents.club/eventos/campeonato-espana-natacion-2025">

<!-- On filtered calendar view -->
<link rel="canonical" href="https://aquaevents.club/eventos">
```

---

### 10. Add Social Media Open Graph Tags

**Why**: When people share your links on Facebook/Twitter/LinkedIn, these tags control how the preview looks. Better previews = more clicks.

**Example**:

```html
<!-- Open Graph tags -->
<meta property="og:title" content="Calendario de Eventos Acuáticos en España 2025">
<meta property="og:description" content="Descubre más de 500 eventos de natación, triatlón y deportes acuáticos en España.">
<meta property="og:image" content="https://aquaevents.club/images/og-image.jpg">
<meta property="og:url" content="https://aquaevents.club/">
<meta property="og:type" content="website">

<!-- Twitter Card tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Calendario de Eventos Acuáticos en España 2025">
<meta name="twitter:description" content="Descubre más de 500 eventos de natación, triatlón y deportes acuáticos.">
<meta name="twitter:image" content="https://aquaevents.club/images/twitter-card.jpg">
```

---

## Priority 3: Implement This Month (High Impact, High Effort)

### 11. Improve Page Speed to <1.5 Seconds

**Current issue**: RFEN's site loads in 3-4 seconds. If you load in <1.5s, Google will favor you.

**Checklist**:
- [ ] Minify CSS and JavaScript
- [ ] Enable browser caching (cache static assets for 1 year)
- [ ] Use CDN for images and static files
- [ ] Lazy load images below the fold
- [ ] Remove unused CSS/JS libraries
- [ ] Enable GZIP compression on server

**Test**: Use Google PageSpeed Insights (https://pagespeed.web.dev/)

**Target scores**:
- Mobile: >90
- Desktop: >95

---

### 12. Make Site Fully Mobile-Responsive

**Why**: 60%+ of searches happen on mobile. Google uses mobile-first indexing.

**Checklist**:
- [ ] Calendar filters work smoothly on mobile
- [ ] Event cards are touch-friendly (min 48x48px tap targets)
- [ ] Text is readable without zooming (min 16px font size)
- [ ] Forms are easy to fill on mobile
- [ ] "Add to Calendar" buttons work on iOS and Android

**Test**: Use Google Mobile-Friendly Test (https://search.google.com/test/mobile-friendly)

---

### 13. Add Structured Data for Organization

**Why**: Helps Google understand who you are and can trigger knowledge panel in search results.

**Example**:

```javascript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AquaEvents.club",
  "url": "https://aquaevents.club",
  "logo": "https://aquaevents.club/logo.png",
  "description": "Calendario completo de eventos acuáticos en España: natación, triatlón, waterpolo y más.",
  "sameAs": [
    "https://www.instagram.com/euroswimcaps",
    "https://www.facebook.com/aquaeventsclub"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@aquaevents.club",
    "contactType": "Customer Service",
    "areaServed": "ES",
    "availableLanguage": ["Spanish", "English"]
  }
}
</script>
```

---

### 14. Implement HTTPS and Security Headers

**Why**: Google requires HTTPS for ranking. Security headers protect users and signal trustworthiness.

**Checklist**:
- [ ] Install SSL certificate (Let's Encrypt is free)
- [ ] Redirect all HTTP to HTTPS
- [ ] Add security headers (HSTS, X-Frame-Options, CSP)
- [ ] Fix mixed content warnings (all resources load via HTTPS)

---

### 15. Create Robots.txt and Manage Crawl Budget

**Why**: Tells search engines which pages to crawl and which to ignore. Prevents wasting crawl budget on admin pages.

**Example robots.txt**:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /login
Disallow: /register

Sitemap: https://aquaevents.club/sitemap.xml
```

---

## Monitoring and Measurement

### Google Search Console Setup

1. Verify ownership of aquaevents.club
2. Submit sitemap
3. Monitor these metrics weekly:
   - Impressions for target keywords
   - Click-through rate (CTR)
   - Average position
   - Coverage errors (pages not indexed)

### Google Analytics Setup

1. Install GA4 tracking code
2. Set up goals:
   - Event submission
   - Newsletter signup
   - Swim caps inquiry
3. Track traffic sources:
   - Organic search
   - Direct
   - Social media
   - Referrals

### Rank Tracking

Use tools like:
- Google Search Console (free)
- Ahrefs (paid, $99/month)
- SEMrush (paid, $119/month)
- SERPWatcher (paid, $49/month)

Track these keywords weekly:
- eventos de natación españa
- calendario natación españa 2025
- eventos triatlón españa
- gorros natación personalizados
- travesías natación españa

---

## Quick Wins Summary

**This Week (4-6 hours total)**:
1. Add Event schema to 10 most popular events (2 hours)
2. Optimize meta titles/descriptions for homepage + events page (1 hour)
3. Create and submit XML sitemap (30 minutes)
4. Add internal links from blog posts to calendar (1 hour)
5. Compress and add alt text to 20 key images (1 hour)

**Expected impact**: 10-15% increase in organic traffic within 2 weeks

**Next Week (3-4 hours total)**:
1. Add FAQ schema to main blog post (1 hour)
2. Create breadcrumb navigation (1 hour)
3. Add "last updated" dates to all blog posts (30 minutes)
4. Implement canonical URLs (1 hour)
5. Add Open Graph tags (30 minutes)

**Expected impact**: 5-10% increase in CTR from search results

**This Month (10-15 hours total)**:
1. Improve page speed (5 hours)
2. Mobile optimization (4 hours)
3. Add Organization schema (1 hour)
4. Implement HTTPS (2 hours)
5. Create robots.txt (1 hour)

**Expected impact**: Move from #2 to #1 for "eventos de natación españa"

---

## Tools You'll Need

**Free**:
- Google Search Console
- Google Analytics
- Google PageSpeed Insights
- Google Rich Results Test
- Google Mobile-Friendly Test
- TinyPNG (image compression)

**Paid (Optional)**:
- Ahrefs ($99/month) - Backlink analysis, keyword research
- SEMrush ($119/month) - Competitor analysis, rank tracking
- Screaming Frog ($259/year) - Technical SEO audits

---

## Final Checklist

Before launching any SEO campaign, verify:

- [ ] All event pages have Event schema
- [ ] All blog posts have Article schema
- [ ] Homepage has Organization schema
- [ ] Meta titles are 55-60 characters
- [ ] Meta descriptions are 150-160 characters
- [ ] All images have alt text
- [ ] All images are compressed (<100KB)
- [ ] Page speed is <2 seconds
- [ ] Site is mobile-responsive
- [ ] HTTPS is enabled
- [ ] Sitemap is submitted to Google
- [ ] Google Analytics is tracking
- [ ] Internal links connect blog to calendar
- [ ] Breadcrumbs are implemented
- [ ] Canonical URLs are set
- [ ] Robots.txt is configured

**Once all items are checked, you're ready to compete with RFEN for #1 rankings.**
