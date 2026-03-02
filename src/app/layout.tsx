import type { Metadata } from "next";
import { cormorant, dmSans, dmMono, allThemeFontClasses } from "@/lib/fonts";
import { LenisProvider } from "@/components/LenisProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { AccessibilityBody } from "@/components/AccessibilityBody";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";
import { LiveChat } from "@/components/LiveChat";
import "./globals.css";

export const metadata: Metadata = {
  title: "Popup — Beautiful event pages for pop-ups, tastings, and experiences",
  description:
    "Create stunning event pages for pop-ups, tastings, openings, and experiences. AI builds it in 60 seconds. You make it yours.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://popup-tawny-nu.vercel.app"),
  openGraph: { title: "Popup", description: "Beautiful event pages. AI builds it in 60 seconds." },
  other: {
    "design-by": "Jenna Leigh West",
    "design-studio": "The Forgotten Code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} ${allThemeFontClasses}`}
    >
      <body className="antialiased">
        <LenisProvider>
          <AccessibilityProvider>
            <AccessibilityBody />
            <AuthProvider>{children}</AuthProvider>
            <AccessibilityToggle />
            <LiveChat />
          </AccessibilityProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
