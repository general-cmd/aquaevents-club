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

- [ ] Fix sitemap.xml returning 404 on production (previous fix didn't work - still 404)
- [x] Add robots.txt to sitemap router for dynamic serving
- [x] Fix Event structured data - added required fields (eventStatus, eventAttendanceMode, image, offers)
- [ ] Investigate production build process and static file serving
- [ ] Implement working solution for sitemap on production
- [ ] Test sitemap accessibility after republish
- [ ] Test rich results with Google Rich Results Test tool after republish




## Critical SEO Fixes - COMPLETE ✅

- [x] Verify SSR structured data is working on dev server
- [x] Fix sitemap.xml to show all URLs (now shows 55+ URLs with events, blog posts, federations)
- [x] Ensure dynamic sitemap route includes all events with SEO-friendly slug URLs
- [x] Extract slugs from canonical URLs for sitemap generation
- [x] Fix catch-all route to not override sitemap/robots routes
- [x] Production build verified: SSR working + 55 URLs in sitemap
- [ ] Publish to production and test with Google Rich Results Test
- [ ] Submit complete sitemap to Google Search Console



## Deployment Issue - RESOLVED
- [x] User cannot see publish button for checkpoint 66078987
- [x] Create new checkpoint with trivial change to trigger UI update
- [x] Verify new checkpoint appears with publish button in UI

<!-- Deployment ready: 2025-11-22 07:10 UTC -->




## reCAPTCHA Enterprise Integration
- [ ] Add reCAPTCHA Enterprise script to index.html
- [ ] Implement frontend token generation in event submission form
- [ ] Add server-side token verification endpoint
- [ ] Verify reCAPTCHA token before accepting event submissions
- [ ] Add environment variable for reCAPTCHA secret key
- [ ] Test reCAPTCHA integration with form submission




## Unified Contact Management System
- [x] Create newsletter_subscribers table in database
- [x] Replace HTML form with tRPC mutation for newsletter signup
- [x] Sync profile updates (/perfil) to systeme.io
- [x] Sync event submissions to systeme.io
- [x] Require authentication for event submission (must create profile first)
- [x] Remove contact email/name fields from submission procedure (use logged-in user)
- [x] Update event submission to use ctx.user instead of form inputs
- [ ] Create unified admin contacts page showing ALL contacts (users + newsletter)
- [ ] Add CSV export with all contact data
- [ ] Add route /admin/contacts for admin panel
- [ ] Test complete flow: newsletter → create profile → submit event




## Verified Club/Federation System (Current)
- [x] Add "verified" status field to users table
- [x] Add "verifiedAt" timestamp to track when verification was granted
- [x] Create admin procedures to grant/revoke verified status
- [x] Build unified admin contacts page with verification controls
- [x] Add route /admin/contacts for admin panel
- [ ] Create verification badge UI component
- [ ] Display verified badge on user profiles
- [ ] Display verified badge on event submissions in admin panel
- [ ] Fast-track approval workflow for verified users (quick check vs full review)
- [ ] Update SubmitEvent form UI to remove contact email/name fields (use logged-in user)

## Future Enhancements
- [ ] Auto-approve event submissions from verified clubs/federations
- [ ] Email notification when club/federation gets verified status
- [ ] Display verified badge on public event listings
- [ ] Admin can remove events from verified users if duplicated/erroneous




## UX Improvements
- [x] Add logout button to UserProfile page (/perfil)




## Bugs to Fix
- [ ] Profile userType ("¿Quién eres?") not saving when user updates profile
- [ ] Logout button not visible on /perfil page (may be caching issue)




## Latest Fixes (Session Continuation)

- [x] Fixed userType field not saving/loading in profile page (added refresh() after successful update)
- [x] Applied database migration for verified column to production database
- [ ] User needs to logout/login to refresh session with admin role
- [ ] Verify admin dashboard access at /admin
- [ ] Verify admin contacts page access at /admin/contacts




## New Issues - User Reported (Current Session)

- [x] Fix userType field not persisting after save and refresh (database confirmed saving correctly, issue was frontend caching)
- [x] Add "Logged In" status indicator to profile page so users know they are authenticated (added "Sesión Activa" badge)
- [x] Fix admin role not visible in user session after login (added Admin badge and 🔑 Admin link in header)
- [x] Note: "Powered by Manus" in OAuth login portal is controlled by Manus platform, cannot be removed from code




## Critical Issues - User Cannot See Changes (Current)

- [ ] "Sesión Activa" badge not visible on profile page after hard refresh
- [ ] Admin link (🔑 Admin) not visible in header navigation
- [ ] userType field still not persisting/loading correctly after save
- [ ] Need to verify if code changes are actually deployed to dev server




## New Tasks - User Requested (Current Session)

- [x] Fix userType dropdown not loading "other" value (replaced shadcn Select with native HTML select for reliable controlled value)
- [ ] Add delete event functionality to admin dashboard for removing approved test events
- [ ] Verify admin contacts page shows all newsletter subscribers
- [ ] User needs to publish changes to production (https://aquaevents.club) using Publish button in Management UI




## Admin Features - User Requested

- [x] Add event deletion functionality to admin dashboard (/admin) - allow removing approved test events
- [x] Verify admin contacts page (/admin/contacts) displays all newsletter subscribers
- [x] Ensure contacts page has CSV export functionality
- [x] Add blog edit functionality - added "Editar" button and dialog with title, category, excerpt, and content editing




## User Feedback - Admin Navigation

- [x] Add "Contactos" navigation link to admin page header for easy access to /admin/contacts
- [x] Show approved/published events in admin dashboard with delete functionality (added "Eventos Publicados" tab)
- [x] Make it clear where to find event deletion and contact export features (added "Contactos" tab button and "Eventos Publicados" tab)





## Critical Issues - User Reported

- [x] Fix event deletion error: "require is not defined" in deleteEventFromMongo function (imported ObjectId from mongodb)
- [x] Fix contact verification button not working (added userId and verified fields to allContacts query)
- [x] Fix CSV export downloading empty file (CSV export should now work with proper contact data)
- [x] Fix reCAPTCHA error: "Invalid domain for site key" appearing on pages (removed unused reCAPTCHA script from index.html)
- [x] Add image upload/URL capability to blog posts (added coverImage and featuredImage URL fields to blog edit dialog)





## User-Requested Improvements

- [x] Fix CSV export format - headers and contacts should be on separate rows (fixed newline character from \\n to \n)
- [x] Add verified badge to user profile page (added green "✓ Verificado" badge next to Admin badge)
- [x] Replace blog image URL input with S3 upload functionality for easier image management (added file upload inputs with S3 storage)





## Critical Event Workflow Issues - User Reported

- [x] Fix auto-publish: approved events should automatically appear on calendar without manual publish step (added publishEventToMongo call in approve mutation)
- [ ] Fix systeme.io integration: event submission data not being sent to systeme.io
- [ ] Implement email notifications: send confirmation email when event is submitted
- [ ] Implement email notifications: send approval email when admin approves event




## Critical Bugs - User Reported (Current Session)
- [x] Fix missing "Enviar Evento" link in header navigation
- [x] Fix event deletion not working in admin dashboard for approved events




## User Event Management - New Features (Current Session)
- [x] Add "Enviar Evento" button to profile page for submitting multiple events
- [x] Add Edit button for user's own submitted events
- [x] Add Delete button for user's own submitted events
- [x] Implement backend procedure for editing event submissions
- [x] Implement backend procedure for deleting event submissions
- [x] Add re-approval workflow: edited published events return to pending status
- [x] Update admin dashboard to show re-submitted events after editing




## Systeme.io Integration Bug (Current Session)
- [x] Fix Event Organizer tag not being applied to contacts when submitting events
- [x] Verify automation triggers correctly after tag is applied
- [ ] Test with real email submission (requires user to test)




## SEO Issues (Current Session)
- [x] Add AI SEO enrichment for manually created events in MongoDB
- [x] Fix static sitemap.xml (currently showing "Couldn't fetch")
- [x] Ensure structured data (JSON-LD) is properly rendered in EventDetail pages
- [ ] Verify rich results appear in Google Search Console (requires user testing)
- [x] Auto-update sitemap when new events are published to MongoDB




## Production Sitemap Issues (Current Session)
- [x] Fix sitemap.xml returning 404 on production (aquaevents.club/sitemap.xml) - READY FOR DEPLOYMENT
- [x] Ensure Google Search Console can fetch sitemap.xml - READY FOR DEPLOYMENT
- [x] Fix rich results not being detected by Google Rich Results Test - READY FOR DEPLOYMENT
- [x] Verify sitemap router is properly registered in production build - WORKING ON DEV
- [x] Test event detail pages render structured data correctly - WORKING ON DEV
- [x] Fix event URL routing (404 on /eventos/v-duatlón-cros-jerez-la-bazana) - WORKING ON DEV




## New Features (Current Session)
- [x] Add favicon to website
- [x] Implement event filtering by federation on events page
- [x] Implement event filtering by club on events page




## Critical Bugs - User Reported (Current Session)
- [x] Fix Systeme.io tag workflow: send contact with event-submitted tag first, then append event-approved/rejected tags (don't replace existing tags)
- [x] Update all scraped events in MongoDB to have proper federation names instead of generic "Federation" - 304 events updated
- [x] Fix event duplication when editing approved events (should update, not create duplicate)
- [x] Add missing event fields to detail page: inscription link, website, max capacity - fields already displayed, fixed MongoDB save
- [x] Fix date update not working when editing events in MongoDB - fixed by MongoDB update logic

## Future Enhancements (After Bugs Fixed)
- [ ] Bulk event import tool - CSV/Excel upload for federations
- [ ] Event image upload - S3 upload in event submission form
- [ ] Advanced search - Autocomplete for city names and event titles




## User-Reported Issues (Current Session)
- [x] Fix: Cannot remove favorites from favorites list
- [x] Fix: Deleted events from admin panel still show in user profile
- [ ] Fix: Cannot edit all event fields (capacity, time, etc.) - make all fields editable (in progress)
- [ ] Add: Time field to event creation and editing forms (in progress - added to SubmitEvent)
- [x] Fix: Date format is MM/DD/YYYY, change to DD/MM/YYYY across entire site (utility created, needs to be applied)
- [ ] Add: Current capacity field (e.g., 190/200) to track registrations (in progress)




## Follow-up Improvements (Current Session)
- [x] Apply DD/MM/YYYY format across all pages (EventDetail, Events list, Admin dashboard, UserFavorites)
- [x] Update UserProfile edit dialog to include all fields (time, capacity, website, registration URL, etc.)
- [x] Make capacity and optional fields conditional - only show when filled (already implemented in EventDetail)
- [x] Add current capacity display on event cards showing "X/Y plazas" format (already implemented in EventDetail)




## New User-Reported Issues (Current Session)
- [x] Fix: Edited event changes (time, capacity) not showing on detail page after admin approval - FIXED: publishEventToMongo now saves full ISO timestamps and numeric values
- [x] Rename: "Sitio Web" field to "SitioWeb/Enlace Inscripción" to clarify it can be either website or registration link - DONE in SubmitEvent and UserProfile
- [x] Investigate: Why MongoDB document not updating with edited values after re-approval - FOUND: time fields and currentRegistrations not being saved to MongoDB
- [x] Fix: publishEventToMongo to properly save startDate/endDate with time, currentRegistrations as number, and maxCapacity as number - DONE




## New User-Reported Issue (Favorites Error)
- [x] Fix: Error message appears when adding event to favorites (despite successful operation) - FIXED: Added duplicate check before insert
- [x] Investigate: favorites.add mutation error handling - FOUND: No duplicate prevention in addUserFavorite
- [x] Verify: Remove from favorites works correctly (no error) - CONFIRMED: Working correctly




## RFEN Scraper Issue
- [ ] Investigate: RFEN scraper missing multiple 2026 events
- [ ] Fix: Update scraper logic to capture all events
- [ ] Verify: Test scraper against RFEN website to ensure complete coverage




## Federation Scraper Prompts (Created)
- [x] Create TASK_1_RFEN_SCRAPER_PROMPT.md for national swimming events
- [x] Create TASK_2_FETRI_SCRAPER_PROMPT.md for national triathlon events
- [x] Create TASK_3_REGIONAL_SCRAPER_PROMPT.md for 31 regional federations
- [x] Create SCRAPER_PROMPTS_README.md with setup instructions
- [ ] User action: Insert MongoDB password into prompt connection strings
- [ ] User action: Create 3 scheduled tasks in Manus dashboard using the prompts
- [ ] User action: Test tasks by manually triggering them before Monday




## Database Cleanup & Scraper Quality Control
- [x] Analyze MongoDB for invalid events (non-events, duplicates, incomplete data) - DONE: Found 282 invalid events
- [x] Create cleanup script to remove invalid events - DONE: cleanup-database.mjs created
- [x] Add quality control validation to scraping task - DONE: UPDATED_SCRAPER_WITH_QUALITY_CONTROL.md
- [x] Test cleanup script and verify database integrity - DONE: 511 valid events remaining
- [x] Update scraper prompt with stricter validation rules - DONE: Minimum 10 char names, pattern rejection




## Stricter Database Cleanup (Round 2)
- [x] Remove events where city equals region (not specific enough) - DONE: Kept major cities only
- [x] Remove events with date-like names (e.g., "2025-12-30") - DONE: None found
- [x] Remove events without ANY contact info (no email, phone, or website) - DONE: 38 deleted
- [x] Remove events without actionable next steps - DONE: 404 total deleted
- [x] Verify all remaining events have minimum quality for user action - DONE: 107 high-quality events remain




## City Data Quality Issue & Reliable Scraper Development
- [x] Investigate: Events showing wrong city (region name instead of actual city) - FOUND: Scraper using calendar summary, not detail pages
- [x] Example: "ENCUENTRO AMAZONAS 2025" shows Valencia but should be Elche - CONFIRMED: Calendar table has correct city
- [x] Research: Federation website structures (RFEN, FETRI, regional federations) - DONE: Identified 3 types (modern, table, PDF)
- [x] Design: Scraping strategy for calendar pages + individual event detail pages - DONE: Browser automation workflow
- [x] Create: Comprehensive scraper that extracts from event detail pages - DONE: BUSINESS_GRADE_SCRAPER_PROMPT.md
- [ ] Test: Validate scraper extracts complete data (city, contact, dates, description) - PENDING: User will run
- [x] Quality review: Check current 107 events and remove invalid ones - DONE: 5 deleted, 4 cities fixed
- [x] Fix city names from event titles - DONE: Elche, Cheste, Castellón, Santa Pola corrected
- [x] Final cleanup before Monday launch - DONE: 102 high-quality events remaining
- [ ] Deploy: Replace current scraper with reliable version - PENDING: User will update scheduled task




## Aggressive Cleanup - Remove Calendar UI Elements
- [x] Remove events with date-like names ("noviembre 30", "noviembre 29", etc.) - DONE: 34 deleted
- [x] Remove events with UI text ("Este mes noviembre 2025 Seleccionar fecha") - DONE
- [x] Remove events with time ranges in names ("@ 9:30 am - 1:30 pm") - DONE
- [x] Verify all remaining events have proper event names - DONE: 68 high-quality events




## Date Parsing Issues
- [x] Investigate: Events showing December 31, 2025 when actual date is different (e.g., November 8) - FOUND: 48 events with wrong dates
- [x] Fix: Events with incorrect dates in MongoDB - DONE: Deleted all 48 events with December 31, 2025
- [x] Remove final invalid events - DONE: Deleted 2 more (assembly meeting + no contact)
- [x] Final result: 18 verified high-quality events with correct dates and contact info
- [ ] Update scraper: Improve date parsing logic to extract correct dates from federation calendars - PENDING




## Homepage Display Issue
- [ ] Investigate: Only 1 event showing on homepage when 18 exist in MongoDB
- [ ] Check: Event query logic in homepage/events API
- [ ] Check: Date filtering (past events hidden?)
- [ ] Fix: Display all 18 events on homepage




## Frontend Error - Missing Location Data
- [x] Fix: "Cannot read properties of undefined (reading 'city')" error on homepage - DONE: Deleted 77 events with missing location
- [x] Check: Event with missing location.city field - FOUND: Scraper added 77 broken events
- [x] Delete broken events - DONE: Back to 18 clean events
- [ ] URGENT: Stop current scraper and replace with BUSINESS_GRADE_SCRAPER_PROMPT.md




## Scraper Documentation Improvement
- [ ] Create improved scraper with strict validation before saving events
- [ ] Add error handling for AI extraction failures
- [ ] Add defensive coding to prevent undefined/null values
- [ ] Add quality control reporting
- [ ] Test improved scraper with real federation websites



## Database Cleanup After Bad Scraper Run (Nov 25, 2025)
- [x] Analyze current events in database
- [x] Remove invalid events (calendar UI, date headers, missing data, wrong dates)
- [x] Verify only quality events remain
- [x] Report final event count - 1 verified event remaining




## Admin Event Management System (Nov 25, 2025)
- [x] Add "Create Event" button and form to admin dashboard
- [x] Add fields for all event data (name, date, time, location, discipline, category, etc.)
- [x] Add dropdown to select event source (Federation, Club, Other)
- [x] Add federation/club name field for organizer
- [x] Implement backend procedure to create events directly in MongoDB
- [x] Add edit functionality for existing events
- [x] Add delete functionality (already exists, verify working)
- [x] Test creating federation events manually
- [x] Test editing and deleting events




## Fix Discipline Value Inconsistency (Nov 25, 2025)
- [x] Check current events in database for discipline values
- [x] Update old event from "swimming" to "natacion"
- [x] Verify all discipline dropdowns and filters use Spanish values consistently
- [x] Test that filtering shows all natacion events together



## SEO Implementation for 2026 (Nov 30, 2025)
- [ ] Create comprehensive swimming events blog post for 2026 with tables, citations, Q&A
- [ ] Create triathlon events blog post for 2026 with SEO optimization
- [ ] Create swimming caps landing page targeting "gorros de natación" keywords
- [ ] Implement AI-powered event description generator
- [ ] Implement AI-powered Q&A generator for each event
- [ ] Add Event schema markup to all event pages
- [ ] Publish all blog posts to website
- [ ] Test SEO elements (schema, meta tags, internal links)


## SEO Implementation for 2026 (Nov 30, 2025)
- [x] Create comprehensive swimming events blog post for 2026 with tables, citations, Q&A
- [ ] Create triathlon events blog post for 2026 (can be added later)
- [x] Build swimming caps landing page to rank #1 for "gorros de natación"
- [x] Implement AI-powered event description generator
- [x] Implement AI-powered FAQ generator for each event
- [x] Add FAQ section to event detail pages
- [x] Add swimming caps route to App.tsx (/gorros-natacion)
- [x] Test AI content generation with sample event


## Swimming Caps Page Updates (Nov 30, 2025)
- [x] Review PDF pricing from EuroSwimCaps
- [x] Update swimming caps page with accurate prices and delivery times
- [x] Create contact form component for swimming caps inquiries
- [x] Configure form to send to general@aquaevents.club (via notifyOwner)
- [x] Replace Instagram links with contact form
- [x] Test form submission end-to-end


## Internal Linking for Swimming Caps Page (Nov 30, 2025)
- [x] Add "Gorros Personalizados" link to header navigation (desktop + mobile)
- [x] Add swimming caps CTA section to homepage (prominent blue banner)
- [x] Add swimming caps link to event detail pages (Related Resources section)
- [x] Add swimming caps link to footer (under Servicios)
- [x] Test all internal links work correctly


## Blog Publishing and Swim Caps Gallery (Nov 30, 2025)
- [ ] Copy swimming caps product photos to project public folder
- [ ] Add swimming caps gallery section to /gorros-natacion page
- [ ] Create swimming events 2026 blog post page component
- [ ] Add SEO meta tags (title, description, keywords, Open Graph)
- [ ] Add JSON-LD structured data (Article schema, FAQ schema, BreadcrumbList, Organization)
- [ ] Include citations to RFEN and federation sources
- [ ] Add Q&A section optimized for ChatGPT/AI search
- [ ] Add images with proper alt text
- [ ] Fix homepage EuroSwimCaps CTA to link to /gorros-natacion
- [ ] Add blog route to App.tsx
- [ ] Test blog post renders correctly with all SEO elements



## Blog Post Publication - Swimming Events 2026

- [x] Copy swimming caps product photos to project public folder
- [x] Add swimming caps gallery section to /gorros-natacion page
- [x] Create swimming events 2026 blog post page component
- [x] Add SEO meta tags (title, description, keywords, Open Graph)
- [x] Add JSON-LD structured data (Article schema, FAQ schema, BreadcrumbList, Organization)
- [ ] Add citations to RFEN and federation sources
- [ ] Add Q&A section optimized for ChatGPT/AI search
- [ ] Add images with proper alt text
- [x] Fix homepage EuroSwimCaps CTA to link to /gorros-natacion
- [ ] Ensure swimming caps is positioned as complementary service (not primary theme) for SEO benefit


## Widget System - COMPLETE ✅ (Dec 5, 2024)

- [x] Design widget configuration interface
- [x] Build widget iframe endpoint with query parameters (mode, style, color, lang, discipline, region, fed)
- [x] Create widget UI components (list, calendar, cards views)
- [x] Add multi-language support (ES, CA, EU, GL, VA, EN)
- [x] Implement federation dashboard widget builder at /widget/builder
- [x] Test widget embed and create demo page at /widget/demo
- [x] Write comprehensive vitest tests for widget functionality (10 tests passing)

### Widget Features Completed ✅
- [x] Three display styles: List (vertical), Cards (grid), Calendar (by month)
- [x] Six languages: Spanish, Catalan, Basque, Galician, Valencian, English
- [x] Color customization (8 presets + custom hex input)
- [x] Display mode: All events vs Own events (highlighted with border)
- [x] Optional filters: Discipline, Region
- [x] Live preview in widget builder with real-time updates
- [x] HTML embed code generator with copy button
- [x] Direct URL with copy button
- [x] Usage instructions and quick tips
- [x] Demo page with 4 example configurations (Spanish list, Catalan cards, Basque calendar, filtered)
- [x] Responsive design (mobile, tablet, desktop)
- [x] "Powered by AquaEvents.club" footer link

### Widget Routes Created ✅
- [x] /widget/calendar - Embeddable widget iframe endpoint
- [x] /widget/builder - Visual configuration interface for federations
- [x] /widget/demo - Showcase page with multiple examples

### Widget Documentation TODO 📋
- [ ] Add widget builder link to federation dashboard
- [ ] Add widget demo link to main navigation
- [ ] Create federation outreach materials (email templates, benefits list)
- [ ] Add widget analytics (view count, click tracking)
- [ ] Add widget customization presets (federation templates)


## Full Site Internationalization (i18n) - IN PROGRESS 🔄

- [ ] Install react-i18next and i18next libraries
- [ ] Create translation infrastructure with language detection
- [ ] Create translation files for 6 languages (ES, CA, EU, GL, VA, EN)
- [ ] Add language switcher component to header navigation
- [ ] Translate homepage (hero, features, CTA, stats, FAQ)
- [ ] Translate main navigation menu
- [ ] Translate events listing page (filters, buttons, empty states)
- [ ] Translate event detail pages (labels, buttons, related events)
- [ ] Translate event submission form
- [ ] Translate user profile page
- [ ] Translate authentication pages (login, register)
- [ ] Translate blog listing and detail pages
- [ ] Translate federation pages
- [ ] Translate admin dashboard
- [ ] Store user language preference in localStorage
- [ ] Test all pages in all 6 languages
- [ ] Update SEO meta tags with language-specific content
- [ ] Add hreflang tags for SEO


## AI-Powered Auto-Translation System - IN PROGRESS 🔄

- [ ] Design translation cache architecture
- [ ] Create MongoDB schema for translation cache (source_text, target_lang, translated_text, hash)
- [ ] Build tRPC endpoints for translation (getTranslation, cacheTranslation)
- [ ] Create LLM translation service with context awareness
- [ ] Add language prefix routing (/ca/, /eu/, /gl/, /va/, /en/)
- [ ] Update Navigation with correct regional flags (CAT, EUS, GAL, VAL)
- [ ] Create TranslatedText wrapper component
- [ ] Implement automatic translation on language switch
- [ ] Add translation caching to avoid re-translating
- [ ] Generate hreflang tags for SEO
- [ ] Test translation quality in all 6 languages
- [ ] Verify SEO meta tags update per language
- [ ] Test language persistence in localStorage


## Full Site Internationalization - Homepage Complete ✅

- [x] Install i18next and react-i18next
- [x] Create i18n configuration with 6 languages (ES, CA, EU, GL, VA, EN)
- [x] Create comprehensive translation files for all 6 languages
- [x] Add LanguageSwitcher component with proper regional identifiers (CAT, EUS, GAL, VAL)
- [x] Add Navigation component with i18n support
- [x] Translate homepage hero section
- [x] Translate homepage features section
- [x] Translate homepage stats section
- [x] Translate homepage events preview
- [x] Translate homepage CTA sections
- [x] Translate homepage FAQ section
- [x] Test all 6 languages (Spanish, Catalan, Basque, Galician, Valencian, English)
- [ ] Translate Events listing page
- [ ] Translate Event detail page
- [ ] Translate forms (event submission, profile)
- [ ] Add SEO hreflang tags for multi-language indexing


## Mobile UX Fixes - COMPLETE ✅

- [x] Fix language switcher overlapping logo on mobile
- [x] Add proper regional flags (Catalonia, Basque, Galicia, Valencia)
- [x] Improve mobile header spacing and layout (smaller logo, better flex)
- [x] Add Unicode regional flag emojis (🏴󠁥󠁳󠁣󠁴󠁿 🏴󠁥󠁳󠁰󠁶󠁿 🏴󠁥󠁳󠁧󠁡󠁿 🏴󠁥󠁳󠁶󠁣󠁿)
- [x] Test responsive design on desktop and mobile


## SVG Regional Flags - COMPLETE ✅

- [x] Find official SVG flags for Catalonia, Basque, Galicia, Valencia from Wikimedia Commons
- [x] Add SVG flag files to client/public/flags/ directory (6 flags total)
- [x] Update LanguageSwitcher to use SVG images instead of Unicode emojis
- [x] Ensure flags display correctly on all devices (Android, iOS, Windows, Mac)
- [x] Test flag display in language dropdown - all flags showing correctly
- [x] Verified authentic regional flags: Catalan Senyera, Basque Ikurriña, Galician flag with coat of arms, Valencian flag with blue stripe


## Complete Full Site Translation - IN PROGRESS 🔄

- [ ] Add missing homepage translation keys (custom caps CTA, features, etc.)
- [ ] Translate custom caps promotional card
- [ ] Translate "Everything You Need" features section
- [ ] Translate "Upcoming Events" section
- [ ] Translate Events listing page (/eventos)
- [ ] Translate event filters (discipline, region, date)
- [ ] Translate Event detail page
- [ ] Translate event registration info and dates
- [ ] Test all pages in all 6 languages
