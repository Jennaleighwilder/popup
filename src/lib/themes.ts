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
    fonts: { display: "Cormorant Garamond", body: "Montserrat", mono: "DM Mono" },
    colors: {
      bg: "#FAF8F5",
      bgAlt: "#F0ECE6",
      text: "#1A1A1A",
      textMuted: "#8C8578",
      accent: "#C4956A",
      accentHover: "#A67B52",
      card: "#FFFFFF",
      cardBorder: "#E8E2D9",
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
      bg: "#F7F3ED",
      bgAlt: "#EDE7DD",
      text: "#2D2A26",
      textMuted: "#8B8277",
      accent: "#8B4513",
      accentHover: "#6B3410",
      card: "#FFFFFF",
      cardBorder: "#D4C9B8",
      secondary: "#556B2F",
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
      bgAlt: "#F5F5F5",
      text: "#111111",
      textMuted: "#777777",
      accent: "#111111",
      accentHover: "#333333",
      card: "#FAFAFA",
      cardBorder: "#E0E0E0",
      pop: "#E63946",
    },
    heroStyle: "minimal",
    buttonRadius: 0,
    buttonStyle: "outlined",
    cardRadius: 0,
    animationFeel: "precise",
    noiseTexture: false,
    sectionDivider: "none",
  },
  botanica: {
    id: "botanica",
    name: "Botanica",
    category: "wellness",
    fonts: { display: "Cardo", body: "Nunito Sans", mono: "IBM Plex Mono" },
    colors: {
      bg: "#F5F0E8",
      bgAlt: "#ECE5D8",
      text: "#2A3B2A",
      textMuted: "#7A8B6F",
      accent: "#5C7C50",
      accentHover: "#4A6340",
      card: "rgba(255,255,255,0.7)",
      cardBorder: "#D4CDB8",
      secondary: "#C9A96E",
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
    fonts: { display: "Italiana", body: "Poppins", mono: "Fira Mono" },
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
      bg: "#FFFFFF",
      bgAlt: "#F0F0F0",
      text: "#000000",
      textMuted: "#666666",
      accent: "#FF3B00",
      accentHover: "#CC2F00",
      card: "#FFFFFF",
      cardBorder: "#000000",
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
    fonts: { display: "Crimson Pro", body: "Crimson Pro", mono: "IBM Plex Mono" },
    colors: {
      bg: "#F5F2EC",
      bgAlt: "#EBE6DC",
      text: "#3D3D3D",
      textMuted: "#9E9E9E",
      accent: "#8B7355",
      accentHover: "#6B5A45",
      card: "rgba(255,255,255,0.5)",
      cardBorder: "rgba(139,115,85,0.15)",
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
    fonts: { display: "Abril Fatface", body: "Work Sans", mono: "Fira Mono" },
    colors: {
      bg: "#FFF8E7",
      bgAlt: "#FFE8CC",
      text: "#1A0F00",
      textMuted: "#8B6914",
      accent: "#E63946",
      accentHover: "#C5303C",
      card: "#FFFFFF",
      cardBorder: "#FFB347",
      secondary: "#2D5F8A",
      tertiary: "#6B4C9A",
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
    fonts: { display: "Outfit", body: "Inter", mono: "Fira Code" },
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
    fonts: { display: "Libre Baskerville", body: "Source Serif 4", mono: "Courier Prime" },
    colors: {
      bg: "#F4ECD8",
      bgAlt: "#E8DCC4",
      text: "#2C1810",
      textMuted: "#7A6652",
      accent: "#8B0000",
      accentHover: "#6B0000",
      card: "#FBF5E6",
      cardBorder: "#C9B896",
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
