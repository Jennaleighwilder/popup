# Popup — Full-Stack Backend Architecture & Deployment Guide

**Design by Jenna Leigh West · The Forgotten Code**

This document explains how Popup connects to its backend, what's real vs demo, and how to deploy it like [Launchpad](https://launchpad-conference-platform.vercel.app/).

---

## 1. How Everything Connects

### Data Flow Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           POPUP FULL-STACK FLOW                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LANDING (/ & /m)          CREATE (/create)           EVENT PAGE (/e/[slug]) │
│       │                           │                           │             │
│       │  "Create Event"           │  Form submit              │  Fetch      │
│       └──────────────────────────►│  POST /api/events/generate │◄────────────┤
│                                  │         │                  │             │
│                                  │         ▼                  │             │
│                                  │  ┌──────────────┐          │             │
│                                  │  │ OpenAI API   │ (if key) │             │
│                                  │  │ OR template  │ (fallback)             │
│                                  │  └──────┬───────┘          │             │
│                                  │         │                  │             │
│                                  │         ▼                  │             │
│                                  │  ┌──────────────┐          │             │
│                                  │  │ Supabase     │◄─────────┼── GET /api/events/[slug]
│                                  │  │ events table │          │             │
│                                  │  └──────┬───────┘          │             │
│                                  │         │                  │             │
│  PUBLISH (/publish/[slug])        │         │                  │             │
│       │                          │         │                  │             │
│       │  POST /api/publish       │         │                  │             │
│       └─────────────────────────►│  Stripe $9.99               │             │
│                                  │         │                  │             │
│  TICKETS (/e/[slug]/tickets)      │         │                  │             │
│       │                          │         │                  │             │
│       │  POST /api/checkout      │         │                  │             │
│       └─────────────────────────►│  Stripe Connect (organizer) │             │
│                                  │  OR platform fee           │             │
│                                  │         │                  │             │
│                                  │         ▼                  │             │
│                                  │  ┌──────────────┐          │             │
│                                  │  │ attendees    │          │             │
│                                  │  │ ticket_tiers │          │             │
│                                  │  └──────┬───────┘          │             │
│                                  │         │                  │             │
│  CONFIRMATION EMAIL               │         ▼                  │             │
│       │                          │  Resend API                │             │
│       └──────────────────────────│  sendConfirmationEmail     │             │
│                                  │                           │             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Backend Components (What Popup Has)

| Component | Purpose | File(s) | Status |
|-----------|---------|---------|--------|
| **Supabase** | Auth, PostgreSQL DB, RLS | `lib/supabase.ts`, `lib/supabase-server.ts` | ✅ Full schema |
| **OpenAI** | AI event generation (GPT-4o-mini) | `api/events/generate/route.ts` | ✅ With template fallback |
| **Stripe** | $9.99 publish fee, ticket payments | `api/checkout`, `api/publish`, `api/webhooks/stripe` | ✅ Stripe Connect ready |
| **Resend** | Confirmation emails | `lib/sendConfirmationEmail.ts` | ✅ Wired |
| **URL Scrape** | Import from existing event URL | `api/events/scrape/route.ts` | ✅ |

### API Routes (All Real)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/events/generate` | POST | AI or template event generation → Supabase insert |
| `/api/events/[slug]` | GET | Fetch event (demo or DB) |
| `/api/events/[slug]` | PATCH | Update event (editor) |
| `/api/events/mine` | GET | List user's events |
| `/api/events/scrape` | POST | Scrape event data from URL |
| `/api/events/[slug]/attendees` | GET/POST | Guest list, add attendee |
| `/api/events/[slug]/attendees/export` | GET | CSV export |
| `/api/attendees/[id]/confirmation` | GET | Resend confirmation |
| `/api/publish` | POST | Create Stripe session for $9.99 |
| `/api/checkout` | POST | Create Stripe session for ticket purchase |
| `/api/webhooks/stripe` | POST | Stripe webhooks (payment confirmation) |
| `/api/stripe/connect` | GET | OAuth for organizer payouts |
| `/api/profiles/me` | GET | Current user profile |

