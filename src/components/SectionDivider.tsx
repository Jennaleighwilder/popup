"use client";

import type { ThemeId } from "@/lib/themes";
import { themes } from "@/lib/themes";

function encodeColor(c: string): string {
  return encodeURIComponent(c).replace(/#/g, "%23");
}

export function SectionDivider({ themeId }: { themeId: string }) {
  const theme = themes[themeId as ThemeId] || themes.atelier;
  const type = theme.sectionDivider;
  const accent = theme.colors.accent;
  const accentEnc = encodeColor(accent);

  if (type === "none") return null;

  const dividers: Record<string, React.ReactNode> = {
    "thin-line": (
      <div className="h-px w-full" style={{ backgroundColor: accent, opacity: 0.3 }} aria-hidden />
    ),
    botanical: (
      <div
        className="h-6 w-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 24'%3E%3Cpath d='M0 12 Q30 4 60 12 Q90 20 120 12' stroke='${accentEnc}' fill='none' stroke-width='1' opacity='0.5'/%3E%3Cpath d='M0 16 Q20 8 40 16 Q60 22 80 16 Q100 10 120 16' stroke='${accentEnc}' fill='none' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 24px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
    ),
    wave: (
      <div
        className="h-8 w-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 144 32'%3E%3Cpath d='M0 16 Q36 0 72 16 T144 16' fill='none' stroke='${accentEnc}' stroke-width='2' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "144px 32px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
    ),
    "gold-line": (
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.6,
        }}
        aria-hidden
      />
    ),
    "thick-line": (
      <div className="h-1 w-full" style={{ backgroundColor: accent }} aria-hidden />
    ),
    "brush-stroke": (
      <div
        className="h-10 w-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 40'%3E%3Cpath d='M0 20 Q100 5 200 20 T400 20' stroke='${accentEnc}' fill='none' stroke-width='3' stroke-linecap='round' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "400px 40px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
    ),
    pattern: (
      <div
        className="h-6 w-full"
        style={{
          background: `repeating-linear-gradient(90deg, ${accent} 0, ${accent} 2px, transparent 2px, transparent 12px)`,
          opacity: 0.3,
        }}
        aria-hidden
      />
    ),
    "glow-line": (
      <div
        className="h-0.5 w-full"
        style={{
          backgroundColor: accent,
          boxShadow: `0 0 12px ${accent}`,
          opacity: 0.7,
        }}
        aria-hidden
      />
    ),
    ornament: (
      <div
        className="h-8 w-full flex items-center justify-center gap-2"
        style={{ color: accent, opacity: 0.6 }}
        aria-hidden
      >
        <span className="text-xl">◆</span>
        <span className="text-sm">—</span>
        <span className="text-xl">◆</span>
      </div>
    ),
  };

  return <>{dividers[type] || dividers["thin-line"]}</>;
}
