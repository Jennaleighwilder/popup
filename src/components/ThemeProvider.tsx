"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Theme } from "@/lib/themes";
import { themeFontVariables } from "@/lib/fonts";

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({
  theme,
  children,
}: {
  theme: Theme;
  children: ReactNode;
}) {
  const displayFont = themeFontVariables[theme.fonts.display] || "var(--font-cormorant)";
  const bodyFont = themeFontVariables[theme.fonts.body] || "var(--font-montserrat)";
  const monoFont = themeFontVariables[theme.fonts.mono] || "var(--font-dm-mono)";

  const animationDuration =
    theme.animationFeel === "elegant"
      ? "0.8s"
      : theme.animationFeel === "warm"
        ? "0.6s"
        : theme.animationFeel === "precise"
          ? "0.3s"
          : theme.animationFeel === "organic"
            ? "1s"
            : theme.animationFeel === "instant"
              ? "0.1s"
              : theme.animationFeel === "meditative"
                ? "1.2s"
                : theme.animationFeel === "playful"
                  ? "0.5s"
                  : theme.animationFeel === "electric"
                    ? "0.2s"
                    : theme.animationFeel === "gentle"
                      ? "0.8s"
                      : "0.4s";

  const themeClasses = [
    theme.specialEffects?.uppercaseHeadings && "theme-uppercase-headings",
    theme.specialEffects?.glowEffects && "theme-glow-effects",
    theme.specialEffects?.gradientText && "theme-gradient-text",
    theme.specialEffects?.filmGrain && "theme-film-grain",
    theme.specialEffects?.sepiaImages && "theme-sepia-images",
    theme.specialEffects?.extraWhitespace && "theme-extra-whitespace",
    theme.specialEffects?.hoverGlow && "theme-hover-glow",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={`min-h-screen ${themeClasses}`}
        data-theme={theme.id}
        style={
          {
            "--theme-bg": theme.colors.bg,
            "--theme-bg-alt": theme.colors.bgAlt,
            "--theme-text": theme.colors.text,
            "--theme-text-muted": theme.colors.textMuted,
            "--theme-accent": theme.colors.accent,
            "--theme-accent-hover": theme.colors.accentHover,
            "--theme-card": theme.colors.card,
            "--theme-card-border": theme.colors.cardBorder,
            "--theme-card-border-width": theme.cardBorderWidth ? `${theme.cardBorderWidth}px` : "1px",
            "--theme-tertiary": theme.colors.tertiary || theme.colors.accent,
            "--theme-secondary": theme.colors.secondary || theme.colors.accent,
            "--theme-pop": theme.colors.pop || theme.colors.accent,
            "--theme-display-font": displayFont,
            "--theme-body-font": bodyFont,
            "--theme-mono-font": monoFont,
            "--theme-button-radius": `${theme.buttonRadius}px`,
            "--theme-card-radius": `${theme.cardRadius}px`,
            "--theme-animation-duration": animationDuration,
            backgroundColor: theme.colors.bg,
            color: theme.colors.text,
            fontFamily: bodyFont,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
