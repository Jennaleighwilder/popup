import {
  Cormorant_Garamond,
  DM_Mono,
  DM_Sans,
  Montserrat,
  Playfair_Display,
  Lato,
  Courier_Prime,
  EB_Garamond,
  Inter,
  Space_Mono,
  Cardo,
  Nunito_Sans,
  IBM_Plex_Mono,
  Italiana,
  Poppins,
  Fira_Mono,
  Space_Grotesk,
  JetBrains_Mono,
  Crimson_Pro,
  Abril_Fatface,
  Work_Sans,
  Outfit,
  Fira_Code,
  Libre_Baskerville,
  Source_Serif_4,
  Cinzel,
  Lora,
  Bodoni_Moda,
  Archivo,
  Syne,
  Noto_Serif_JP,
} from "next/font/google";

// Atelier — Vogue/Didot: high-contrast serif + clean sans
export const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni-moda",
});

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
});

export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
});

// Harvest
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
});

// Gallery
export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-eb-garamond",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

// Botanica
export const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cardo",
});

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-nunito-sans",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-ibm-plex-mono",
});

// Soirée
export const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italiana",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

export const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-mono",
});

// Brutalist — raw geometric grotesque
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

export const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-noto-serif-jp",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

// Zen
export const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson-pro",
});

// Maximalist
export const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-abril-fatface",
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-work-sans",
});

// Neon
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-code",
});

// Vintage — classic serif, aged paper feel
export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
});

export const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-source-serif-4",
});

// Landing page fonts (DM Sans for body)
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

// Font variable mapping for themes
export const themeFontVariables: Record<string, string> = {
  "Cormorant Garamond": "var(--font-cormorant)",
  Montserrat: "var(--font-montserrat)",
  "DM Mono": "var(--font-dm-mono)",
  "Playfair Display": "var(--font-playfair)",
  Lato: "var(--font-lato)",
  "Courier Prime": "var(--font-courier-prime)",
  "EB Garamond": "var(--font-eb-garamond)",
  Inter: "var(--font-inter)",
  "Space Mono": "var(--font-space-mono)",
  Cardo: "var(--font-cardo)",
  "Nunito Sans": "var(--font-nunito-sans)",
  "IBM Plex Mono": "var(--font-ibm-plex-mono)",
  Italiana: "var(--font-italiana)",
  Poppins: "var(--font-poppins)",
  "Fira Mono": "var(--font-fira-mono)",
  "Space Grotesk": "var(--font-space-grotesk)",
  "JetBrains Mono": "var(--font-jetbrains-mono)",
  "Crimson Pro": "var(--font-crimson-pro)",
  "Abril Fatface": "var(--font-abril-fatface)",
  "Work Sans": "var(--font-work-sans)",
  Outfit: "var(--font-outfit)",
  "Fira Code": "var(--font-fira-code)",
  "Libre Baskerville": "var(--font-libre-baskerville)",
  "Source Serif 4": "var(--font-source-serif-4)",
  Cinzel: "var(--font-cinzel)",
  Lora: "var(--font-lora)",
  "Bodoni Moda": "var(--font-bodoni-moda)",
  Archivo: "var(--font-archivo)",
  Syne: "var(--font-syne)",
  "Noto Serif JP": "var(--font-noto-serif-jp)",
};

export const allThemeFontClasses = [
  cormorant.variable,
  montserrat.variable,
  dmMono.variable,
  playfair.variable,
  lato.variable,
  courierPrime.variable,
  ebGaramond.variable,
  inter.variable,
  spaceMono.variable,
  cardo.variable,
  nunitoSans.variable,
  ibmPlexMono.variable,
  italiana.variable,
  poppins.variable,
  firaMono.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
  crimsonPro.variable,
  abrilFatface.variable,
  workSans.variable,
  outfit.variable,
  firaCode.variable,
  libreBaskerville.variable,
  sourceSerif4.variable,
  cinzel.variable,
  lora.variable,
  bodoniModa.variable,
  archivo.variable,
  syne.variable,
  notoSerifJP.variable,
].join(" ");
