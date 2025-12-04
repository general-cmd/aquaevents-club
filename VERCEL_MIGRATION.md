# AquaEvents.club - Vercel Migration Plan

## Overview
Migrate from Manus hosting to Vercel for reliable deployment and full control.

## Phase 1: Prepare Project for Vercel

### 1.1 Create Vercel Configuration
- [ ] Create `vercel.json` with proper build settings
- [ ] Update build scripts for Vercel compatibility
- [ ] Configure serverless function routes

### 1.2 Environment Variables Checklist
Required environment variables to configure in Vercel:

**Database:**
- `DATABASE_URL` - MongoDB connection string (from current project)

**Authentication:**
- `JWT_SECRET` - Session signing secret
- `OAUTH_SERVER_URL` - Manus OAuth backend URL
- `OWNER_OPEN_ID` - Owner identity
- `OWNER_NAME` - Owner name

**Frontend (VITE_ prefix):**
- `VITE_APP_ID` - Application ID
- `VITE_OAUTH_PORTAL_URL` - OAuth login portal
- `VITE_APP_TITLE` - "AquaEvents.club"
- `VITE_APP_LOGO` - Logo URL
- `VITE_ANALYTICS_ENDPOINT` - Analytics endpoint
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics ID

**API Keys:**
- `BUILT_IN_FORGE_API_URL` - Manus APIs URL
- `BUILT_IN_FORGE_API_KEY` - Manus APIs key
- `VITE_FRONTEND_FORGE_API_KEY` - Frontend API key
- `VITE_FRONTEND_FORGE_API_URL` - Frontend API URL
- `SYSTEME_API_KEY` - Systeme.io API key

### 1.3 Adjust Project Structure
- [ ] Ensure Express server is compatible with Vercel serverless
- [ ] Update import paths if needed
- [ ] Test build locally

## Phase 2: GitHub Repository Setup

### 2.1 Create Repository
- [ ] Create new GitHub repository (public or private)
- [ ] Initialize git in project directory
- [ ] Create `.gitignore` for node_modules, .env, dist

### 2.2 Push Code
- [ ] Add all files to git
- [ ] Commit with message "Initial commit - AquaEvents.club"
- [ ] Push to GitHub main branch

## Phase 3: Vercel Configuration

### 3.1 Connect to Vercel
- [ ] Import GitHub repository in Vercel dashboard
- [ ] Configure build settings (Framework: Vite, Build Command: `pnpm build`)
- [ ] Set output directory: `dist/public`

### 3.2 Environment Variables
- [ ] Add all environment variables from checklist above
- [ ] Verify each variable is correctly set
- [ ] Save configuration

### 3.3 Database Connection
- [ ] Verify MongoDB connection string works from Vercel
- [ ] Test database queries after deployment
- [ ] Ensure IP whitelist includes Vercel IPs (or use 0.0.0.0/0 for MongoDB Atlas)

## Phase 4: Deploy and Test

### 4.1 Initial Deployment
- [ ] Trigger deployment from Vercel dashboard
- [ ] Monitor build logs for errors
- [ ] Fix any build issues

### 4.2 Functionality Testing
- [ ] Test homepage loads correctly
- [ ] Test event listing and filtering
- [ ] Test blog pages and swimming events 2026 post
- [ ] Test swimming caps page and inquiry form
- [ ] Test authentication flow
- [ ] Test database queries (events, blog posts)
- [ ] Test form submissions and notifications

## Phase 5: Custom Domain

### 5.1 Configure Domain
- [ ] Add aquaevents.club to Vercel project
- [ ] Update DNS records at domain registrar:
  - A record: 76.76.21.21
  - CNAME record: cname.vercel-dns.com
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Verify SSL certificate is issued automatically

### 5.2 Final Testing
- [ ] Test site on custom domain
- [ ] Verify SSL certificate works
- [ ] Test all functionality on production domain
- [ ] Update any hardcoded URLs if needed

## Rollback Plan
If migration fails, we can:
1. Keep Manus hosting as backup
2. Point DNS back to Manus
3. Debug Vercel issues without downtime

## Estimated Timeline
- Phase 1: 30 minutes
- Phase 2: 15 minutes
- Phase 3: 20 minutes
- Phase 4: 30 minutes
- Phase 5: 24-48 hours (DNS propagation)

**Total active work: ~2 hours**
**Total time including DNS: 1-2 days**
