# Full Page Breakdown — Popup Event Pages

Everything the event page (`/e/[slug]`) uses. Reference for design, fonts, images, and structure.

---

## 1. PAGE FLOW & ROUTING

**Route:** `src/app/e/[slug]/page.tsx`

- **URL:** `/e/{slug}?theme={themeId}` (e.g. `/e/the-edit-spring-sample-sale?theme=atelier`)
- **Theme override:** `?theme=` overrides event’s default theme
- **Data source:** Demo events from `demoEvents.ts` or API `/api/events/{slug}`

---

## 2. COMPONENTS

| Component | File | Purpose |
|-----------|------|---------|
| **ThemeProvider** | `src/components/ThemeProvider.tsx` | Injects theme CSS vars (colors, fonts) into the page |
| **EventPreview** | `src/components/EventPreview.tsx` | Main event layout (hero, sections, tickets, FAQ) |
| **SectionDivider** | `src/components/SectionDivider.tsx` | Dividers between sections (thin-line, botanical, wave, etc.) |

---

## 3. THEMES (10 total)

**File:** `src/lib/themes.ts`

| Theme ID | Display Font | Body Font | Mono Font | Accent | Section Divider |
|----------|--------------|-----------|-----------|--------|-----------------|
| **atelier** | Bodoni Moda | Archivo | DM Mono | #B91C1C | thin-line |
| **harvest** | Playfair Display | Lato | Courier Prime | #C45C2C | botanical |
| **gallery** | EB Garamond | Inter | Space Mono | #0F0F0F | none |
| **botanica** | Cardo | Nunito Sans | IBM Plex Mono | #3D6B3D | wave |
| **soiree** | Italiana | Syne | Fira Mono | #D4AF37 | gold-line |
| **brutalist** | Space Grotesk | JetBrains Mono | JetBrains Mono | #FF3B00 | thick-line |
| **zen** | Noto Serif JP | Crimson Pro | IBM Plex Mono | #6B5A4A | brush-stroke |
| **maximalist** | Abril Fatface | Libre Baskerville | Fira Mono | #E63946 | pattern |
| **neon** | Outfit | Syne | Fira Code | #00FF88 | glow-line |
| **vintage** | Cinzel | Lora | Courier Prime | #8B2500 | ornament |

**Theme CSS variables:** `--theme-bg`, `--theme-text`, `--theme-accent`, `--theme-display-font`, `--theme-body-font`, `--theme-mono-font`, etc.

---

## 4. FONTS (Google Fonts)

**File:** `src/lib/fonts.ts`  
**Loaded in:** `src/app/layout.tsx` via `allThemeFontClasses`

| Font | Variable | Used by |
|------|----------|---------|
| Cormorant Garamond | --font-cormorant | Homepage, fallback |
| Montserrat | --font-montserrat | Homepage |
| DM Mono | --font-dm-mono | Atelier mono |
| Bodoni Moda | --font-bodoni-moda | Atelier display |
| Archivo | --font-archivo | Atelier body |
| Playfair Display | --font-playfair | Harvest |
| Lato | --font-lato | Harvest |
| Courier Prime | --font-courier-prime | Harvest, Vintage |
| EB Garamond | --font-eb-garamond | Gallery |
| Inter | --font-inter | Gallery |
| Space Mono | --font-space-mono | Gallery |
| Cardo | --font-cardo | Botanica |
| Nunito Sans | --font-nunito-sans | Botanica |
| IBM Plex Mono | --font-ibm-plex-mono | Botanica, Zen |
| Italiana | --font-italiana | Soirée |
| Syne | --font-syne | Soirée, Neon |
| Fira Mono | --font-fira-mono | Soirée, Maximalist |
| Space Grotesk | --font-space-grotesk | Brutalist |
| JetBrains Mono | --font-jetbrains-mono | Brutalist |
| Noto Serif JP | --font-noto-serif-jp | Zen |
| Crimson Pro | --font-crimson-pro | Zen |
| Abril Fatface | --font-abril-fatface | Maximalist |
| Libre Baskerville | --font-libre-baskerville | Maximalist |
| Outfit | --font-outfit | Neon |
| Fira Code | --font-fira-code | Neon |
| Cinzel | --font-cinzel | Vintage |
| Lora | --font-lora | Vintage |
| DM Sans | --font-body | Global body fallback |

---

## 5. HERO SECTION (EventPreview)

**Hero styling (all themes):**

- **Gradient overlay:** `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 25%, ...)` (Vintage uses sepia-tinted variant)
- **Hero text color:** `#FFFFFF`
- **Hero muted color:** `rgba(255,255,255,0.88)`
- **Text shadow:** `0 1px 3px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,0.9), 0 0 1px rgba(0,0,0,1)`
- **Ken Burns:** `.ken-burns` — 20s zoom animation on hero image
- **Wellness:** `.wellness-hero-pattern` — botanical SVG overlay (Botanica)
- **Music (Soirée):** Twinkle dots overlay

**CTA buttons:**

- Primary: `theme.colors.accent`
- Secondary “Learn More”: `rgba(0,0,0,0.4)` background, white border

---

## 6. EVENT DATA STRUCTURE

**File:** `src/types/event.ts`

```ts
EventData {
  slug, name, tagline, category, theme, city, venue, address, date, time
  heroImage, venueImage
  highlights[], hosts[], schedule[], tickets[], faqs[]
  brands?, menu?, journey?, vendors?, landscapeImages?, testimonials?
  whatsIncluded?, whatsNotIncluded?, dietaryNote?, capacity?
  ... (see types/event.ts for full list)
}
```

---

## 7. DEMO EVENTS & IMAGES

**File:** `src/lib/demoEvents.ts`

