"use client";

import Link from "next/link";
import Image from "next/image";
import { themes } from "@/lib/themes";
import { themeFontVariables } from "@/lib/fonts";
import { getDemoSlugForTheme, DEMO_EVENTS } from "@/lib/demoEvents";
import type { ThemeId } from "@/lib/themes";

const FIVE_THEME_IDS: ThemeId[] = ["atelier", "harvest", "gallery", "botanica", "soiree"];

const SHOWCASE_EVENTS = [
  { slug: "the-edit-spring-sample-sale", featured: true, category: "fashion" as const },
  { slug: "the-long-table", featured: false, category: "food" as const },
  { slug: "first-friday-art-walk", featured: false, category: "art" as const },
  { slug: "morning-rituals", featured: false, category: "wellness" as const },
  { slug: "golden-hour-sessions", featured: false, category: "music" as const },
];

const CATEGORY_COLORS: Record<string, string> = {
  fashion: "#C7402D",
  food: "#8B4513",
  art: "#1A1714",
  wellness: "#5C7C50",
  market: "#B7654B",
  music: "#B8963E",
};

const FEATURE_BLOCKS = [
  {
    title: "AI-powered creation",
    body: "Tell us about your event. AI handles the rest — copy, hosts, schedule, tickets.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
  },
  {
    title: "Beautiful by default",
    body: "Five themes. Editorial design. Squarespace-quality layouts.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
  },
  {
    title: "Tickets built in",
    body: "Sell tickets. Collect payments. Manage guests. Check-in with QR codes.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
  },
  {
    title: "Promote with AI",
    body: "Social copy, email campaigns, SEO. AI helps you fill seats.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
  },
];

const TESTIMONIALS = [
  {
    quote: "My supper club used to look like a Google Form. Now it looks like something from Kinfolk.",
    name: "Sarah Chen",
    title: "Supper Club Host, Brooklyn",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  },
  {
    quote: "We sold out in 48 hours. The page did the work. I just shared the link.",
    name: "Marcus Webb",
    title: "Gallery Owner, Asheville",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face",
  },
  {
    quote: "Finally — an event page that doesn't look like every other event page.",
    name: "Elena Vasquez",
    title: "Wellness Retreat Host, Joshua Tree",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face",
  },
];

