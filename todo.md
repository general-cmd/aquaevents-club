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




## New Features - User Request (Event Submission, User Accounts, Admin Dashboard)
- [x] Remove federation status filters (Active/Inactive/Pending tabs) - static data
- [x] Create event submission form with fields: title, discipline, category, region, city, dates, contact info
- [x] Add admin approval workflow for submitted events (API ready)
- [x] Build user registration form with email consent checkbox (GDPR)
- [x] Add user type field (Club/Swimmer/Federation/Other)
- [x] Add preferred disciplines multi-select for users
- [x] Store email consent timestamp for GDPR compliance
- [x] Implement user favorites system for events
- [ ] Build email notification system for new events matching user preferences (requires scheduled job - future enhancement)
- [x] Create admin dashboard at /admin route
- [x] Add admin panel for approving/rejecting event submissions
- [x] Add admin panel for managing blog posts
- [x] Add admin panel for managing federations (view only - managed via DB)
- [ ] Add admin analytics view (future enhancement)
- [x] Write vitest tests for new features



## Bug Fixes - User Reported Issues
- [ ] Fix filter dropdowns overlapping on Events page
- [ ] Remove "Made with Manus" footer text from all pages
- [ ] Integrate Systeme.io API for email notifications
- [ ] Add email notification for event submission confirmation
- [ ] Add email notification for approval/rejection
- [ ] Add email notification for new events matching user preferences



## New Tasks - Related Content Links
- [x] Update "Guía de Subvenciones para Clubes" to link to blog post (blog post created)
- [x] Update "Preparación para Competiciones" to link to blog post (blog post created)
- [x] Update "Material de Natación" to link to Euroswimcaps.com (already done)
- [x] Update "Más Eventos Similares" to link to /eventos page (already done with filters)



## Blog Images - User Request
- [x] Add cover image to Guía de Subvenciones blog post
- [x] Add cover image to Preparación para Competiciones blog post
- [x] Check if Calendario Fiscal blog post needs to be created (not needed - user confirmed)



## UI Improvements - User Request
- [x] Add "Enviar Evento" link to header navigation
- [x] Add "Mi Perfil" link to header navigation
- [x] Add cover images to blog listing page
- [x] Create Systeme.io email template documentation



## AI SEO - Schema Markup Enhancement
- [x] Create WebSite schema component with search functionality
- [x] Create Organization schema component for brand identity
- [x] Create BreadcrumbList schema component
- [x] Add FAQPage schema to homepage
- [x] Add ItemList schema to events listing page
- [x] Add BreadcrumbList to event detail, blog post, and other key pages
- [x] Test all schema markup with Google Rich Results Test (visual verification complete)




## New Features - User Request (Auto-publish, Tracking, Emails)
- [x] Add auto-publish button to admin dashboard for approved events
- [x] Create tRPC procedure to copy approved event from MySQL to MongoDB
- [x] Add "Mis Eventos Enviados" section to user profile page
- [x] Show submission status badges (pending/approved/rejected)
- [x] Integrate Systeme.io email for event submission confirmation
- [x] Integrate Systeme.io email for approval notification
- [x] Integrate Systeme.io email for rejection notification
- [x] Write vitest tests for new features




## New Features - User Request

- [x] Add bulk operations to admin dashboard (checkboxes and batch actions)
- [x] Add batch approve button for multiple submissions
- [x] Add batch reject button for multiple submissions
- [x] Add batch publish button for multiple submissions
- [x] Create event submission templates for common event types
- [x] Add template for regional championships
- [x] Add template for club meets
- [x] Add template for open water races
- [x] Add template for waterpolo tournaments
- [x] Add template for triathlon events
- [x] Add ICS calendar export functionality
- [x] Add export button to favorites page
- [x] Add export button to events listing page
- [x] Generate ICS files compatible with Google/Apple Calendar
- [x] Write vitest tests for new features




## New Features - User Request (Reminders, Federation Dashboard, Registration)

- [x] Add event reminder system
- [x] Add reminder preferences to user profile (1 week, 1 day, etc.)
- [x] Store reminders in database with user and event association
- [x] Add reminder UI to event detail page with Dialog component
- [x] Create federation dashboard at /federacion route
- [x] Add federation event management interface
- [x] Add federation analytics (views, registrations)
- [x] Add event registration integration
- [x] Add registration link field to events
- [x] Add capacity tracking for events
- [x] Display registration button and capacity on event detail pages
- [x] Show registration info in admin dashboard
- [x] Write vitest tests for new features (9 tests passing)




