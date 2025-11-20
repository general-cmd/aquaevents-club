# Schema Markup Implementation for AI SEO

This document describes the comprehensive JSON-LD structured data (Schema.org markup) implemented across AquaEvents.club to improve discoverability by search engines and AI systems like ChatGPT, Perplexity, Google Gemini, and others.

## Overview

**Schema.org** structured data helps AI systems and search engines understand your content better, leading to:
- Better visibility in AI-generated responses (ChatGPT, Perplexity, etc.)
- Rich snippets in Google search results
- Enhanced understanding of your site structure
- Improved SEO rankings
- Featured snippets and knowledge panels

## Implemented Schema Types

### 1. WebSite Schema (Homepage)
**Location:** `client/src/components/schema/WebSiteSchema.tsx`  
**Used on:** Homepage (`/`)

**Purpose:** Defines the website identity and enables site search functionality

**Key Properties:**
- `@type`: "WebSite"
- `name`: "AquaEvents.club"
- `url`: Full site URL
- `description`: Site description for AI understanding
- `potentialAction`: SearchAction for site search
- `publisher`: Organization information

**AI Benefits:**
- Helps AI systems understand what your site is about
- Enables "search within site" functionality
- Provides context for all other pages

---

### 2. Organization Schema (Homepage)
**Location:** `client/src/components/schema/OrganizationSchema.tsx`  
**Used on:** Homepage (`/`)

**Purpose:** Establishes brand identity and organizational information

**Key Properties:**
- `@type`: "Organization"
- `name`: "AquaEvents.club"
- `logo`: Brand logo URL
- `description`: What the organization does
- `contactPoint`: Customer service information
- `sameAs`: Social media profiles
- `areaServed`: Geographic coverage (España)
- `knowsAbout`: Topics of expertise (swimming, triathlon, etc.)

**AI Benefits:**
- AI systems can reference your organization by name
- Establishes authority in aquatic sports domain
- Enables knowledge graph connections

---

### 3. FAQPage Schema (Homepage)
**Location:** `client/src/components/schema/FAQSchema.tsx`  
**Used on:** Homepage (`/`)

**Purpose:** Marks up frequently asked questions for AI systems

**Key Properties:**
- `@type`: "FAQPage"
- `mainEntity`: Array of Question/Answer pairs

**Questions Included:**
1. ¿Dónde puedo encontrar eventos de natación en España 2026?
2. ¿Cómo puedo inscribirme en una competición?
3. ¿Cuándo se actualiza el calendario?
4. ¿Es gratis usar AquaEvents.club?

**AI Benefits:**
- AI systems can directly answer user questions about your site
- Appears in Google's "People Also Ask" sections
- Helps ChatGPT provide accurate information about your service

---

### 4. SportsEvent Schema (Event Detail Pages)
**Location:** `client/src/components/EventStructuredData.tsx`  
**Used on:** Individual event pages (`/evento/:id`)

**Purpose:** Provides detailed information about each sports event

**Key Properties:**
- `@type`: "SportsEvent"
- `name`: Event name
- `startDate`: Event date
- `location`: Venue and address details
- `description`: Event description
- `organizer`: Event organizer information
- `url`: Registration URL

**AI Benefits:**
- AI can provide specific event details when asked
- Events may appear in Google's event search
- Enables event discovery through AI assistants

---

### 5. ItemList Schema (Events Listing Page)
**Location:** `client/src/components/schema/ItemListSchema.tsx`  
**Used on:** Events listing page (`/eventos`)

**Purpose:** Structures the list of events for better understanding

**Key Properties:**
- `@type`: "ItemList"
- `name`: List title
- `description`: What the list contains
- `numberOfItems`: Total count
- `itemListElement`: Array of SportsEvent items with positions

**AI Benefits:**
- AI understands this is a curated list of events
- Can reference "top events" or "upcoming events"
- Helps with event discovery and recommendations

---

### 6. BlogPosting Schema (Blog Posts)
**Location:** `client/src/pages/BlogPost.tsx` (inline)  
**Used on:** Individual blog posts (`/blog/:slug`)

**Purpose:** Marks up blog articles for better content understanding

**Key Properties:**
- `@type`: "BlogPosting"
- `headline`: Article title
- `image`: Cover image
- `datePublished`: Publication date
- `author`: Article author
- `publisher`: AquaEvents.club
- `description`: Article excerpt

**AI Benefits:**
- AI can cite your articles as sources
- Appears in Google News and Discover
- Enables article recommendations

---

### 7. BreadcrumbList Schema (Navigation)
**Location:** `client/src/components/schema/BreadcrumbSchema.tsx`  
**Used on:** Event detail, blog posts, events listing

