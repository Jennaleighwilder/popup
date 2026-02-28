import type { Metadata } from "next";
import { cormorant, dmSans, dmMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Popup — Beautiful event pages for pop-ups, tastings, and experiences",
  description:
    "Create stunning event pages for pop-ups, tastings, openings, and experiences. AI builds it in 60 seconds. You make it yours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="antialiased">
        <LenisProvider>
          <div className="noise-overlay" aria-hidden />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
