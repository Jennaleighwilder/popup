"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shirt, Wine, Palette, Leaf, Music2, Store } from "lucide-react";
import { themes } from "@/lib/themes";
import { themeFontVariables } from "@/lib/fonts";
import { getDemoSlugForTheme, DEMO_EVENTS, DEMO_EVENT_SLUGS } from "@/lib/demoEvents";
import type { ThemeId } from "@/lib/themes";

const CATEGORIES: { id: string; label: string; subtitle: string; Icon: typeof Shirt; image: string; accent: string }[] = [
  { id: "fashion", label: "Fashion & Retail", subtitle: "Pop-ups, sample sales, trunk shows", Icon: Shirt, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop", accent: "#8B4513" },
  { id: "food", label: "Food & Drink", subtitle: "Supper clubs, tastings, chef's tables", Icon: Wine, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop", accent: "#6B3410" },
  { id: "art", label: "Art & Exhibition", subtitle: "Gallery openings, art walks, installations", Icon: Palette, image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=400&fit=crop", accent: "#1A1A1A" },
  { id: "wellness", label: "Wellness & Beauty", subtitle: "Retreats, workshops, spa events", Icon: Leaf, image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop", accent: "#5C7C50" },
  { id: "music", label: "Music & Nightlife", subtitle: "Listening parties, DJ nights, concerts", Icon: Music2, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop", accent: "#D4AF37" },
  { id: "market", label: "Markets & Craft", subtitle: "Artisan markets, vintage fairs, makers", Icon: Store, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop", accent: "#6B3410" },
];

const ALL_THEME_IDS: ThemeId[] = ["atelier", "harvest", "gallery", "botanica", "soiree", "brutalist", "zen", "maximalist", "neon", "vintage"];

/** Each theme gets a UNIQUE image — no repetition, Vogue editorial feel */
const THEME_PREVIEWS: Record<ThemeId, { image: string; tagline: string }> = {
  atelier: { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop", tagline: "Luxury fashion. Editorial elegance." },
  harvest: { image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop", tagline: "Spice route meets Vogue. High-end dining." },
  gallery: { image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=1000&fit=crop", tagline: "White walls. Minimal. Precise." },
  botanica: { image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop", tagline: "Wellness. Nature. Organic flow." },
  soiree: { image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=1000&fit=crop", tagline: "Dark. Gold. Intimate nights." },
  brutalist: { image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop", tagline: "Dark. Bold. Editorial." },
  zen: { image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=1000&fit=crop", tagline: "Wabi-sabi. Vast space. Calm." },
  maximalist: { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop", tagline: "Rich. Deep. Joyful." },
  neon: { image: "https://images.unsplash.com/photo-1770297345741-d73ac18f6e89?w=800&h=1000&fit=crop", tagline: "Electric nights. Glow. Energy." },
  vintage: { image: "https://images.unsplash.com/photo-1761289731268-900eba5cf09f?w=800&h=600&fit=crop", tagline: "Aged paper. Spice market. Craft." },
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#2D2420" }}>
      <header className="border-b px-6 py-5 flex items-center justify-between" style={{ borderColor: "#5C4033" }}>
        <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light" style={{ color: "#F5EDE4" }}>
          Popup
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="font-[family-name:var(--font-montserrat)] text-sm tracking-wide hover:opacity-80 transition-opacity"
            style={{ color: "#C4A574" }}
          >
            Sign in
          </Link>
          <Link
            href="/create"
            className="px-5 py-2.5 font-[family-name:var(--font-montserrat)] text-sm tracking-widest uppercase transition-colors hover:opacity-90"
            style={{ backgroundColor: "#8B2500", color: "#FFF" }}
          >
            Create event
          </Link>
        </div>
      </header>

      {/* OPENER — Old money spice market: rich, saturated */}
      <section className="relative min-h-[88vh] flex flex-col justify-center px-8 md:px-16 py-20">
        <div className="max-w-4xl">
          <p className="font-[family-name:var(--font-cormorant)] text-lg italic mb-6" style={{ color: "#C4A574" }}>
            The details are not the details. They make the design.
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-4" style={{ color: "#F5EDE4" }}>
            What will you create?
          </h1>
          <p className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.3em] uppercase mb-14" style={{ color: "#A89070" }}>
            Select a category
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.Icon;
              return (
                <Link
                  key={cat.id}
                  href={`/create?category=${cat.id}`}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="relative overflow-hidden rounded-sm"
                    style={{ minHeight: "200px" }}
                  >
                    <img
                      src={cat.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="relative flex flex-col justify-end p-5 h-full min-h-[200px]">
                      <Icon className="w-6 h-6 mb-3" style={{ color: cat.accent }} strokeWidth={1.5} />
                      <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-white">
                        {cat.label}
                      </h3>
                      <p className="font-[family-name:var(--font-montserrat)] text-xs text-white/80 mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events that feel like art — old money spice market */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: "#3D2E28" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light tracking-tight mb-2" style={{ color: "#F5EDE4" }}>
            Events that feel like <span style={{ color: "#C4A574" }}>art</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-base mb-16 max-w-lg" style={{ color: "#A89070" }}>
            Explore our demo pages. Each one is a complete, editorial event experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_EVENT_SLUGS.map((slug) => {
              const ev = DEMO_EVENTS[slug];
              if (!ev) return null;
              return (
                <Link key={slug} href={`/e/${slug}`} className="group block">
                  <motion.div whileHover={{ y: -4 }} className="overflow-hidden rounded-sm" style={{ boxShadow: "0 4px 24px rgba(26,23,20,0.08)" }}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={ev.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-white">{ev.name}</h3>
                        <p className="text-sm text-white/90 mt-1">{ev.city} · {ev.date}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ten worlds — rich editorial grid */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: "#2D2420" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light tracking-tight mb-2" style={{ color: "#F5EDE4" }}>
            Ten worlds. <span style={{ color: "#C4A574" }}>One platform.</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-base mb-16 max-w-lg" style={{ color: "#A89070" }}>
            Pick a theme. Your page transforms.
          </p>

          {/* Editorial grid: 3 + 2 large + 3 + 2 — Vogue-style asymmetry */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ALL_THEME_IDS.slice(0, 4).map((id) => {
              const t = themes[id];
              const preview = THEME_PREVIEWS[id];
              const displayFont = themeFontVariables[t.fonts.display] || "var(--font-cormorant)";
              return (
                <Link
                  key={id}
                  href={`/e/${getDemoSlugForTheme(id)}?theme=${id}`}
                  className="group relative block overflow-hidden rounded-sm transition-all duration-300 hover:shadow-lg"
                  style={{ minHeight: "260px" }}
                >
                  <div className="absolute inset-0">
                    <Image src={preview.image} alt={t.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-semibold text-white text-lg" style={{ fontFamily: displayFont }}>{t.name}</h3>
                    <p className="text-xs text-white/80 mt-0.5">{preview.tagline}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {ALL_THEME_IDS.slice(4, 10).map((id) => {
              const t = themes[id];
              const preview = THEME_PREVIEWS[id];
              const displayFont = themeFontVariables[t.fonts.display] || "var(--font-cormorant)";
              return (
                <Link
                  key={id}
                  href={`/e/${getDemoSlugForTheme(id)}?theme=${id}`}
                  className="group relative block overflow-hidden rounded-sm transition-all duration-300 hover:shadow-lg"
                  style={{ minHeight: "240px" }}
                >
                  <div className="absolute inset-0">
                    <Image src={preview.image} alt={t.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-white" style={{ fontFamily: displayFont }}>{t.name}</h3>
                    <p className="text-xs text-white/80 mt-0.5">{preview.tagline}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
