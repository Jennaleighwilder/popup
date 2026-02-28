export type ThemeId = "atelier" | "harvest" | "gallery" | "botanica" | "soiree";

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
    pop?: string;
  };
  heroStyle: "editorial" | "split" | "minimal" | "cinematic";
  buttonRadius: number;
  buttonStyle: "outlined" | "filled";
  cardRadius: number;
  animationFeel: "elegant" | "warm" | "precise" | "organic" | "dramatic";
  noiseTexture: boolean;
  sectionDivider: "thin-line" | "botanical" | "none" | "wave" | "gold-line";
}

export const themes: Record<ThemeId, Theme> = {
  atelier: {
    id: "atelier",
    name: "Atelier",
    category: "fashion",
    fonts: {
      display: "Cormorant Garamond",
      body: "Montserrat",
      mono: "DM Mono",
    },
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
    fonts: {
      display: "Playfair Display",
      body: "Lato",
      mono: "Courier Prime",
    },
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
    fonts: {
      display: "EB Garamond",
      body: "Inter",
      mono: "Space Mono",
    },
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
    fonts: {
      display: "Cardo",
      body: "Nunito Sans",
      mono: "IBM Plex Mono",
    },
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
    fonts: {
      display: "Italiana",
      body: "Poppins",
      mono: "Fira Mono",
    },
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
};

export function selectThemeForCategory(
  category: string,
  vibe?: string
): Theme {
  const cat = category.toLowerCase();
  const v = vibe?.toLowerCase();

  if (v === "luxe") {
    return Math.random() > 0.5 ? themes.soiree : themes.atelier;
  }
  if (v === "casual") {
    return Math.random() > 0.5 ? themes.harvest : themes.botanica;
  }

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
      return Math.random() > 0.5 ? themes.harvest : themes.atelier;
    default:
      return themes.atelier;
  }
}
