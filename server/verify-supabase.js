// Quick connection check: run `node verify-supabase.js` from the server folder
// after filling in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env.
const supabase = require('./config/supabase');

(async () => {
    const tables = ['admins', 'age_categories', 'sports', 'results'];
    console.log('Checking Supabase connection...\n');

    let ok = true;
    for (const table of tables) {
        const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });

        if (error) {
            ok = false;
            console.log(`  ✗ ${table.padEnd(15)} ${error.message}`);
        } else {
            console.log(`  ✓ ${table.padEnd(15)} ${count} row(s)`);
        }
    }

    console.log(
        ok
            ? '\n✅ Supabase is connected and the schema is in place.'
            : '\n❌ Something is off — check your keys and that supabase.sql was run.'
    );
    process.exit(ok ? 0 : 1);
})();
