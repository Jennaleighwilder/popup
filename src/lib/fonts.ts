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
} from "next/font/google";

// Atelier
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
].join(" ");
