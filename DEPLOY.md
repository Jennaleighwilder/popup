# Popup — Deploy to Vercel (Like Launchpad)

**Design by Jenna Leigh West · The Forgotten Code**

Follow these steps to deploy Popup as a full-stack, production-ready app.

---

## 1. Supabase Setup

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → New Project
2. **SQL Editor** → paste and run `supabase/migrations/001_initial_schema.sql`
3. **Settings → API** → copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`
4. **Authentication → Providers** → enable Google (add OAuth credentials)
5. **Authentication → URL Configuration** → add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-app.vercel.app/auth/callback`

---

## 2. Stripe Setup

1. [dashboard.stripe.com](https://dashboard.stripe.com) → Developers → API keys
2. Copy **Secret key** → `STRIPE_SECRET_KEY`
3. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. **Developers → Webhooks** → Add endpoint:
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`
6. (Optional) **Connect** → set up Stripe Connect for organizer payouts

---

## 3. OpenAI Setup

1. [platform.openai.com](https://platform.openai.com) → API keys
2. Create key → `OPENAI_API_KEY`
3. Without this, Popup uses template-based generation (still works)

---

## 4. Resend Setup (Emails)

1. [resend.com](https://resend.com) → API Keys
2. Create key → `RESEND_API_KEY`
3. Add and verify your domain for sending

---

## 5. Vercel Deployment

1. Push Popup to GitHub (if not already)
2. [vercel.com](https://vercel.com) → New Project → Import repo
3. **Environment Variables** → add all:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | from Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | from Supabase |
| `OPENAI_API_KEY` | from OpenAI |
| `STRIPE_SECRET_KEY` | from Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | from Stripe |
| `STRIPE_WEBHOOK_SECRET` | from Stripe webhook |
| `RESEND_API_KEY` | from Resend |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |

4. Deploy

---

## 6. Post-Deploy: Webhook Fix

Stripe webhooks need the live URL. After first deploy:

1. Update Stripe webhook URL to your real Vercel URL
2. Re-deploy if you change `STRIPE_WEBHOOK_SECRET`

---

## 7. Verify Flow

1. **Landing** → `/` or `/m` (mobile)
2. **Create Event** → `/create` → generate → edit
3. **Publish** → `/publish/[slug]` → $9.99 Stripe → success
4. **Event page** → `/e/[slug]` (public)
5. **Buy ticket** → `/e/[slug]/tickets` → Stripe checkout
6. **Confirmation** → email via Resend
7. **Dashboard** → `/dashboard` → guest list, check-in, export

---

## Local Development

```bash
cp .env.example .env.local
# Fill in .env.local with your keys
npm run dev
```

Without Supabase keys, the app runs in **demo mode** — create flow works, events stored in localStorage only.
