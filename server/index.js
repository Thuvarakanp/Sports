// Local development entry point.
// On Vercel the Express app is served as a serverless function (see /api/index.js),
// so this `listen` only runs when you start the server directly (npm run dev/start).
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
