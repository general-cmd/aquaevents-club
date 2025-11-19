# AquaEvents.club - Project TODO

## Phase 1: Core Setup & Branding
- [x] Add AquaEvents.club logo to project
- [ ] Configure brand colors (blue gradient)
- [x] Set up MongoDB connection to existing database
- [x] Configure environment variables

## Phase 2: Homepage
- [x] Create responsive homepage (mobile-first)
- [x] Add hero section with value proposition
- [x] Integrate newsletter signup form (Systeme.io script)
- [ ] Add featured events section
- [x] Add sponsor CTA for euroswimcaps.com)
- [ ] Implement mobile/tablet/desktop responsive design

## Phase 3: Event Listing & Detail Pages
- [ ] Filter out past events from public display (only show upcoming)
- [ ] Keep past events in database with archived flag
- [ ] Create events listing page with filters (region, sport, date)
- [ ] Build dynamic event detail pages
- [ ] Add SEO-optimized URLs (e.g., /eventos/campeonato-natacion-barcelona-nov-2025)
- [ ] Implement FAQ schema per event
- [ ] Add sponsor CTA on event pages
- [ ] Add newsletter signup on event pages
- [ ] Generate unique meta titles and descriptions per event

## Phase 4: Blog System
- [ ] Create blog listing page at /blog
- [ ] Build dynamic blog post pages
- [ ] Implement blog post creation system
- [ ] Add image generation for blog posts
- [ ] Add FAQ schema to blog posts
- [ ] Include sponsor CTA in blog posts
- [ ] Include newsletter signup in blog posts
- [ ] Set up auto-publishing (3 posts per week)

## Phase 5: Admin Dashboard
- [ ] Create admin login at /admin
- [ ] Build blog post management (review, edit, publish, unpublish)
- [ ] Build event management interface
- [ ] Add analytics dashboard
- [ ] Create settings panel

## Phase 6: SEO & AISEO Optimization
- [ ] Generate complete sitemap with all events
- [ ] Add canonical URLs to all pages
- [ ] Implement structured data (SportsEvent, Article, FAQ)
- [ ] Add meta tags and Open Graph tags
- [ ] Optimize images with alt text

## Phase 7: Security & Anti-Scraping
- [ ] Implement rate limiting
- [ ] Add bot detection
- [ ] Configure Cloudflare protection
- [ ] Add honeypot traps
- [ ] Create privacy policy page
- [ ] Create terms of service page

## Phase 8: Automation
- [ ] Set up monthly event scraping (15th of month)
- [ ] Configure automated blog posting (3x per week)
- [ ] Implement old event archiving
- [ ] Set up sitemap auto-regeneration

## Phase 9: Deployment
- [ ] Deploy to Vercel
- [ ] Configure custom domain (aquaevents.club)
- [ ] Set up environment variables in production
- [ ] Test all functionality
- [ ] Performance optimization

## Phase 10: Testing & Launch
- [ ] Test responsive design on all devices
- [ ] Verify all CTAs work correctly
- [ ] Test admin dashboard
- [ ] Verify SEO implementation
- [ ] Final review and launch



## Immediate Fixes (User Feedback)
- [x] Display real events on homepage (fetch from API)
- [x] Fix Systeme.io newsletter form integration
- [x] Fix stats section with real database numbers
- [x] Fix logo placement in header
- [x] Simplify and shorten footer
- [x] Add FAQ section to homepage with schema markup
- [x] Add rich SEO descriptions and content
- [ ] Fix Systeme.io form to display email input field and submit button properly (DEFERRED)
- [x] Create Events Listing Page (/eventos) with filters
- [x] Build Event Detail Pages with SEO optimization
- [x] Add structured data schema to event pages

## Critical Fixes (User Feedback)
- [x] Fix events not displaying on homepage (switched to tRPC)
- [x] Fix hamburger menu not working on mobile
- [x] Fix newsletter form appearing in footer instead of hero section (iframe working correctly)

## New Issues (User Feedback)
- [x] Fix event detail page URL encoding (canonical slug has special characters)
- [x] Fix Systeme.io form not displaying properly in hero section (replaced with direct form)
- [x] Fix filter dropdowns to show ALL available disciplines and regions (increased limit to 500)
- [x] Add 2026 events from database (N/A - only 6 events from Nov-Dec 2025 in DB)
- [x] Build federation detail pages with event listings
- [x] Implement blog system with listing and detail pages

## New Tasks (User Feedback)
- [x] Ensure EuroSwimCaps button links to euroswimcaps.com on all pages (already correct)
- [x] Fix Suscríbete Gratis button to scroll to hero form on homepage

## Critical Bugs (User Feedback)
- [x] Fix event detail page showing 404 (switched to tRPC, now working correctly)
- [x] Restore EuroSwimCaps sponsor button visibility (already present in code, visible on homepage)
- [x] Verify only 6 upcoming events exist in database (confirmed: 6 events from Nov 20 to Dec 20, 2025)



## Content Population (User Request)
- [x] Add Spanish aquatic federations (RFEN + regional) to database
- [x] Write 5 SEO-optimized blog articles



## Blog & Federation Issues (User Feedback)
- [x] Fix federations missing from MongoDB (federations are in MySQL and working correctly)
- [x] Add featured images to all blog posts
- [x] Improve blog text formatting with clear H2/H3 headings
- [x] Add FAQ sections to blog posts with schema markup
- [x] Add SEO meta descriptions and structured data
- [x] Include references/sources in blog articles
- [x] Add EuroSwimCaps CTA buttons to blog posts
- [x] Add internal linking between blog posts
- [x] Add internal linking from blog posts to related events



## User Feedback - Match Original Site Quality
- [x] Scrape and import 37 federations from https://aquaevents.club/federations
- [x] Analyze and replicate original event detail page design from https://aquaevents.club/events/68edec3b52fb3da6d1cfe9bb
- [x] Fix blog posts not displaying enhancements (converted markdown to HTML)



## User Feedback - Final Improvements
- [x] Remove duplicate federations from database
- [x] Add federation filters (All, Active, Inactive, Needs Verification, Region dropdown)
- [x] Add event filters (Disciplina, Categoría, Región, Mes, Search)
- [x] Fix blog featured images not displaying
- [x] Remove "Made with Manus" branding from all pages (not in code - controlled by platform settings)