**Purpose:** Shows page hierarchy and navigation structure

**Key Properties:**
- `@type`: "BreadcrumbList"
- `itemListElement`: Array of navigation items with positions

**Examples:**
- Events page: `Inicio > Eventos`
- Event detail: `Inicio > Eventos > [Event Name]`
- Blog post: `Inicio > Blog > [Article Title]`

**AI Benefits:**
- AI understands site structure and page relationships
- Helps with contextual navigation recommendations
- Improves internal linking understanding

---

## Schema Markup Coverage

| Page Type | Schema Types | Status |
|-----------|-------------|--------|
| Homepage | WebSite, Organization, FAQPage | ✅ Implemented |
| Events Listing | ItemList, BreadcrumbList | ✅ Implemented |
| Event Detail | SportsEvent, BreadcrumbList | ✅ Implemented |
| Blog Listing | - | ⚠️ Could add ItemList |
| Blog Post | BlogPosting, BreadcrumbList | ✅ Implemented |
| Federations | - | ⚠️ Could add Organization for each |
| User Profile | - | ⚠️ Could add Person schema |

---

## Testing Your Schema Markup

### Google Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Enter your page URL
3. Verify all schema types are detected
4. Check for errors or warnings

### Schema.org Validator
1. Visit: https://validator.schema.org/
2. Enter your page URL or paste the JSON-LD
3. Verify structure and properties

### Browser DevTools
Open browser console and run:
```javascript
// Find all schema markup scripts
const schemas = document.querySelectorAll('script[type="application/ld+json"]');
schemas.forEach((s, i) => {
  console.log(`Schema ${i + 1}:`, JSON.parse(s.textContent));
});
```

---

## AI SEO Best Practices

### 1. Keep Schema Updated
- Update event dates and information regularly
- Add new FAQ questions as they arise
- Maintain accurate organization information

### 2. Be Specific and Accurate
- Use precise descriptions
- Include all relevant properties
- Don't exaggerate or mislead

### 3. Add More Schema Over Time
- Consider adding `VideoObject` for training videos
- Add `HowTo` schema for instructional content
- Use `Event` schema for competitions and meets

### 4. Monitor Performance
- Track organic search traffic
- Monitor AI citation mentions
- Check Google Search Console for rich results

---

## How AI Systems Use This Data

### ChatGPT / GPT-4
- Reads schema markup when crawling your site
- Uses it to provide accurate answers about your events
- Can reference specific events and dates
- Understands your FAQ answers

### Google Gemini
- Integrates schema data into knowledge graph
- Uses it for featured snippets
- Powers Google Assistant responses

### Perplexity AI
- Cites your site as a source
- Uses structured data for fact-checking
- Includes in search results with rich previews

### Microsoft Copilot
- Leverages Bing's understanding of schema
- Provides event recommendations
- Answers questions about Spanish aquatic events

---

## Future Enhancements

### Recommended Additions:

1. **LocalBusiness Schema** - For club partners
2. **Course Schema** - For training programs
3. **VideoObject Schema** - For technique videos
4. **Review Schema** - For event reviews
5. **Offer Schema** - For paid events or services

### Advanced Features:

1. **Dynamic Schema Generation** - Generate schema from database
2. **Multi-language Support** - Add @language properties
3. **Event Series** - Link related events
4. **Performer Schema** - For featured athletes

---

## Maintenance Checklist

- [ ] Monthly: Review and update FAQ schema with new questions
- [ ] Quarterly: Verify all schema markup is error-free
- [ ] Annually: Review and expand schema coverage
- [ ] Ongoing: Monitor AI citations and mentions
- [ ] Ongoing: Keep organization information current

---

## Technical Implementation Notes

### Component Structure
All schema components follow the same pattern:
1. Accept props for dynamic data
2. Use `useEffect` to inject/update script tag
3. Return `null` (no visual rendering)
4. Clean up on unmount

### Script Tag Management
- Each schema type has a unique `id`
- Scripts are added to `<head>` element
- Existing scripts are updated, not duplicated
- Scripts are removed when component unmounts

### Performance
- Schema components have minimal performance impact
- JSON-LD is preferred over microdata (faster parsing)
- No additional HTTP requests required

---

## Resources

- **Schema.org Documentation:** https://schema.org/
- **Google Search Central:** https://developers.google.com/search/docs/appearance/structured-data
- **JSON-LD Playground:** https://json-ld.org/playground/
- **Rich Results Test:** https://search.google.com/test/rich-results

---

**Last Updated:** November 2025  
**Version:** 1.0  
**Maintained by:** AquaEvents.club Development Team

