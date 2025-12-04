# Railway Environment Variables

Copy these environment variables to your Railway project settings.

## Required Variables

```
DATABASE_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=<your_owner_id>
OWNER_NAME=<your_owner_name>
VITE_APP_ID=<your_app_id>
VITE_OAUTH_PORTAL_URL=https://login.manus.im
VITE_APP_TITLE=AquaEvents.club
VITE_APP_LOGO=<your_logo_url>
VITE_ANALYTICS_ENDPOINT=<your_analytics_endpoint>
VITE_ANALYTICS_WEBSITE_ID=<your_website_id>
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=<your_forge_api_key>
VITE_FRONTEND_FORGE_API_KEY=<your_frontend_forge_key>
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
SYSTEME_API_KEY=<your_systeme_api_key>
PORT=3000
NODE_ENV=production
```

## How to Add in Railway

1. Go to your Railway project
2. Click on your service
3. Go to "Variables" tab
4. Click "Raw Editor"
5. Paste the variables above (with actual values)
6. Click "Update Variables"
7. Railway will automatically redeploy