export default function MobileHome() {
  return (
    <div className="min-h-screen landing-reset">
      {/* Mobile Nav — compact, touch-friendly */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 backdrop-blur-md border-b border-[#E8E2D9]/50"
        style={{ backgroundColor: "rgba(250,247,242,0.95)" }}
      >
        <span className="font-[family-name:var(--font-cormorant)] text-xl italic" style={{ color: "#1A1714" }}>
          Popup
        </span>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-xs font-medium px-3 py-2.5 min-h-[44px] flex items-center"
            style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}
          >
            Log In
          </Link>
          <Link
            href="/"
            className="rounded-full px-3 py-2.5 text-xs font-medium border min-h-[44px] flex items-center"
            style={{ borderColor: "#C4956A", color: "#C4956A", fontFamily: "var(--font-body)" }}
          >
            Full Site
          </Link>
          <Link
            href="/create"
            className="rounded-full px-4 py-2.5 text-xs font-medium min-h-[44px] flex items-center"
            style={{ backgroundColor: "#C4956A", color: "#FFF", fontFamily: "var(--font-body)" }}
          >
            Create →
          </Link>
        </div>
      </header>

      {/* HERO — clean, centered, large touch targets */}
      <section className="px-5 py-16" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-px mb-6" style={{ backgroundColor: "#C4956A" }} />
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light leading-[1.2] mb-4 text-3xl"
            style={{ color: "#1A1714" }}
          >
            Every gathering deserves a <em>beautiful</em> invitation
          </h1>
          <p className="font-[family-name:var(--font-body)] text-base font-light max-w-[320px] mb-8" style={{ color: "#8C8578" }}>
            Create stunning event pages. AI builds it in 60 seconds. You make it yours.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-[280px]">
            <Link
              href="/create"
              className="rounded-full px-8 py-4 text-base font-medium text-center min-h-[48px] flex items-center justify-center"
              style={{ backgroundColor: "#C4956A", color: "#FFF", fontFamily: "var(--font-body)" }}
            >
              Create Your Event →
            </Link>
            <Link
              href="#showcase"
              className="text-base py-3 underline decoration-[#C4956A] underline-offset-4 text-center"
              style={{ fontFamily: "var(--font-body)", color: "#1A1714" }}
            >
              See Examples ↓
            </Link>
          </div>
        </div>
      </section>

      {/* SHOWCASE — single column, all cards same size */}
      <section id="showcase" className="py-12 px-5" style={{ backgroundColor: "#FAF7F2" }}>
        <h2 className="font-[family-name:var(--font-playfair)] text-center mb-2 text-2xl" style={{ color: "#1A1714" }}>
          Events that feel like <span style={{ color: "#C7402D" }}>art.</span>
        </h2>
        <p className="text-center text-xs uppercase tracking-wider mb-8" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>
          Curated pop-ups from our community
        </p>
        <div className="flex flex-col gap-4">
          {SHOWCASE_EVENTS.map(({ slug, category }) => {
            const ev = DEMO_EVENTS[slug];
            if (!ev) return null;
            const themeId = ev.theme as ThemeId;
            const t = themes[themeId];
            const displayFont = themeFontVariables[t.fonts.display] || "var(--font-cormorant)";
            return (
              <Link key={slug} href={`/e/${slug}?theme=${themeId}`} className="block">
                <div
                  className="relative overflow-hidden rounded-lg h-[240px]"
                  style={{ boxShadow: "0 4px 24px rgba(26,23,20,0.06)" }}
                >
                  <Image src={ev.heroImage} alt="" fill className="object-cover" sizes="100vw" style={{ filter: "sepia(0.03) saturate(1.05)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <span className="text-[10px] uppercase tracking-wider" style={{ color: CATEGORY_COLORS[category] || "#8C8578", fontFamily: "var(--font-body)" }}>
                      {category}
                    </span>
                    <h3 className="mt-1 text-white text-base font-medium" style={{ fontFamily: displayFont }}>{ev.name}</h3>
                    <p className="text-xs text-white/90 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{ev.city} · {ev.date}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* QUOTE BREAK — simplified */}
      <section className="relative py-20 px-5 flex items-center justify-center min-h-[280px]">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          style={{ filter: "sepia(0.03) saturate(1.05)" }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(250,247,242,0.82)" }} />
        <div className="relative z-10 text-center">
          <blockquote className="font-[family-name:var(--font-cormorant)] italic text-lg" style={{ color: "#2C3E2D", lineHeight: 1.5 }}>
            The details are not the details. They make the design.
          </blockquote>
          <p className="mt-4 text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)", color: "#2C3E2D" }}>
            — CHARLES EAMES
          </p>
        </div>
      </section>

      {/* THREE STEPS — stacked */}
      <section className="py-16 px-5" style={{ backgroundColor: "#FFFFFF" }}>
        <h2 className="text-center mb-10 text-xl" style={{ fontFamily: "var(--font-body)", color: "#6B7B8D" }}>
          Three steps. Sixty seconds.
        </h2>
        <div className="flex flex-col gap-10">
          {["Describe", "Design", "Publish"].map((title, i) => (
            <div key={title} className="text-center">
              <div className="font-[family-name:var(--font-body)] font-light mb-2 text-4xl" style={{ color: "rgba(107,123,141,0.2)" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-[family-name:var(--font-body)] font-medium text-lg mb-2" style={{ color: "#1A1714" }}>{title}</h3>
              <p className="font-[family-name:var(--font-body)] font-light text-[15px]" style={{ color: "#8C8578", lineHeight: 1.6 }}>
                {i === 0 && "Tell us about your event. AI handles the rest."}
                {i === 1 && "Choose a look. Customize every detail."}
                {i === 2 && "Go live for $9.99. Start selling tickets."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THEME SHOWCASE — horizontal scroll */}
      <section className="py-12 px-5" style={{ backgroundColor: "#F5F0E8" }}>
        <h2 className="font-[family-name:var(--font-cormorant)] text-center text-xl mb-1" style={{ color: "#1A1714" }}>
          Five worlds. One platform.
        </h2>
        <p className="text-center text-sm mb-8" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>
          Each theme is a different design language.
        </p>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {FIVE_THEME_IDS.map((id) => {
            const t = themes[id];
            const displayFont = themeFontVariables[t.fonts.display] || "var(--font-cormorant)";
            const slug = getDemoSlugForTheme(id);
            return (
              <Link
                key={id}
                href={`/e/${slug}?theme=${id}`}
                className="shrink-0 w-[180px] snap-center rounded-lg border p-4"
                style={{ borderColor: "#E8E2D9", backgroundColor: "#FFF" }}
              >
                <h3 className="text-base font-medium" style={{ fontFamily: displayFont, color: "#1A1714" }}>{t.name}</h3>
                <div className="flex gap-2 mt-3">
                  {[t.colors.accent, t.colors.bgAlt || t.colors.cardBorder, t.colors.textMuted, t.colors.text].map((c, i) => (
                    <span key={i} className="w-3 h-3 rounded-full border border-[#E8E2D9]" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-wider mt-2" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>{t.category}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURES — image top, text below */}
      <section className="py-12">
        <h2 className="font-[family-name:var(--font-playfair)] text-center mb-12 text-xl" style={{ color: "#1A1714" }}>
          Everything you need. Nothing you don&apos;t.
        </h2>
        {FEATURE_BLOCKS.map((block, i) => (
          <div
            key={i}
            className="flex flex-col gap-6 py-10 px-5"
            style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF7F2" }}
          >
            <div className="w-full max-w-[400px] mx-auto min-h-[220px] relative overflow-hidden rounded-lg">
              <Image src={block.image} alt="" fill className="object-cover" sizes="400px" style={{ filter: "sepia(0.03) saturate(1.05)" }} />
            </div>
            <div className="max-w-[400px] mx-auto">
              <div className="w-[30px] h-0.5 mb-3" style={{ backgroundColor: "#B7654B" }} />
              <h3 className="text-lg font-medium mb-2" style={{ fontFamily: "var(--font-playfair)", color: "#1A1714" }}>
                <span style={{ color: "#B7654B" }}>{block.title.split(" ")[0]}</span> {block.title.split(" ").slice(1).join(" ")}
              </h3>
              <p className="text-[15px] leading-[1.6]" style={{ fontFamily: "var(--font-body)", color: "#1A1714" }}>{block.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* RED STATEMENT */}
      <section className="py-16 px-5 flex flex-col items-center justify-center" style={{ backgroundColor: "#C7402D" }}>
        <p className="font-[family-name:var(--font-cormorant)] italic text-white text-center text-xl leading-snug">
          Your event deserves better than an Eventbrite page.
        </p>
        <p className="mt-3 text-sm text-white/80" style={{ fontFamily: "var(--font-body)" }}>Join 500+ creators who chose beauty.</p>
        <Link
          href="/create"
          className="mt-8 rounded-full px-8 py-4 border-2 border-white bg-transparent text-white text-base font-medium min-h-[48px] flex items-center justify-center"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Create Your Event →
        </Link>
      </section>

      {/* TESTIMONIALS — stacked */}
      <section className="py-16 px-5" style={{ backgroundColor: "#FAF7F2" }}>
        <h2 className="font-[family-name:var(--font-cormorant)] text-center mb-10 text-lg" style={{ color: "#1A1714" }}>
          Trusted by creators who care about beauty
        </h2>
        <div className="flex flex-col gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="rounded-lg border p-6"
              style={{ borderColor: "#E8E2D9", backgroundColor: "#FFF" }}
            >
              <p className="font-[family-name:var(--font-cormorant)] italic text-[15px]" style={{ color: "#1A1714", lineHeight: 1.6 }}>{t.quote}</p>
              <div className="flex items-center gap-3 mt-4">
                <Image src={t.image} alt="" width={40} height={40} className="rounded-full object-cover" />
                <div>
                  <p className="font-[family-name:var(--font-body)] font-medium text-sm" style={{ color: "#1A1714" }}>{t.name}</p>
                  <p className="font-[family-name:var(--font-body)] font-light text-xs" style={{ color: "#8C8578" }}>{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 px-5" style={{ backgroundColor: "#F0ECE5" }}>
        <div className="max-w-[320px] mx-auto text-center">
          <div className="w-10 h-px mx-auto mb-6" style={{ backgroundColor: "#B8963E" }} />
          <h2 className="font-[family-name:var(--font-cormorant)] mb-6 text-xl" style={{ color: "#1A1714" }}>
            Simple.
          </h2>
          <div className="rounded-lg border p-8" style={{ borderColor: "#D4C5A9" }}>
            <p className="font-[family-name:var(--font-cormorant)] text-5xl" style={{ color: "#1A1714", lineHeight: 1 }}>
              <span style={{ color: "#B8963E", fontSize: "0.5em" }}>$</span>9.99
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>
              Per event
            </p>
            <p className="mt-6 text-[14px] leading-[1.7]" style={{ fontFamily: "var(--font-body)", color: "#1A1714" }}>
              AI-generated event page · Unlimited ticket sales · Guest management · Promotion toolkit · No monthly fees
            </p>
            <Link
              href="/create"
              className="inline-block mt-8 rounded-full px-10 py-4 text-base font-medium min-h-[48px] flex items-center justify-center w-full"
              style={{ backgroundColor: "#B8963E", color: "#FFF", fontFamily: "var(--font-body)" }}
            >
              Create Your First Event →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-5" style={{ backgroundColor: "#FAF7F2" }}>
        <p className="font-[family-name:var(--font-cormorant)] italic mb-6 text-lg text-center" style={{ color: "#1A1714", lineHeight: 1.4 }}>
          For the moments that deserve more than a Google Form
        </p>
        <div className="w-full max-w-[200px] h-px mx-auto mb-6" style={{ backgroundColor: "#C4956A" }} />
        <div className="flex flex-wrap justify-center gap-6 mb-6" style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#8C8578" }}>
          <Link href="/" className="hover:text-[#C4956A] transition-colors">About</Link>
          <Link href="#pricing" className="hover:text-[#C4956A] transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-[#C4956A] transition-colors">Log In</Link>
          <Link href="/" className="hover:text-[#C4956A] transition-colors">Contact</Link>
        </div>
        <p className="text-center text-[11px]" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>
          Design by Jenna Leigh West · The Forgotten Code
        </p>
        <p className="mt-2 text-center font-[family-name:var(--font-cormorant)] italic" style={{ color: "#1A1714" }}>
          Popup
        </p>
        <Link
          href="/"
          className="mt-6 block text-center text-[12px] uppercase tracking-[0.15em] hover:text-[#C4956A] transition-colors"
          style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}
        >
          View Full Site →
        </Link>
      </footer>
    </div>
  );
}
