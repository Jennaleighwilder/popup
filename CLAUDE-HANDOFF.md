# Popup — Handoff for Claude

**Copy everything below this line and paste into Claude to continue work.**

---

## Project: Popup

A lifestyle pop-up event platform. "AI builds it in 60 seconds. You make it yours."  
Design: luxury editorial magazine aesthetic (Condé Nast, gallery invitations, farm-to-table warmth).

**Repo:** https://github.com/Jennaleighwilder/popup  
**Path:** `/Users/jenniferwest/Downloads/popup`

---

## Tech Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4, Framer Motion, Lenis (smooth scroll)
- Supabase (auth, database), Stripe, Resend, OpenAI

---

## What's Done

| Phase | Feature |
|-------|---------|
| 0 | Project setup, Vercel deploy |
| 1 | Landing page — editorial luxury design |
| 2 | 10 themes: Atelier, Harvest, Gallery, Botanica, Soirée, Brutalist, Zen, Maximalist, Neon, Vintage |
| 3 | Event page `/e/[slug]` with demo data |
| 4 | Auth — login, signup, Supabase |
| 5 | Create flow — category → details → generating → preview |

---

## What's Not Done / Needs Verification

| Phase | Feature | Notes |
|-------|---------|------|
| 6 | Editor `/edit/[slug]` | Inline edit, auto-save, image upload, theme switcher — verify |
| 7 | Publish + $9.99 Stripe | `/publish/[slug]` — verify flow |
| 8 | Ticket sales | Purchase flow, confirmation page, Resend email — verify |
| 9 | Dashboard + guests | `/dashboard`, guest list, check-in, CSV export — verify |
| 10 | Stripe Connect | Organizers collect ticket revenue — **not built** |

---

## Key Files

- `src/app/page.tsx` — Landing
- `src/app/create/page.tsx` — Create flow
- `src/app/e/[slug]/page.tsx` — Event page (public)
- `src/app/edit/[slug]/page.tsx` — Editor
- `src/components/EventPreview.tsx` — Event layout
- `src/lib/themes.ts` — 10 theme definitions
- `src/lib/demoEvents.ts` — Demo event data
- `PAGE-BREAKDOWN.md` — Design reference (fonts, themes, structure)
- `POPUP-BUILD-PHASES.md` — Full build plan (in Downloads folder)

---

## Screenshots

`/Users/jenniferwest/Downloads/popup/screenshots/`  
01-homepage, 02-login, 03-signup, 04-create-step1, 05–11 event pages (themes)

To recapture: `npm run dev` then `npm run screenshots`

---

## Uncommitted Changes

`globals.css`, `page.tsx`, `EventPreview.tsx`, `demoEvents.ts`, `fonts.ts`, `themes.ts` — consider committing.

---

## Run

```bash
cd /Users/jenniferwest/Downloads/popup
npm install
npm run dev
```

Open http://localhost:3000

---

## Design Direction

- Warm cream (#FAF7F2), copper accent (#C4956A), serif headlines
- NOT dark tech, NOT SaaS cookie-cutter
- Magazine-style layouts, generous whitespace, organic animations
