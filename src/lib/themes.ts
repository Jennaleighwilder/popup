export type ThemeId =
  | "atelier"
  | "harvest"
  | "gallery"
  | "botanica"
  | "soiree"
  | "brutalist"
  | "zen"
  | "maximalist"
  | "neon"
  | "vintage";

export interface ThemeSpecialEffects {
  uppercaseHeadings?: boolean;
  borderedSections?: boolean;
  overlappingElements?: boolean;
  extraWhitespace?: boolean;
  fadedImages?: boolean;
  singleColumnLayout?: boolean;
  coloredSections?: boolean;
  rotatedCards?: boolean;
  patternBackgrounds?: boolean;
  multiColorText?: boolean;
  glowEffects?: boolean;
  gradientText?: boolean;
  scanlineOverlay?: boolean;
  hoverGlow?: boolean;
  filmGrain?: boolean;
  sepiaImages?: boolean;
  typewriterMono?: boolean;
  agedPaperTexture?: boolean;
}

export interface Theme {
  id: ThemeId;
  name: string;
  category: string;
  fonts: {
    display: string;
    body: string;
    mono: string;
  };
  colors: {
    bg: string;
    bgAlt: string;
    text: string;
    textMuted: string;
    accent: string;
    accentHover: string;
    card: string;
    cardBorder: string;
    secondary?: string;
    tertiary?: string;
    pop?: string;
  };
  heroStyle: "editorial" | "split" | "minimal" | "cinematic" | "typographic" | "collage";
  buttonRadius: number;
  buttonStyle: "outlined" | "filled";
  cardRadius: number;
  cardBorderWidth?: number;
  animationFeel:
    | "elegant"
    | "warm"
    | "precise"
    | "organic"
    | "dramatic"
    | "instant"
    | "meditative"
    | "playful"
    | "electric"
    | "gentle";
  noiseTexture: boolean;
  sectionDivider:
    | "thin-line"
    | "botanical"
    | "none"
    | "wave"
    | "gold-line"
    | "thick-line"
    | "brush-stroke"
    | "pattern"
    | "glow-line"
    | "ornament";
  specialEffects?: ThemeSpecialEffects;
}

