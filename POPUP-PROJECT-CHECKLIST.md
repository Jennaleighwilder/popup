# Popup Project Checklist — Make Sure the Site Uses It

Your Popup Supabase project: `oistyeccgqnshsdnmxqzm`  
Project URL: `https://oistyeccgqnshsdnmxqzm.supabase.co`

---

## 1. Vercel Environment Variables

The Popup site must use this project's keys. In **Vercel → Popup project → Settings → Environment Variables**, set:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://oistyeccgqnshsdnmxqzm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (anon public key from Popup project) |
| `SUPABASE_SERVICE_ROLE_KEY` | (service_role key from Popup project) |

Get these from: **Supabase → Popup project → Settings → API**

---

## 2. Supabase URL Configuration

In **Supabase → Popup project → Authentication → URL Configuration**:

- **Site URL:** `https://popup-tawny-nu.vercel.app`
- **Redirect URLs:** Add `https://popup-tawny-nu.vercel.app/auth/callback`

Click **Save**.

---

## 3. Run the Migration (if you haven’t)

In **Supabase → Popup project → SQL Editor**:

1. Open `RUN-THIS-IN-SUPABASE.sql`
2. Copy all → Paste into SQL Editor → **Run**

---

## 4. Google OAuth (if not set up yet)

In **Supabase → Popup project → Authentication → Providers → Google**:

- Turn it **ON**
- Add your Google OAuth Client ID and Secret (from Google Cloud Console)
- In Google Cloud Console, add this to **Authorized redirect URIs**:  
  `https://oistyeccgqnshsdnmxqzm.supabase.co/auth/v1/callback`

---

## 5. Redeploy

Vercel → Deployments → **Redeploy** (so it picks up any env var changes).

---

Done. The Popup site will use the Popup Supabase project.
