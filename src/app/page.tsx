"use client";

import Link from "next/link";
import { themes } from "@/lib/themes";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <header className="border-b border-[#E8E2D9] px-6 py-4 flex items-center justify-between">
        <span className="font-[family-name:var(--font-display)] text-xl font-light text-[#1A1714]">
          Popup
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]"
          >
            Sign in
          </Link>
          <Link
            href="/create"
            className="px-4 py-2 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52]"
          >
            Create event
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-24">
        <div className="w-10 h-px bg-[#C4956A] mb-8" />
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1714] mb-6 tracking-tight max-w-2xl">
          Ten worlds. One platform.
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[#8C8578] text-lg mb-16 max-w-xl">
          Create stunning event pages for pop-ups, tastings, openings, and experiences.
          Pick a theme and your page transforms into a completely different visual world.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
          {THEME_IDS.map((id) => {
            const t = themes[id];
            return (
              <Link
                key={id}
                href={id === "neon" ? "/e/warehouse-rave" : id === "vintage" ? "/e/brooklyn-flea-vintage" : "/create"}
                className="group p-6 bg-white border border-[#E8E2D9] hover:border-[#C4956A] transition-all duration-300"
              >
                <div
                  className="w-full h-20 rounded mb-4 flex items-center justify-center text-sm font-medium"
                  style={{
                    backgroundColor: t.colors.bg,
                    color: t.colors.text,
                    borderWidth: t.cardBorderWidth ?? 1,
                    borderColor: t.colors.cardBorder,
                    borderStyle: "solid",
                    borderRadius: t.cardRadius,
                  }}
                >
                  {t.name}
                </div>
                <span className="font-[family-name:var(--font-body)] text-sm text-[#1A1714] group-hover:text-[#C4956A]">
                  {t.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-6">
          <Link
            href="/e/warehouse-rave"
            className="inline-block px-6 py-3 border-2 border-[#1A1714] font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#1A1714] hover:text-white transition-colors"
          >
            See Neon theme →
          </Link>
          <Link
            href="/e/brooklyn-flea-vintage"
            className="inline-block px-6 py-3 border-2 border-[#1A1714] font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#1A1714] hover:text-white transition-colors"
          >
            See Vintage theme →
          </Link>
        </div>
      </main>
    </div>
  );
}
