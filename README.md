# Sports Meet - Results Management System

A full-stack web application for managing and displaying sports meet results
(Blue Star Sports Club).

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express (deployed as Vercel serverless functions)
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel

## Project Structure

```
sports-meet/
├── api/             # Vercel serverless entry (wraps the Express app)
├── client/          # React + Vite frontend
├── server/          # Express API (app.js exports the app; index.js runs it locally)
├── database/        # supabase.sql (Postgres schema + seed)
├── vercel.json      # Vercel build + routing config
└── package.json     # Root: API dependencies + build orchestration
```

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of
   [`database/supabase.sql`](database/supabase.sql), and run it.
   This creates the tables and seeds a default admin and sample age categories.
3. Go to **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **`service_role` key** (under "Project API keys") → `SUPABASE_SERVICE_ROLE_KEY`

   > The `service_role` key bypasses Row Level Security and is used only by the
   > server-side API. Never expose it in the browser or commit it.

**Admin login:** username `admin`. Set a strong password and keep it out of this
file — the repository is public, so never document a real, working credential here.

## 2. Local Development

Copy [`.env.example`](.env.example) to `server/.env` and fill in your Supabase
values:

```bash
cp .env.example server/.env
```

Then run the API and client in two terminals:

```bash
# Terminal 1 — API (http://localhost:5000)
cd server
npm install
npm run dev

# Terminal 2 — client (http://localhost:3000)
cd client
npm install
npm run dev
```

Vite proxies `/api/*` to the Express server on port 5000 (see
[`client/vite.config.js`](client/vite.config.js)), so the app behaves the same
locally as it does on Vercel.

## 3. Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket and **import the project** in Vercel
   (set the project root to the `sports-meet` folder if it lives in a subdirectory).
2. Vercel reads [`vercel.json`](vercel.json) automatically — no framework preset
   needed. It builds the client to `client/dist` and serves the Express app from
   `/api/*`.
3. Add **Environment Variables** (Project → Settings → Environment Variables):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
4. Deploy. The SPA is served statically, all `/api/*` requests hit the serverless
   function, and client-side routes fall back to `index.html`.

## Features
- Browse results by Age Category → Gender → Sport
- View Gold, Silver, Bronze winners
- Admin panel for managing events and results
- JWT-based admin authentication
