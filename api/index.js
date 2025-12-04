// Vercel serverless function entry point
// This file exports the Express app for Vercel's serverless platform

import('../dist/index.js').then(module => {
  // The built server exports the Express app
  module.default || module.app;
}).catch(err => {
  console.error('Failed to load server:', err);
});

// For Vercel, we need to export the Express app directly
// The actual implementation will be in the built dist/index.js
export default async function handler(req, res) {
  const { default: app } = await import('../dist/index.js');
  return app(req, res);
}
