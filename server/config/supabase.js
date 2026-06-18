const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error(
        'Missing Supabase configuration. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
}

// Use a syntactically-valid placeholder when config is missing so createClient
// does not throw at module load — an unconfigured deploy then fails per-request
// with a handled 500 instead of crashing the whole function with an opaque
// FUNCTION_INVOCATION_FAILED.
// The service_role key bypasses Row Level Security, so this client must only
// ever run on the server (Express API / Vercel function) — never in the browser.
const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseKey || 'placeholder-key',
    { auth: { persistSession: false, autoRefreshToken: false } }
);

module.exports = supabase;
