# Popup Setup Guide

## Phase 4: Auth + Database

### 1. Supabase Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project (or use existing: `zqtnmznyyzjstmtqcscv`)
3. Go to **Settings > API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Run the Database Migration

1. In Supabase Dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run it

### 3. Configure Auth (for Google sign-in)

1. Go to **Authentication > Providers** and enable Google
2. Add your Google OAuth credentials
3. Go to **Authentication > URL Configuration**
4. Add to **Redirect URLs**:
   - `http://localhost:3000/auth/callback` (local dev)
   - `https://your-vercel-domain.vercel.app/auth/callback` (production)

### 4. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your real keys.

### 5. Vercel Deployment

Add the same environment variables in Vercel:
- **Settings > Environment Variables**
- Add all vars from `.env.example`

### Demo Mode

When Supabase is **not** configured (no `NEXT_PUBLIC_SUPABASE_URL`), the app runs in demo mode:
- Auth is skipped
- Protected routes (`/dashboard`, `/create`) still work (no redirect)
- You can explore the full UI without an account
