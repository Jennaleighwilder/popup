"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shirt, Wine, Palette, Leaf, Music2, Store } from "lucide-react";
import { themes } from "@/lib/themes";
import { themeFontVariables } from "@/lib/fonts";
import type { ThemeId } from "@/lib/themes";

const CATEGORIES = [
  { id: "fashion", label: "Fashion & Retail", subtitle: "Pop-ups, sample sales, trunk shows", Icon: Shirt },
  { id: "food", label: "Food & Drink", subtitle: "Supper clubs, tastings, chef's tables", Icon: Wine },
  { id: "art", label: "Art & Exhibition", subtitle: "Gallery openings, art walks, installations", Icon: Palette },
  { id: "wellness", label: "Wellness & Beauty", subtitle: "Retreats, workshops, spa events", Icon: Leaf },
  { id: "music", label: "Music & Nightlife", subtitle: "Listening parties, DJ nights, concerts", Icon: Music2 },
  { id: "market", label: "Markets & Craft", subtitle: "Artisan markets, vintage fairs, makers", Icon: Store },
];

// Original 5 themes — frozen, do not touch
const ORIGINAL_THEME_IDS: ThemeId[] = ["atelier", "harvest", "gallery", "botanica", "soiree"];
// All 10 themes for the platform showcase (loads after opener)
const ALL_THEME_IDS: ThemeId[] = [...ORIGINAL_THEME_IDS, "brutalist", "zen", "maximalist", "neon", "vintage"];

const THEME_PREVIEWS: Record<ThemeId, { image: string; tagline: string }> = {
  atelier: { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop", tagline: "Luxury fashion. Editorial elegance." },
  harvest: { image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=600&fit=crop", tagline: "Farm-to-table. Warm and inviting." },
  gallery: { image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=1000&fit=crop", tagline: "White walls. Minimal. Precise." },
  botanica: { image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop", tagline: "Wellness. Nature. Organic flow." },
  soiree: { image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=1000&fit=crop", tagline: "Dark. Gold. Intimate nights." },
  brutalist: { image: "https://images.unsplash.com/photo-1513584684374-8b748c0e6c4a?w=800&h=600&fit=crop", tagline: "Raw. Bold. Unapologetic." },
  zen: { image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=1000&fit=crop", tagline: "Wabi-sabi. Vast space. Calm." },
  maximalist: { image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&h=600&fit=crop", tagline: "Rich. Layered. Joyful chaos." },
  neon: { image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=1000&fit=crop", tagline: "Electric nights. Glow. Energy." },
  vintage: { image: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&h=600&fit=crop", tagline: "Nostalgia. Warmth. Handmade." },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <header className="border-b border-[#E8E2D9] px-6 py-4 flex items-center justify-between">
        <span className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#1A1714]">
          Popup
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="font-[family-name:var(--font-montserrat)] text-sm text-[#8C8578] hover:text-[#1A1714]"
          >
            Sign in
          </Link>
          <Link
            href="/create"
            className="px-4 py-2 bg-[#C4956A] text-white font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-[#A67B52]"
          >
            Create event
          </Link>
        </div>
      </header>

      {/* OPENER: Event generator — original design, do not touch */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 py-24">
        <div className="w-10 h-px bg-[#C4956A] mb-8" />
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-[#1A1714] mb-4 tracking-tight">
          What will you create?
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[#8C8578] text-sm tracking-widest uppercase mb-16">
          Select a category
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {CATEGORIES.map((cat) => {
            const Icon = cat.Icon;
            return (
              <Link
                key={cat.id}
                href={`/create?category=${cat.id}`}
                className="group p-8 text-left bg-white border border-[#E8E2D9] hover:border-[#C4956A] transition-all duration-300"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Icon className="w-6 h-6 text-[#C4956A] mb-6 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1.25} />
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-light text-[#1A1714]">
                    {cat.label}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] mt-2">
                    {cat.subtitle}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Ten themes — loads after opener */}
      <section className="border-t border-[#E8E2D9] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="w-10 h-px bg-[#C4956A] mb-8" />
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[#1A1714] mb-4 tracking-tight">
            Ten worlds. One platform.
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-[#8C8578] text-lg mb-16 max-w-xl">
            Pick a theme and your page transforms into a completely different visual world.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {ALL_THEME_IDS.map((id) => {
              const t = themes[id];
              const preview = THEME_PREVIEWS[id];
              const displayFont = themeFontVariables[t.fonts.display] || "var(--font-cormorant)";

              return (
                <Link
                  key={id}
                  href={id === "neon" ? "/e/warehouse-rave" : id === "vintage" ? "/e/brooklyn-flea-vintage" : "/create"}
                  className="group relative overflow-hidden border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                  style={{
                    borderColor: t.colors.cardBorder,
                    borderWidth: t.cardBorderWidth ?? 2,
                    borderRadius: t.cardRadius,
                    minHeight: "280px",
                  }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={preview.image}
                      alt={t.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background: `linear-gradient(to top, ${t.colors.bg} 0%, transparent 50%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        background: `linear-gradient(135deg, ${t.colors.accent}22 0%, transparent 60%)`,
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span
                      className="text-[10px] uppercase tracking-[0.4em] font-[family-name:var(--font-dm-mono)] mb-2"
                      style={{ color: t.colors.accent }}
                    >
                      {t.category.replace("any", "all")}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-semibold leading-tight mb-1"
                      style={{
                        fontFamily: displayFont,
                        color: t.colors.text,
                        textShadow: t.colors.bg === "#0A0A0F" ? "0 0 20px rgba(0,0,0,0.8)" : "0 2px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      {t.name}
                    </h3>
                    <p
                      className="text-xs max-w-[180px] opacity-90"
                      style={{ color: t.colors.textMuted, fontFamily: "var(--font-montserrat)" }}
                    >
                      {preview.tagline}
                    </p>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: t.colors.accent }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
