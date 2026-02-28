# Design Guide: 10 Theme Options

This document describes the visual intent and design system for each of the 10 themes in Popup. Use it to understand how themes transform event pages and to maintain consistency when adding new theme-specific styling.

---

## Theme Overview

| Theme | Category | Vibe | Best For |
|-------|----------|------|----------|
| **Atelier** | Fashion | Editorial, luxury | Sample sales, trunk shows, fashion pop-ups |
| **Harvest** | Food | Warm, farm-to-table | Supper clubs, tastings, chef's tables |
| **Gallery** | Art | Minimal, precise | Gallery openings, art walks, exhibitions |
| **Botanica** | Wellness | Organic, calm | Retreats, workshops, spa events |
| **Soirée** | Music | Dark, gold, intimate | DJ nights, listening parties, concerts |
| **Brutalist** | Any | Raw, bold, unapologetic | Underground events, experimental, design-forward |
| **Zen** | Any | Wabi-sabi, vast space | Meditation, minimal gatherings, contemplative |
| **Maximalist** | Any | Rich, layered, joyful | Festive events, parties, bold celebrations |
| **Neon** | Any | Electric, glow, energy | Nightlife, raves, high-energy events |
| **Vintage** | Any | Nostalgia, warmth, handmade | Markets, craft fairs, retro events |

---

## Theme Details

### Atelier
- **Colors:** Warm cream (#FAF8F5), amber accent (#C4956A)
- **Fonts:** Cormorant Garamond (display), Montserrat (body), DM Mono (mono)
- **Feel:** Vogue editorial — sharp corners, thin lines, luxury fashion
- **Hero:** Editorial full-bleed image with gradient
- **Buttons:** Outlined, square corners

### Harvest
- **Colors:** Rich cream (#EDE4D8), deep sienna (#6B3410), olive (#4A6B3A) — spice market meets Vogue
- **Fonts:** Playfair Display, Lato, Courier Prime
- **Feel:** Farm-to-table warmth, spice route, editorial
- **Hero:** Split layout, organic flow
- **Buttons:** Filled, rounded (4px)

### Gallery
- **Colors:** White (#FFFFFF), black accent (#111111), pop red (#E63946)
- **Fonts:** EB Garamond, Inter, Space Mono
- **Feel:** White walls, minimal, museum-quality
- **Hero:** Minimal, lots of whitespace
- **Buttons:** Outlined, square

### Botanica
- **Colors:** Warm off-white (#F5F0E8), sage (#5C7C50), gold (#C9A96E)
- **Fonts:** Cardo, Nunito Sans, IBM Plex Mono
- **Feel:** Wellness, nature, organic curves
- **Hero:** Editorial with wave dividers
- **Buttons:** Filled, pill-shaped (24px radius)

### Soirée
- **Colors:** Black (#0D0D0D), gold accent (#D4AF37)
- **Fonts:** Italiana, Poppins, Fira Mono
- **Feel:** Dark, cinematic, intimate nights
- **Hero:** Cinematic with gold accents
- **Buttons:** Outlined, gold border
- **Special:** Genre tags, testimonials on dark background

### Brutalist
- **Colors:** Deep charcoal (#0D0D0D), black (#1A1A1A), orange accent (#FF3B00)
- **Fonts:** Space Grotesk, JetBrains Mono
- **Feel:** Raw, bold, typographic, editorial dark
- **Hero:** Typographic, uppercase headings, dark gradient
- **Special effects:** Uppercase headings, bordered sections, overlapping elements
- **Buttons:** Filled, square, thick borders

### Zen
- **Colors:** Warm paper (#F5F2EC), muted brown (#8B7355)
- **Fonts:** Crimson Pro (display + body), IBM Plex Mono
- **Feel:** Wabi-sabi, vast space, meditative
- **Hero:** Minimal, brush-stroke dividers
- **Special effects:** Extra whitespace, faded images, single-column layout
- **Buttons:** Outlined, subtle radius (2px)

### Maximalist
- **Colors:** Deep espresso (#2D1B0E), warm brown (#3D2818), red accent (#E63946), blue (#2D5F8A), purple (#8B5A9E)
- **Fonts:** Abril Fatface, Work Sans, Fira Mono
- **Feel:** Rich, layered, joyful chaos, high-end editorial
- **Hero:** Collage style, dark warm gradient
- **Special effects:** Colored sections, rotated cards, pattern backgrounds, multi-color text
- **Buttons:** Filled, very rounded (50px)

### Neon
- **Colors:** Dark (#0A0A0F), mint (#00FF88), pink (#FF00AA), blue (#4444FF)
- **Fonts:** Outfit, Inter, Fira Code
- **Feel:** Electric nights, glow, high energy
- **Hero:** Cinematic with glow-line dividers
- **Special effects:** Glow effects, gradient text, hover glow
- **Buttons:** Filled, rounded (8px)

### Vintage
- **Colors:** Rich aged paper (#E5D4B8), deeper cream (#D4C4A8), burgundy (#8B2500), forest (#1B4D3E)
- **Fonts:** Libre Baskerville, Source Serif 4, Courier Prime
- **Feel:** Nostalgia, warmth, handmade, spice market craft
- **Hero:** Editorial with ornament dividers
- **Special effects:** Film grain, sepia images, typewriter mono, aged paper texture
- **Buttons:** Outlined, subtle radius (2px)

---

## Theme Override (URL)

When users click a theme card on the landing page, they go to a demo event with `?theme=<id>` in the URL. The event page uses this to override the demo's default theme, so Brutalist/Zen/Maximalist/Neon can be previewed on shared demos (e.g. golden-hour-sessions, morning-rituals).

---

## Category-Based Layouts

EventPreview applies category-specific layouts that layer on top of themes:

- **Fashion:** Shopping rules, brand list
- **Food:** Menu with pairings, burgundy accents
- **Art:** Featured works, exhibition dates, artist bio
- **Wellness:** Journey steps, "What to Bring", landscape images
- **Music:** Genre tags, testimonials, dark background
- **Market:** Vendor cards, "What's Happening", colored borders

Themes provide colors, fonts, and special effects; categories provide content structure.