### Database Schema (Supabase)

- **profiles** — user display name, email, `stripe_connect_id`
- **events** — slug, name, category, theme, status, content (JSONB), dates, venue
- **ticket_tiers** — per-event ticket types
- **attendees** — name, email, payment_status, check_in_code
- **waitlist** — sold-out signups

---

## 3. Demo Mode vs Production

When **Supabase is not configured** (no `NEXT_PUBLIC_SUPABASE_URL`):

- Auth is skipped — you can use `/create` without logging in
- Events are stored in **localStorage** only (draft)
- `/api/events/[slug]` returns 404 for non-demo slugs
- Checkout returns "Database not configured"
- Publish returns "Database not configured"

When **Supabase is configured**:

- Auth works (Google OAuth, email/password)
- Events persist in PostgreSQL
- Published events are publicly viewable
- Checkout creates Stripe sessions
- Resend sends confirmation emails

---

## 4. Comparison: Popup vs Launchpad vs Market

| Feature | Popup | Launchpad | Eventbrite/Bizzabo |
|---------|-------|-----------|---------------------|
| AI event generation | ✅ OpenAI + template fallback | ✅ 5-agent swarm | ❌ Manual |
| URL import (scrape) | ✅ | ❌ | ❌ |
| Supabase persistence | ✅ | ✅ (in-memory fallback) | Proprietary |
| Stripe payments | ✅ $9.99 + tickets | ✅ | ✅ |
| Stripe Connect (organizer payouts) | ✅ Schema ready | ✅ | ✅ |
| Confirmation emails | ✅ Resend | ✅ Resend | ✅ |
| Guest management | ✅ Check-in, CSV export | ✅ | ✅ |
| 10 design themes | ✅ | 8+ themes | Limited |
| Promotion engine | ❌ | ✅ 6 AI bots | ❌ |
| GDPR / EU AI Act copy | ❌ | ✅ | Varies |
| Demo mode (no DB) | ✅ | ✅ | ❌ |

---

## 5. What Popup Needs to Be "REAL"

### Already Real

- Full create → generate → edit → publish → ticket flow
- Supabase schema with RLS
- Stripe checkout for tickets (free + paid)
- Resend confirmation emails
- Dashboard, guest list, check-in, CSV export
- Mobile page (`/m`) with linking

### To Deploy Like Launchpad

1. **Environment variables** (Vercel)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel domain)

2. **Supabase**
   - Run `supabase/migrations/001_initial_schema.sql` in SQL Editor
   - Enable Google OAuth, add redirect URLs
   - Optional: EU region (Frankfurt) for GDPR

3. **Stripe**
   - Create products/prices for $9.99 publish fee
   - Set up Connect for organizer payouts
   - Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

4. **Resend**
   - Create domain, verify
   - Use `RESEND_API_KEY`

5. **Vercel**
   - Connect Git repo
   - Add env vars
   - Deploy

---

## 6. Landing vs Backend — How They Connect

The **landing page** (`/` and `/m`) is marketing. The **Create Event** button links to `/create`, which:

1. Requires auth (or demo mode)
2. Shows category picker → form
3. Calls `POST /api/events/generate` with `{ category, city, dateStart, time, ... }`
4. API uses OpenAI (if key) or template
5. API inserts into Supabase `events` (if configured)
6. Returns event data → user goes to `/edit/[slug]` or `/publish/[slug]`

The **event page** (`/e/[slug]`) fetches:

- **Demo events** — from `demoEvents.ts` (hardcoded)
- **Published events** — from `GET /api/events/[slug]` → Supabase

So: landing → create → generate API → Supabase → event page. All connected.

---

## 7. Optional: Add Launchpad-Style Features

If you want Popup to match Launchpad's promotion engine:

- **Promotion bots** — Social Blitz, Community Infiltrator, Email Outreach, etc.
- **Swarm AI** — 5 parallel agents (Speaker, Venue, Schedule, Pricing, Branding)
- **GDPR/EU AI Act** — Privacy page, consent flows

These are additive. Popup's core is already production-ready.
