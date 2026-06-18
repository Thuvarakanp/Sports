// Vercel serverless function entry point.
// The Express app is a standard (req, res) handler, so Vercel can invoke it
// directly. vercel.json rewrites every /api/* request to this function, and the
// app's own router (mounted at /api/...) matches the original request path.
module.exports = require('../server/app');