export const themes: Record<ThemeId, Theme> = {
  atelier: {
    id: "atelier",
    name: "Atelier",
    category: "fashion",
    fonts: { display: "Bodoni Moda", body: "Archivo", mono: "DM Mono" },
    colors: {
      bg: "#FAFAFA",
      bgAlt: "#F0F0F0",
      text: "#0A0A0A",
      textMuted: "#525252",
      accent: "#B91C1C",
      accentHover: "#991B1B",
      card: "#FFFFFF",
      cardBorder: "#E5E5E5",
    },
    heroStyle: "editorial",
    buttonRadius: 0,
    buttonStyle: "outlined",
    cardRadius: 0,
    animationFeel: "elegant",
    noiseTexture: false,
    sectionDivider: "thin-line",
  },
  harvest: {
    id: "harvest",
    name: "Harvest",
    category: "food",
    fonts: { display: "Playfair Display", body: "Lato", mono: "Courier Prime" },
    colors: {
      bg: "#F5EDE4",
      bgAlt: "#EDE0D4",
      text: "#2D1F14",
      textMuted: "#5C4A38",
      accent: "#C45C2C",
      accentHover: "#A34D24",
      card: "#FDF8F3",
      cardBorder: "#D4B896",
      secondary: "#2D5A27",
    },
    heroStyle: "split",
    buttonRadius: 4,
    buttonStyle: "filled",
    cardRadius: 8,
    animationFeel: "warm",
    noiseTexture: true,
    sectionDivider: "botanical",
  },
  gallery: {
    id: "gallery",
    name: "Gallery",
    category: "art",
    fonts: { display: "EB Garamond", body: "Inter", mono: "Space Mono" },
    colors: {
      bg: "#FFFFFF",
      bgAlt: "#FAFAFA",
      text: "#0F0F0F",
      textMuted: "#737373",
      accent: "#0F0F0F",
      accentHover: "#262626",
      card: "#FFFFFF",
      cardBorder: "#E5E5E5",
      pop: "#DC2626",
    },
    heroStyle: "minimal",
    buttonRadius: 0,
    buttonStyle: "outlined",
    cardRadius: 0,
    animationFeel: "precise",
    noiseTexture: false,
    sectionDivider: "none",
    specialEffects: { extraWhitespace: true },
  },
  botanica: {
    id: "botanica",
    name: "Botanica",
    category: "wellness",
    fonts: { display: "Cardo", body: "Nunito Sans", mono: "IBM Plex Mono" },
    colors: {
      bg: "#F0F5ED",
      bgAlt: "#E5EDE0",
      text: "#1E3320",
      textMuted: "#4A5F4C",
      accent: "#3D6B3D",
      accentHover: "#2D5A2D",
      card: "#F8FBF6",
      cardBorder: "#B8C9B4",
      secondary: "#6B7B5A",
    },
    heroStyle: "editorial",
    buttonRadius: 24,
    buttonStyle: "filled",
    cardRadius: 16,
    animationFeel: "organic",
    noiseTexture: true,
    sectionDivider: "wave",
  },
  soiree: {
    id: "soiree",
    name: "Soirée",
    category: "music",
    fonts: { display: "Italiana", body: "Syne", mono: "Fira Mono" },
    colors: {
      bg: "#0D0D0D",
      bgAlt: "#1A1A1A",
      text: "#F5F0E8",
      textMuted: "#8C8578",
      accent: "#D4AF37",
      accentHover: "#B8962E",
      card: "rgba(255,255,255,0.04)",
      cardBorder: "rgba(212,175,55,0.15)",
    },
    heroStyle: "cinematic",
    buttonRadius: 0,
    buttonStyle: "outlined",
    cardRadius: 0,
    animationFeel: "dramatic",
    noiseTexture: false,
    sectionDivider: "gold-line",
  },
  brutalist: {
    id: "brutalist",
    name: "Brutalist",
    category: "any",
    fonts: { display: "Space Grotesk", body: "JetBrains Mono", mono: "JetBrains Mono" },
    colors: {
      bg: "#0D0D0D",
      bgAlt: "#1A1A1A",
      text: "#F5F5F5",
      textMuted: "#8C8C8C",
      accent: "#FF3B00",
      accentHover: "#FF6B3D",
      card: "#141414",
      cardBorder: "#2A2A2A",
    },
    heroStyle: "typographic",
    buttonRadius: 0,
    buttonStyle: "filled",
    cardRadius: 0,
    cardBorderWidth: 3,
    animationFeel: "instant",
    noiseTexture: false,
    sectionDivider: "thick-line",
    specialEffects: {
      uppercaseHeadings: true,
      borderedSections: true,
      overlappingElements: true,
    },
  },
  zen: {
    id: "zen",
    name: "Zen",
    category: "any",
    fonts: { display: "Noto Serif JP", body: "Crimson Pro", mono: "IBM Plex Mono" },
    colors: {
      bg: "#F5F2ED",
      bgAlt: "#EDE8E0",
      text: "#3D3832",
      textMuted: "#6B6560",
      accent: "#6B5A4A",
      accentHover: "#5A4A3A",
      card: "rgba(255,255,255,0.7)",
      cardBorder: "rgba(107,90,74,0.2)",
    },
    heroStyle: "minimal",
    buttonRadius: 0,
    buttonStyle: "outlined",
    cardRadius: 2,
    animationFeel: "meditative",
    noiseTexture: true,
    sectionDivider: "brush-stroke",
    specialEffects: {
      extraWhitespace: true,
      fadedImages: true,
      singleColumnLayout: true,
    },
  },
  maximalist: {
    id: "maximalist",
    name: "Maximalist",
    category: "any",
    fonts: { display: "Abril Fatface", body: "Libre Baskerville", mono: "Fira Mono" },
    colors: {
      bg: "#2D1B0E",
      bgAlt: "#3D2818",
      text: "#F5EDE4",
      textMuted: "#C4A574",
      accent: "#E63946",
      accentHover: "#FF5A6A",
      card: "#3A2819",
      cardBorder: "#5C4228",
      secondary: "#2D5F8A",
      tertiary: "#8B5A9E",
    },
    heroStyle: "collage",
    buttonRadius: 50,
    buttonStyle: "filled",
    cardRadius: 16,
    animationFeel: "playful",
    noiseTexture: false,
    sectionDivider: "pattern",
    specialEffects: {
      coloredSections: true,
      rotatedCards: true,
      patternBackgrounds: true,
      multiColorText: true,
    },
  },
  neon: {
    id: "neon",
    name: "Neon",
    category: "any",
    fonts: { display: "Outfit", body: "Syne", mono: "Fira Code" },
    colors: {
      bg: "#0A0A0F",
      bgAlt: "#12121A",
      text: "#EEEEFF",
      textMuted: "#7777AA",
      accent: "#00FF88",
      accentHover: "#00CC6A",
      card: "rgba(255,255,255,0.03)",
      cardBorder: "rgba(0,255,136,0.15)",
      secondary: "#FF00AA",
      tertiary: "#4444FF",
    },
    heroStyle: "cinematic",
    buttonRadius: 8,
    buttonStyle: "filled",
    cardRadius: 12,
    animationFeel: "electric",
    noiseTexture: false,
    sectionDivider: "glow-line",
    specialEffects: {
      glowEffects: true,
      gradientText: true,
      hoverGlow: true,
    },
  },
  vintage: {
    id: "vintage",
    name: "Vintage",
    category: "any",
    fonts: { display: "Cinzel", body: "Lora", mono: "Courier Prime" },
    colors: {
      bg: "#E8DFD0",
      bgAlt: "#DDD0BC",
      text: "#2A1F14",
      textMuted: "#5C4A38",
      accent: "#8B2500",
      accentHover: "#6B1D00",
      card: "#F0E8DC",
      cardBorder: "#A89070",
      secondary: "#1B4D3E",
    },
    heroStyle: "editorial",
    buttonRadius: 2,
    buttonStyle: "outlined",
    cardRadius: 4,
    animationFeel: "gentle",
    noiseTexture: true,
    sectionDivider: "ornament",
    specialEffects: {
      filmGrain: true,
      sepiaImages: true,
      typewriterMono: true,
      agedPaperTexture: true,
    },
  },
};

export function selectThemeForCategory(category: string, vibe?: string): Theme {
  const cat = category.toLowerCase();
  const v = vibe?.toLowerCase();

  if (v === "curated") return themes.atelier;
  if (v === "luxe") return themes.soiree;
  if (v === "casual") return themes.harvest;
  if (v === "underground") return themes.brutalist;
  if (v === "festive") return themes.maximalist;

  switch (cat) {
    case "fashion":
      return themes.atelier;
    case "food":
      return themes.harvest;
    case "art":
      return themes.gallery;
    case "wellness":
      return themes.botanica;
    case "music":
    case "nightlife":
      return themes.soiree;
    case "market":
      return themes.harvest;
    default:
      return themes.atelier;
  }
}
