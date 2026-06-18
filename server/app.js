const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/results', resultRoutes);

// Health check
app.get('/api', (req, res) => {
    res.json({ message: 'Sports Meet API is running' });
});

// TEMPORARY diagnostic — reports which env-var NAMES the function sees (never
// values). Remove once the Vercel env config is confirmed working.
app.get('/api/_diag', (req, res) => {
    res.json({
        present: {
            SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
            SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
            JWT_SECRET: Boolean(process.env.JWT_SECRET)
        },
        matchingKeys: Object.keys(process.env).filter((k) => /SUPA|JWT/i.test(k))
    });
});

module.exports = app;
