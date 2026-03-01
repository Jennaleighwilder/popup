"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&h=1080&fit=crop",
];

const CATEGORY_PILLS = [
  "Fashion Pop-Ups",
  "Supper Clubs",
  "Gallery Openings",
  "Wellness Retreats",
  "Wine Tastings",
  "Artisan Markets",
  "Trunk Shows",
  "Chef's Tables",
];

const FEATURE_BLOCKS = [
  {
    title: "AI-powered creation",
    body: "Tell us about your event. AI handles the rest — copy, hosts, schedule, tickets. You refine.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    imageLeft: false,
  },
  {
    title: "Beautiful by default",
    body: "Five themes. Editorial design. Squarespace-quality layouts. No templates, no cookie-cutter.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    imageLeft: true,
  },
  {
    title: "Tickets built in",
    body: "Sell tickets. Collect payments. Manage guests. Check-in with QR codes. All in one place.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    imageLeft: false,
  },
  {
    title: "Promote with AI",
    body: "Social copy, email campaigns, SEO. AI helps you fill seats without the busywork.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    imageLeft: true,
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

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: "easeOut" as const } };

export default function Home() {
  return (
    <div className="min-h-screen landing-reset">
      {/* NAV */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 backdrop-blur-md border-b border-[#E8E2D9]/50"
        style={{ backgroundColor: "rgba(250,247,242,0.9)" }}
      >
        <span className="font-[family-name:var(--font-cormorant)] text-[22px] italic" style={{ color: "#1A1714" }}>
          Popup
        </span>
        <nav className="flex items-center gap-8">
          <Link href="#showcase" className="text-[11px] uppercase tracking-[0.15em] hover:underline" style={{ fontFamily: "var(--font-body)", color: "#1A1714" }}>
            Examples
          </Link>
          <Link href="#pricing" className="text-[11px] uppercase tracking-[0.15em] hover:underline" style={{ fontFamily: "var(--font-body)", color: "#1A1714" }}>
            Pricing
          </Link>
          <Link href="/login" className="text-[11px] uppercase tracking-[0.15em] hover:underline" style={{ fontFamily: "var(--font-body)", color: "#1A1714" }}>
            Log In
          </Link>
          <Link
            href="/create"
            className="rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ backgroundColor: "#C4956A", color: "#FFF", fontFamily: "var(--font-body)" }}
          >
            Create Event →
          </Link>
        </nav>
      </motion.header>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden" style={{ backgroundColor: "#FAF7F2" }}>
        {/* Ghost background images */}
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateY(${i % 2 === 0 ? "0" : "0"}) scale(1.0${i + 1})`,
              filter: "sepia(0.03) saturate(1.05)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[#FAF7F2]/80" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-10 h-px mb-8" style={{ backgroundColor: "#C4956A" }} />
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light leading-[1.15] mb-6 max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#1A1714" }}
          >
            Every gathering deserves a <em>beautiful</em> invitation
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[17px] font-light max-w-[480px] mb-10" style={{ color: "#8C8578" }}>
            Create stunning event pages for pop-ups, tastings, openings, and experiences. AI builds it in 60 seconds. You make it yours.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/create"
              className="rounded-full px-8 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: "#C4956A", color: "#FFF", fontFamily: "var(--font-body)" }}
            >
              Create Your Event →
            </Link>
            <Link href="#showcase" className="text-sm underline decoration-[#C4956A] underline-offset-4 hover:decoration-2 transition-all" style={{ fontFamily: "var(--font-body)", color: "#1A1714" }}>
              See Examples ↓
            </Link>
          </div>
          {/* Category pills - one row */}
          <div className="mt-20 w-full overflow-hidden">
            <div className="flex animate-drift-slow gap-6" style={{ fontFamily: "var(--font-body)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#8C8578" }}>
              {[...CATEGORY_PILLS, ...CATEGORY_PILLS].map((pill, i) => (
                <span key={i} className="flex items-center gap-3 shrink-0">
                  {pill}
                  {i < CATEGORY_PILLS.length * 2 - 1 && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C7402D" }} />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SHOWCASE GRID */}
      <section id="showcase" className="py-24 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeUp} className="font-[family-name:var(--font-playfair)] font-normal text-center mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1A1714" }}>
            Events that feel like <span style={{ color: "#C7402D" }}>art.</span>
          </motion.h2>
          <p className="text-center text-[11px] uppercase tracking-wider mb-16" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>
            Curated pop-ups from our community
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SHOWCASE_EVENTS.map(({ slug, featured, category }, idx) => {
              const ev = DEMO_EVENTS[slug];
              if (!ev) return null;
              const themeId = ev.theme as ThemeId;
              const t = themes[themeId];
              const displayFont = themeFontVariables[t.fonts.display] || "var(--font-cormorant)";
              return (
                <motion.div
                  key={slug}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
                  className={featured ? "md:col-span-2 md:row-span-2" : ""}
                >
                  <Link href={`/e/${slug}?theme=${themeId}`} className="group block h-full">
                    <div
                      className="relative overflow-hidden rounded-md transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl"
                      style={{ minHeight: featured ? 500 : 280, boxShadow: "0 4px 24px rgba(26,23,20,0.06)" }}
                    >
                      <Image src={ev.heroImage} alt="" fill className="object-cover" sizes={featured ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"} style={{ filter: "sepia(0.03) saturate(1.05)" }} />
                      {featured && (
                        <span className="absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider" style={{ backgroundColor: "#C7402D", color: "#FFF", fontFamily: "var(--font-body)" }}>
                          Featured
                        </span>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                        <span className="text-[10px] uppercase tracking-wider" style={{ color: CATEGORY_COLORS[category] || "#8C8578", fontFamily: "var(--font-body)" }}>
                          {category}
                        </span>
                        <h3 className="mt-1 text-white text-lg font-medium" style={{ fontFamily: displayFont }}>{ev.name}</h3>
                        <p className="text-xs text-white/90 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{ev.city} · {ev.date}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: EDITORIAL QUOTE BREAK */}
      <section className="relative py-32 px-6 flex items-center justify-center" style={{ minHeight: 400 }}>
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          style={{ filter: "sepia(0.03) saturate(1.05)" }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(250,247,242,0.78)" }} />
        <div className="relative z-10 max-w-[700px] text-center">
          <div className="w-[60px] h-px mx-auto mb-8" style={{ backgroundColor: "#2C3E2D" }} />
          <blockquote className="font-[family-name:var(--font-cormorant)] italic" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#2C3E2D", lineHeight: 1.4 }}>
            The details are not the details. They make the design.
          </blockquote>
          <p className="mt-6 text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)", color: "#2C3E2D" }}>
            — CHARLES EAMES
          </p>
          <div className="w-[60px] h-px mx-auto mt-8" style={{ backgroundColor: "#2C3E2D" }} />
        </div>
      </section>

      {/* SECTION 4: THREE STEPS */}
      <section className="py-[120px] px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2 {...fadeUp} className="text-center mb-16" style={{ fontFamily: "var(--font-body)", fontSize: "28px", fontWeight: 400, color: "#6B7B8D" }}>
            Three steps. Sixty seconds.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {["Describe", "Design", "Publish"].map((title, i) => (
              <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="text-center">
                <div className="font-[family-name:var(--font-body)] font-light mb-4" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "rgba(107,123,141,0.15)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-[family-name:var(--font-body)] font-medium text-lg mb-2" style={{ color: "#1A1714" }}>{title}</h3>
                <p className="font-[family-name:var(--font-body)] font-light text-[15px]" style={{ color: "#8C8578", lineHeight: 1.6 }}>
                  {i === 0 && "Tell us about your event. AI handles the rest."}
                  {i === 1 && "Choose a look. Customize every detail."}
                  {i === 2 && "Go live for $9.99. Start selling tickets."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: THEME SHOWCASE */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeUp} className="font-[family-name:var(--font-cormorant)] text-center" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#1A1714" }}>
            Five worlds. One platform.
          </motion.h2>
          <p className="text-center text-[13px] mt-2 mb-12" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>
            Each theme is a different design language.
          </p>
          <div className="flex flex-wrap justify-center gap-5 md:flex-nowrap md:overflow-x-auto md:pb-4">
            {FIVE_THEME_IDS.map((id) => {
              const t = themes[id];
              const displayFont = themeFontVariables[t.fonts.display] || "var(--font-cormorant)";
              const slug = getDemoSlugForTheme(id);
              const accent = t.colors.accent;
              return (
                <motion.div key={id} {...fadeUp}>
                  <Link
                    href={`/e/${slug}?theme=${id}`}
                    className="block w-[200px] shrink-0 rounded-lg border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{ borderColor: "#E8E2D9", backgroundColor: "#FFF" }}
                  >
                    <h3 className="text-lg font-medium" style={{ fontFamily: displayFont, color: "#1A1714" }}>{t.name}</h3>
                    <div className="flex gap-2 mt-3">
                      {[t.colors.accent, t.colors.bgAlt || t.colors.cardBorder, t.colors.textMuted, t.colors.text].map((c, i) => (
                        <span key={i} className="w-4 h-4 rounded-full border border-[#E8E2D9]" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <p className="text-[10px] uppercase tracking-wider mt-2" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>{t.category}</p>
                    <p className="text-[13px] mt-1" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>Editorial layouts for {t.category} events</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: FEATURES */}
      <section className="py-24">
        <motion.h2 {...fadeUp} className="font-[family-name:var(--font-playfair)] text-center mb-20" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#1A1714" }}>
          Everything you need. Nothing you don&apos;t.
        </motion.h2>
        {FEATURE_BLOCKS.map((block, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            className={`flex flex-col ${block.imageLeft ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 py-16 px-6`}
            style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF7F2" }}
          >
            <div className="flex-1 max-w-[420px]">
              <div className="w-[30px] h-0.5 mb-4" style={{ backgroundColor: "#B7654B" }} />
              <h3 className="text-xl font-medium mb-3" style={{ fontFamily: "var(--font-playfair)", color: "#1A1714" }}>
                <span style={{ color: "#B7654B" }}>{block.title.split(" ")[0]}</span> {block.title.split(" ").slice(1).join(" ")}
              </h3>
              <p className="text-[15px] leading-[1.7]" style={{ fontFamily: "var(--font-body)", color: "#1A1714" }}>{block.body}</p>
            </div>
            <div className={`flex-1 w-full max-w-[500px] min-h-[350px] relative overflow-hidden rounded-lg ${block.imageLeft ? "md:rounded-l-none" : "md:rounded-r-none"}`}>
              <Image src={block.image} alt="" fill className="object-cover" sizes="500px" style={{ filter: "sepia(0.03) saturate(1.05)" }} />
            </div>
          </motion.div>
        ))}
      </section>

      {/* SECTION 7: RED STATEMENT */}
      <section className="h-[360px] flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#C7402D" }}>
        <motion.p {...fadeUp} className="font-[family-name:var(--font-cormorant)] italic text-white text-center max-w-3xl" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.3 }}>
          Your event deserves better than an Eventbrite page.
        </motion.p>
        <p className="mt-4 text-[14px] text-white/80" style={{ fontFamily: "var(--font-body)" }}>Join 500+ creators who chose beauty.</p>
        <Link
          href="/create"
          className="mt-8 rounded-full px-8 py-3.5 border border-white bg-transparent text-white text-sm font-medium transition-all hover:bg-white hover:text-[#C7402D]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Create Your Event →
        </Link>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeUp} className="font-[family-name:var(--font-cormorant)] text-center mb-16" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#1A1714" }}>
            Trusted by creators who care about beauty
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="relative rounded-lg border p-8 transition-colors hover:border-[#5C7C50]"
                style={{ borderColor: "#E8E2D9", backgroundColor: "#FFF" }}
              >
                <span className="absolute top-6 left-6 font-[family-name:var(--font-cormorant)] italic text-5xl" style={{ color: "#5C7C50", opacity: 0.12 }}>
                  &ldquo;
                </span>
                <p className="font-[family-name:var(--font-cormorant)] italic text-[16px] relative z-10" style={{ color: "#1A1714", lineHeight: 1.6 }}>{t.quote}</p>
                <div className="flex items-center gap-4 mt-6">
                  <Image src={t.image} alt="" width={48} height={48} className="rounded-full object-cover" />
                  <div>
                    <p className="font-[family-name:var(--font-body)] font-medium text-[14px]" style={{ color: "#1A1714" }}>{t.name}</p>
                    <p className="font-[family-name:var(--font-body)] font-light text-[13px]" style={{ color: "#8C8578" }}>{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: PRICING */}
      <section id="pricing" className="py-24 px-6" style={{ backgroundColor: "#F0ECE5" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-px mx-auto mb-8" style={{ backgroundColor: "#B8963E" }} />
          <motion.h2 {...fadeUp} className="font-[family-name:var(--font-cormorant)] mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#1A1714" }}>
            Simple.
          </motion.h2>
          <div className="rounded-lg border p-12" style={{ borderColor: "#D4C5A9" }}>
            <p className="font-[family-name:var(--font-cormorant)]" style={{ fontSize: "clamp(4rem, 9vw, 7rem)", color: "#1A1714", lineHeight: 1 }}>
              <span style={{ color: "#B8963E", fontSize: "0.5em" }}>$</span>9.99
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>
              Per event
            </p>
            <p className="mt-8 text-[15px] leading-[1.7]" style={{ fontFamily: "var(--font-body)", color: "#1A1714" }}>
              AI-generated event page · Unlimited ticket sales · Guest management & check-in · Promotion toolkit · Custom domain support · No monthly fees · No percentage of sales
            </p>
            <Link
              href="/create"
              className="inline-block mt-10 rounded-full px-10 py-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: "#B8963E", color: "#FFF", fontFamily: "var(--font-body)" }}
            >
              Create Your First Event →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10: FOOTER */}
      <footer className="py-16 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-[family-name:var(--font-cormorant)] italic mb-6" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#1A1714", lineHeight: 1.4 }}>
            For the moments that deserve more than a Google Form
          </p>
          <div className="w-full max-w-xs h-px mx-auto mb-8" style={{ backgroundColor: "#C4956A" }} />
          <div className="flex flex-wrap justify-center gap-8 mb-8" style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#8C8578" }}>
            <Link href="/" className="hover:text-[#C4956A] transition-colors">About</Link>
            <Link href="#pricing" className="hover:text-[#C4956A] transition-colors">Pricing</Link>
            <Link href="/" className="hover:text-[#C4956A] transition-colors">Blog</Link>
            <Link href="/" className="hover:text-[#C4956A] transition-colors">Contact</Link>
            <Link href="/" className="hover:text-[#C4956A] transition-colors">Terms</Link>
            <Link href="/" className="hover:text-[#C4956A] transition-colors">Privacy</Link>
          </div>
          <p className="text-[11px]" style={{ fontFamily: "var(--font-body)", color: "#8C8578" }}>
            Design by Jenna Leigh West · The Forgotten Code
          </p>
          <p className="mt-2 font-[family-name:var(--font-cormorant)] italic" style={{ color: "#1A1714" }}>
            Popup
          </p>
        </div>
      </footer>
    </div>
  );
}
