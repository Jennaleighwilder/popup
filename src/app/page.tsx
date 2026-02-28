"use client";

import Link from "next/link";
import { themes } from "@/lib/themes";
import { themeFontVariables } from "@/lib/fonts";
import type { ThemeId } from "@/lib/themes";

const THEME_IDS: ThemeId[] = [
  "atelier",
  "harvest",
  "gallery",
  "botanica",
  "soiree",
  "brutalist",
  "zen",
  "maximalist",
  "neon",
  "vintage",
];

const THEME_PREVIEWS: Record<
  ThemeId,
  { image: string; tagline: string; size?: "large" | "tall" | "wide" }
> = {
  atelier: {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop",
    tagline: "Luxury fashion. Editorial elegance.",
  },
  harvest: {
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=600&fit=crop",
    tagline: "Farm-to-table. Warm and inviting.",
  },
  gallery: {
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=1000&fit=crop",
    tagline: "White walls. Minimal. Precise.",
  },
  botanica: {
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop",
    tagline: "Wellness. Nature. Organic flow.",
  },
  soiree: {
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=1000&fit=crop",
    tagline: "Dark. Gold. Intimate nights.",
  },
  brutalist: {
    image: "https://images.unsplash.com/photo-1513584684374-8b748c0e6c4a?w=800&h=600&fit=crop",
    tagline: "Raw. Bold. Unapologetic.",
  },
  zen: {
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=1000&fit=crop",
    tagline: "Wabi-sabi. Vast space. Calm.",
  },
  maximalist: {
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&h=600&fit=crop",
    tagline: "Rich. Layered. Joyful chaos.",
  },
  neon: {
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=1000&fit=crop",
    tagline: "Electric nights. Glow. Energy.",
  },
  vintage: {
    image: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&h=600&fit=crop",
    tagline: "Nostalgia. Warmth. Handmade.",
  },
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

      <main className="max-w-6xl mx-auto px-6 py-24">
        <div className="w-10 h-px bg-[#C4956A] mb-8" />
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1714] mb-6 tracking-tight max-w-2xl">
          Ten worlds. One platform.
        </h1>
        <p className="font-[family-name:var(--font-montserrat)] text-[#8C8578] text-lg mb-20 max-w-xl leading-relaxed">
          Create stunning event pages for pop-ups, tastings, openings, and experiences.
          Pick a theme and your page transforms into a completely different visual world.
        </p>

        {/* Editorial grid — Vogue × National Geographic */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-24">
          {THEME_IDS.map((id) => {
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
                  minHeight: "340px",
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
                    className="text-2xl md:text-3xl font-semibold leading-tight mb-1"
                    style={{
                      fontFamily: displayFont,
                      color: t.colors.text,
                      textShadow: t.colors.bg === "#0A0A0F" ? "0 0 20px rgba(0,0,0,0.8)" : "0 2px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    {t.name}
                  </h3>
                  <p
                    className="text-sm max-w-[200px] opacity-90"
                    style={{
                      color: t.colors.textMuted,
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {preview.tagline}
                  </p>
                </div>

                {/* Accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: t.colors.accent }}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-6">
          <Link
            href="/e/warehouse-rave"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1A1714] font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-[#1A1714] hover:text-white transition-colors"
          >
            See Neon theme →
          </Link>
          <Link
            href="/e/brooklyn-flea-vintage"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1A1714] font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase hover:bg-[#1A1714] hover:text-white transition-colors"
          >
            See Vintage theme →
          </Link>
        </div>
      </main>
    </div>
  );
}