**Theme → Demo mapping:**

| Theme | Demo Slug |
|-------|-----------|
| atelier | the-edit-spring-sample-sale |
| harvest | spice-route-supper |
| gallery | first-friday-art-walk |
| botanica | morning-rituals |
| soiree | golden-hour-sessions |
| brutalist | first-friday-art-walk |
| zen | the-stone-room |
| maximalist | the-red-room |
| neon | neon-nights |
| vintage | the-makers-market |

**Hero & venue images by demo:**

| Demo | Hero Image | Venue Image |
|------|------------|-------------|
| the-edit-spring-sample-sale | photo-1515886657613 (fashion) | photo-1560448204 (retail) |
| the-long-table | photo-1556910103 | photo-1414235077428 |
| first-friday-art-walk | photo-1577720643272 | photo-1513364776144 |
| the-stone-room | photo-1528360983277 | photo-1578662996442 |
| morning-rituals | photo-1509316785289 (desert) | photo-1466692476868 |
| the-red-room | photo-1514933651103 | photo-1600585154340 |
| spice-route-supper | photo-1600891964092 | photo-1555396273 |
| the-makers-market | photo-1586075010923 | photo-1565193566173 |
| neon-nights | photo-1770297345741 | photo-1493225457124 |
| golden-hour-sessions | photo-1470229722913 | photo-1514525253161 |

**Image sources:** Unsplash (`images.unsplash.com`), ui-avatars.com (host avatars)

---

## 8. HOMEPAGE (page.tsx)

**File:** `src/app/page.tsx`

**Colors:**

- Background: `#2D2420`, `#3D2E28` (alt sections)
- Text: `#F5EDE4`, `#A89070` (muted)
- Accent: `#C4A574`, `#8B2500` (buttons)
- Border: `#5C4033`

**Fonts:**

- Headings: Cormorant Garamond
- Body: Montserrat

**Sections:**

1. **Opener** — “Event pages that feel like art.” + Create CTA
2. **Value prop** — “Editorial. Not template.” + 3 bullets (10 themes, 60 seconds, Experiences)
3. **Themes** — “Ten worlds.” — 4+6 theme cards, links to demos
4. **Demos** — “In the wild.” — 10 demo cards with hero images

**Theme preview images:** `THEME_PREVIEWS` in `page.tsx` (one Unsplash image per theme)

---

## 9. GLOBAL STYLES (globals.css)

**File:** `src/app/globals.css`

**CSS variables:**

- `--background: #2D2420`
- `--foreground: #F5EDE4`
- `--muted: #A89070`
- `--accent: #C4A574`
- `--editorial-red: #8B2500`

**Key classes:**

- `.ken-burns` — hero zoom
- `.section-luxury` — section padding (6rem / 9rem)
- `.event-hero-image` — sepia(0.05) saturate(1.05)
- `.wellness-hero-pattern` — botanical SVG overlay
- `.theme-uppercase-headings` — Brutalist uppercase
- `.theme-film-grain`, `.theme-sepia-images` — Vintage
- `.theme-glow-effects`, `.theme-gradient-text` — Neon

**Accessibility:** `data-dyslexia`, `data-adhd-focus`, `data-reduced-motion`, `data-high-contrast`, `data-text-size`

---

## 10. EVENT PREVIEW SECTIONS (in order)

1. **Nav** — “Popup” wordmark (fixed)
2. **Hero** — Full-screen image, gradient, title, tagline, date/venue, CTAs
3. **Gradient transition** + SectionDivider
4. **Sticky ticket bar** (when scrolled, hides when tickets in view)
5. **About / Highlights** — 3 highlight cards
6. **SectionDivider**
7. **People** — Hosts, brands, or vendors (by category)
8. **Artist bio** (art only)
9. **Schedule / Menu / Journey** — Menu, journey steps, or schedule
10. **Genre tags + testimonials** (music)
11. **Exhibition dates** (art)
12. **Featured works** (art)
13. **Related programming** (art)
14. **What’s included / not** (food)
15. **What to bring / provided / landscape / testimonials** (wellness)
16. **Shopping rules** (fashion)
17. **Getting there / vendor application** (market)
18. **Venue** — Venue image, name, address, Get Directions
19. **SectionDivider**
20. **Tickets** — Ticket tiers
21. **Share & Save**
22. **FAQ**
23. **Footer** — “Love this design?” CTA (demos), Powered by Popup

---

## 11. CATEGORY-SPECIFIC LABELS

**File:** `src/types/event.ts` — `CATEGORY_LABELS`

| Category | People | Schedule | Tickets | About |
|----------|--------|----------|---------|-------|
| fashion | Featured Brands | What to Expect | Get Access | About the Sale |
| food | Your Chef | The Menu | Reserve Your Seat | The Experience |
| art | The Artist | Exhibition Dates | Visit | About the Show |
| wellness | Your Guide | The Journey | Register | The Invitation |
| music | Your Hosts | The Program | Get Tickets | The Experience |
| market | Featured Vendors | What’s Happening | Free Entry | About the Market |

---

## 12. FILE REFERENCE

| Purpose | File |
|---------|------|
| Event page route | `src/app/e/[slug]/page.tsx` |
| Event layout | `src/components/EventPreview.tsx` |
| Theme config | `src/lib/themes.ts` |
| Font config | `src/lib/fonts.ts` |
| Demo data | `src/lib/demoEvents.ts` |
| Event types | `src/types/event.ts` |
| Theme provider | `src/components/ThemeProvider.tsx` |
| Section dividers | `src/components/SectionDivider.tsx` |
| Global styles | `src/app/globals.css` |
| Root layout | `src/app/layout.tsx` |
| Homepage | `src/app/page.tsx` |
