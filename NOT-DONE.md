# Popup — What's Not Done Yet

Based on `POPUP-BUILD-PHASES.md`. Current status as of last check.

---

## ✅ DONE (Phases 0–5)

- **Phase 0:** Project setup, Next.js, deps, Vercel
- **Phase 1:** Landing page (editorial luxury design)
- **Phase 2:** Design system + 10 themes (Atelier, Harvest, Gallery, Botanica, Soirée, Brutalist, Zen, Maximalist, Neon, Vintage)
- **Phase 3:** Event page with demo data
- **Phase 4:** Auth + Supabase (login, signup, callback)
- **Phase 5:** Create flow (category → details → generating → preview)

---

## 🚧 IN PROGRESS / PARTIAL

- **Uncommitted changes:** `globals.css`, `page.tsx`, `EventPreview.tsx`, `demoEvents.ts`, `fonts.ts`, `themes.ts` — consider committing
- **Create flow:** May need AI generation API wired to OpenAI
- **Editor:** Exists at `/edit/[slug]` — verify full functionality

---

## ❌ NOT DONE (Phases 6–10)

| Phase | Feature | Status |
|-------|---------|--------|
| **6** | Editor — inline edit, auto-save, image upload, theme switcher | Partial — needs verification |
| **7** | Publish + $9.99 Stripe checkout | Exists — verify flow |
| **8** | Ticket sales — purchase flow, confirmation, Resend email | Exists — verify |
| **9** | Dashboard + guest management (check-in, CSV export) | Exists — verify |
| **10** | Stripe Connect — organizers collect ticket revenue | Not done |

---

## Screenshots

Run with dev server:

```bash
npm run dev          # Terminal 1
npm run screenshots  # Terminal 2
```

Output: `screenshots/` folder (01-homepage.png, 02-login.png, etc.)

---

## Launch Checklist (from build plan)

- [ ] Landing page is breathtaking
- [ ] 10 themes all render correctly
- [ ] Auth works (email + Google)
- [ ] Create flow generates real events with AI
- [ ] Editor lets you customize everything
- [ ] Publish flow charges $9.99
- [ ] Tickets can be purchased (free + paid)
- [ ] Confirmation emails send
- [ ] Dashboard shows all events
- [ ] Guest list with check-in works
- [ ] Stripe Connect (Phase 10)
- [ ] Mobile responsive throughout
- [ ] Domain connected
- [ ] Vercel deploy working
