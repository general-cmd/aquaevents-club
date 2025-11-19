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
- [ ] Add federation detail pages

## Critical Bugs (User Feedback)
- [x] Fix event detail page showing 404 (switched to tRPC, now working correctly)
- [x] Restore EuroSwimCaps sponsor button visibility (already present in code, visible on homepage)
- [x] Verify only 6 upcoming events exist in database (confirmed: 6 events from Nov 20 to Dec 20, 2025)