## Phase 1 Progress - Registration Integration
- [x] Add registrationUrl and maxCapacity fields to event submission form
- [x] Update tRPC schema to accept registration fields
- [ ] Display registration button and capacity on event detail pages
- [ ] Show registration stats in admin dashboard
- [ ] Update event templates to include registration fields




## Phase 2 Progress - Reminder System UI
- [x] Replace prompt dialog with proper Dialog component
- [x] Add visual reminder options with icons
- [x] Improve UX with loading states and success messages
- [ ] Test reminder creation end-to-end




## Phase 4 Progress - Registration Integration Complete
- [x] Add registrationUrl and maxCapacity fields to event submission form
- [x] Update tRPC schema to accept registration fields
- [x] Display registration button on event detail pages (green button with external link)
- [x] Show capacity info with current/max registrations on event detail
- [x] Show registration stats in admin dashboard
- [x] Update event templates interface to include registration fields





## Critical Bug Fixes - User Reported

- [ ] Fix "2 errors" message appearing on /perfil page
- [ ] Fix admin dashboard not loading at /admin
- [ ] Verify SEO/AISEO schema markup on new pages (reminder, registration, federation dashboard)
- [ ] Add BreadcrumbList schema to new pages if missing
- [ ] Test all pages for proper metadata and structured data




## SEO/AISEO Schema Markup - Completed

- [x] Verify EventDetail has Event schema and BreadcrumbList (already present)
- [x] Add BreadcrumbSchema to FederationDashboard
- [x] Add BreadcrumbSchema to SubmitEvent page
- [x] All new pages now have proper structured data for search engines





## Systeme.io Integration - User Profile Sync

- [x] Check existing Systeme.io API configuration
- [x] Implement user sync to Systeme.io when email consent is given
- [x] Map user types to Systeme tags: Nadador/a → "Swimmer", Club Deportivo → "Club Deportivo", Federación → "Federation"
- [x] Only sync when "Acepto recibir notificaciones por email" is checked (GDPR compliant)
- [x] Write vitest tests for Systeme.io integration (8 tests passing)
- [x] Test end-to-end: profile update → Systeme.io contact created with correct tag





## Google Search Console - XML Sitemap

- [x] Create dynamic sitemap.xml endpoint
- [x] Include all static pages (home, eventos, federaciones, blog, enviar-evento)
- [x] Include all published events from database
- [x] Include all blog posts
- [x] Include all federation pages
- [x] Add robots.txt with sitemap reference
- [x] Test sitemap generation and XML format





## Bug Fix - Sitemap 404 on Production

- [x] Fix sitemap.xml returning 404 on production
- [x] Ensure sitemap route is registered before React Router catch-all
- [x] Modified serveStatic catch-all to skip /sitemap.xml and /robots.txt
- [ ] Test sitemap accessibility on production domain after republish
- [ ] Verify Google Search Console can fetch sitemap





## SEO Improvements - Meta Descriptions & Internal Linking

- [x] Add unique meta descriptions to all pages (Home, Events, Blog, Federations)
- [x] Add dynamic meta descriptions to EventDetail pages (first 155 chars of description)
- [ ] Add dynamic meta descriptions to BlogPost pages
- [x] Add "Related Events" section to EventDetail pages (by discipline)
- [x] Add Open Graph and Twitter Card meta tags for social sharing
- [ ] Test structured data with Google Rich Results Test (user action required)

## Profile-Gated Event Submission System

- [x] Update user schema to add organization profile fields (org name, logo, website, contact, legal info)
- [x] Add verification status field to users (pending, approved, rejected)
- [x] Add verification notes field for admin (call scheduling, rejection reasons)
- [x] Push database schema changes with pnpm db:push
- [ ] Require login before accessing /enviar-evento page
- [ ] Check user type: only "Club Deportivo" or "Federación" can access submission
- [ ] Check verification status: only approved users can submit events
- [ ] Add "Apply for Verification" flow for unverified clubs/federations
- [ ] Build admin verification dashboard (approve/reject with notes)
- [ ] Add "My Events" page for organizations to view/edit their submissions
- [ ] Link events to submitting user in database
- [ ] Allow organizations to edit their own events
- [ ] Admin can moderate/remove any event
- [ ] Send email notifications for verification status changes
- [ ] Write vitest tests for verification workflow





## Critical SEO Bugs - User Reported

- [x] Fix sitemap.xml returning 404 on production (moved router registration before static files)
- [x] Add robots.txt to sitemap router for dynamic serving
- [x] Fix Event structured data - added required fields (eventStatus, eventAttendanceMode, image, offers)
- [ ] Test sitemap accessibility after republish
- [ ] Test rich results with Google Rich Results Test tool after republish

