"use client";

import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop",
    className: "w-64 h-80 md:w-80 md:h-96 -rotate-3 top-[10%] right-[5%]",
    opacity: 0.2,
    speed: 0.08,
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    className: "w-56 h-72 md:w-72 md:h-88 rotate-2 bottom-[15%] left-[5%]",
    opacity: 0.15,
    speed: 0.05,
  },
  {
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop",
    className: "w-48 h-64 md:w-64 md:h-80 -rotate-1 top-[35%] right-[15%]",
    opacity: 0.18,
    speed: 0.06,
  },
  {
    url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=700&h=500&fit=crop",
    className: "w-52 h-68 md:w-68 md:h-84 rotate-[1.5deg] top-[12%] left-[8%]",
    opacity: 0.12,
    speed: 0.04,
  },
];

function HeroImageCollage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, (v) => v * 0.08);
  const y2 = useTransform(scrollY, (v) => v * 0.05);
  const y3 = useTransform(scrollY, (v) => v * 0.06);
  const y4 = useTransform(scrollY, (v) => v * 0.04);
  const yValues = [y1, y2, y3, y4];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {HERO_IMAGES.map((img, i) => (
        <motion.div
          key={i}
          className={`absolute ${img.className}`}
          style={{ y: yValues[i] }}
        >
          <div className="absolute inset-0 bg-[#FAF7F2]/80 rounded-sm" />
          <Image
            src={img.url}
            alt=""
            fill
            className="object-cover rounded-sm"
            style={{ opacity: img.opacity }}
            sizes="(max-width: 768px) 256px, 320px"
          />
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedHeadline() {
  const words = "Every gathering deserves a beautiful invitation".split(" ");
  return (
    <h1
      className="font-[family-name:var(--font-cormorant)] font-light text-[#1A1714] max-w-[800px]"
      style={{
        fontSize: "clamp(3rem, 7vw, 5.5rem)",
        lineHeight: 1.1,
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={word === "beautiful" ? "italic font-[family-name:var(--font-cormorant)]" : ""}
          style={{ display: "inline", marginRight: i < words.length - 1 ? "0.28em" : 0 }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

const CATEGORY_PILLS_ROW1 = [
  "Fashion Pop-Ups",
  "Supper Clubs",
  "Gallery Openings",
  "Wellness Retreats",
  "Wine Tastings",
  "Artisan Markets",
  "Trunk Shows",
  "Chef's Tables",
];

const CATEGORY_PILLS_ROW2 = [
  "Listening Parties",
  "Vintage Fairs",
  "Maker Markets",
  "Taco Pop-Ups",
  "Flower Workshops",
  "Sake Tastings",
  "Studio Open Days",
  "Book Launches",
];

const SHOWCASE_EVENTS = [
  {
    title: "The Edit — Spring Sample Sale",
    location: "New York",
    date: "May 15–17, 2026",
    category: "FASHION",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop",
    gridClass: "md:col-span-2 md:row-span-2",
    featured: true,
    slug: "the-edit-spring-sample-sale",
  },
  {
    title: "The Long Table",
    location: "London",
    date: "June 8, 2026",
    category: "FOOD",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    gridClass: "md:col-span-1",
    featured: false,
    slug: null,
  },
  {
    title: "First Friday Art Walk",
    location: "Asheville",
    date: "First Friday",
    category: "ART",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=400&fit=crop",
    gridClass: "md:col-span-1",
    featured: false,
    slug: "first-friday-art-walk",
  },
  {
    title: "Morning Rituals",
    location: "Joshua Tree",
    date: "June 22, 2026",
    category: "WELLNESS",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop",
    gridClass: "md:col-span-2 md:col-start-1",
    featured: false,
    slug: null,
  },
];

const STEPS = [
  { num: "01", title: "Describe", desc: "Tell us about your event. AI handles the rest." },
  { num: "02", title: "Design", desc: "Choose a look. Customize every detail." },
  { num: "03", title: "Publish", desc: "Go live for $9.99. Start selling tickets." },
];

const THEME_DATA = [
  {
    id: "atelier",
    name: "Atelier",
    category: "Fashion",
    fontVar: "--font-cormorant",
    bg: "#FAF8F5",
    text: "#1A1714",
    accent: "#C4956A",
    colors: ["#FAF8F5", "#1A1714", "#C4956A", "#E8E2D9"],
    desc: "Sharp edges, burnished copper, editorial confidence. For fashion shows, sample sales, and trunk shows.",
  },
  {
    id: "harvest",
    name: "Harvest",
    category: "Food",
    fontVar: "--font-playfair",
    bg: "#F7F3ED",
    text: "#2D2A26",
    accent: "#8B4513",
    colors: ["#F7F3ED", "#2D2A26", "#8B4513", "#D4C9B8"],
    desc: "Warm, rustic, inviting. For supper clubs, chef's tables, and farm-to-table gatherings.",
  },
  {
    id: "gallery",
    name: "Gallery",
    category: "Art",
    fontVar: "--font-eb-garamond",
    bg: "#FFFFFF",
    text: "#111111",
    accent: "#E63946",
    colors: ["#FFFFFF", "#111111", "#E63946", "#E0E0E0"],
    desc: "Clean, minimal, gallery-wall elegance. For openings, exhibitions, and studio visits.",
  },
  {
    id: "botanica",
    name: "Botanica",
    category: "Wellness",
    fontVar: "--font-cardo",
    bg: "#F5F0E8",
    text: "#2A3B2A",
    accent: "#5C7C50",
    colors: ["#F5F0E8", "#2A3B2A", "#5C7C50", "#D4CDB8"],
    desc: "Calm, organic, nature-inspired. For retreats, yoga, and mindful gatherings.",
  },
  {
    id: "soiree",
    name: "Soirée",
    category: "Nightlife",
    fontVar: "--font-italiana",
    bg: "#1A1A1A",
    text: "#F5F0E8",
    accent: "#D4AF37",
    colors: ["#1A1A1A", "#F5F0E8", "#D4AF37", "#8C8578"],
    desc: "Dark, glamorous, golden hour. For listening parties, late-night events, and exclusive soirées.",
  },
];

const FEATURES = [
  {
    title: "AI-powered creation",
    desc: "Describe your event in plain English. Our AI writes the copy, curates the imagery, and builds a complete page in under a minute. No design skills required.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop",
  },
  {
    title: "Beautiful by default",
    desc: "Five editorial themes—Atelier, Harvest, Gallery, Botanica, Soirée—each crafted for a different world. Your event looks like it belongs in a magazine.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
  },
  {
    title: "Tickets built in",
    desc: "Sell tickets, collect payments, and manage your guest list. No third-party tools. Everything lives in one place.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&h=400&fit=crop",
  },
  {
    title: "Promote with AI",
    desc: "Generate social copy, email campaigns, and SEO-optimized descriptions. Share your event with confidence.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
  },
];

const TESTIMONIALS = [
  {
    quote: "Popup transformed how we invite people. No more ugly Eventbrite links—our supper club finally looks like the experience we're selling.",
    name: "Sarah Chen",
    title: "Founder, The Long Table",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "We used it for our gallery opening and got so many compliments. The design felt like an extension of our brand.",
    name: "Marcus Webb",
    title: "Curator, Webb Gallery",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Finally—event pages that don't look like they were built in 2010. Our retreat sold out in a week.",
    name: "Elena Rivera",
    title: "Wellness Retreat Host",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
];

function SectionReveal({
  children,
  className = "",
  threshold = 0.2,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px", amount: threshold });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: inView ? delay : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>("atelier");
  const [navScrolled, setNavScrolled] = useState(false);
  const { user, demoMode } = useAuth();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setNavScrolled(latest > 100);
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Navigation - sticky with blur on scroll, page load animation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: navScrolled ? "rgba(250,247,242,0.9)" : "transparent",
          backdropFilter: navScrolled ? "blur(12px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(232,226,217,0.5)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic text-[#1A1714]"
            style={{ fontSize: "24px" }}
          >
            Popup
          </Link>
          <div
            className="flex items-center gap-8 font-[family-name:var(--font-body)] text-[#8C8578] uppercase"
            style={{ fontSize: "13px", letterSpacing: "0.08em" }}
          >
            <a href="#examples" className="link-underline hover:text-[#1A1714] transition-colors">
              Examples
            </a>
            <a href="#pricing" className="link-underline hover:text-[#1A1714] transition-colors">
              Pricing
            </a>
            {user || demoMode ? (
              <Link href="/dashboard" className="link-underline hover:text-[#1A1714] transition-colors">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="link-underline hover:text-[#1A1714] transition-colors">
                Log In
              </Link>
            )}
            <Link
              href={user || demoMode ? "/create" : "/login"}
              className="px-5 py-2.5 bg-[#C4956A] text-white rounded uppercase hover:bg-[#A67B52] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C4956A]/25 transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.1em",
              }}
            >
              Create Event →
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero - page load: content fades up with delay */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Hero image collage - behind text */}
        <HeroImageCollage />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          {/* Decorative line - 60px copper line centered above headline */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 60 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-px bg-[#C4956A]"
            />
          </div>
          <AnimatedHeadline />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 text-lg md:text-xl text-[#8C8578] font-[family-name:var(--font-body)] font-light max-w-2xl leading-relaxed"
          >
            Create stunning event pages for pop-ups, tastings, openings, and experiences. AI builds it
            in 60 seconds. You make it yours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#"
              className="px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C4956A]/25 transition-all duration-300"
            >
              Create Your Event →
            </a>
            <a
              href="#examples"
              className="link-underline px-8 py-4 font-[family-name:var(--font-body)] text-sm tracking-wider uppercase text-[#1A1714] hover:text-[#C7402D] transition-colors"
            >
              See Examples
            </a>
          </motion.div>
        </motion.div>

        {/* Category pills - two rows, opposite directions, gradient fade */}
        <div className="absolute bottom-12 left-0 right-0 overflow-hidden z-10">
          <div
            className="relative"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            {/* Row 1 - left to right */}
            <div className="flex animate-drift-row1 gap-6 whitespace-nowrap mb-4">
              {[...CATEGORY_PILLS_ROW1, ...CATEGORY_PILLS_ROW1].map((pill, i) => (
                <span key={`r1-${i}`} className="flex items-center gap-6 shrink-0">
                  <span
                    className="font-[family-name:var(--font-dm-mono)] font-light uppercase text-[#8C8578]"
                    style={{ fontSize: "11px", letterSpacing: "0.2em" }}
                  >
                    {pill}
                  </span>
                  <span className="text-[#C7402D] shrink-0" style={{ fontSize: "8px" }}>
                    ●
                  </span>
                </span>
              ))}
            </div>
            {/* Row 2 - right to left */}
            <div className="flex animate-drift-row2 gap-6 whitespace-nowrap">
              {[...CATEGORY_PILLS_ROW2, ...CATEGORY_PILLS_ROW2].map((pill, i) => (
                <span key={`r2-${i}`} className="flex items-center gap-6 shrink-0">
                  <span
                    className="font-[family-name:var(--font-dm-mono)] font-light uppercase text-[#8C8578]"
                    style={{ fontSize: "11px", letterSpacing: "0.2em" }}
                  >
                    {pill}
                  </span>
                  <span className="text-[#C7402D] shrink-0" style={{ fontSize: "8px" }}>
                    ●
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section id="examples" className="py-24 px-6 bg-[#F0ECE5]">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-[#1A1714] text-center mb-16">
              Events that feel like{" "}
              <span className="text-[#C7402D]">art</span>
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 md:gap-8">
            {SHOWCASE_EVENTS.map((event, i) => (
              <SectionReveal key={i} className={`${event.gridClass} min-h-0`}>
                <motion.a
                  href={event.slug ? `/e/${event.slug}` : "#"}
                  className="relative block group overflow-hidden rounded-sm bg-white border border-[#E8E2D9] card-shadow transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,23,20,0.12)]"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="absolute top-4 left-4 z-10">
                    {event.featured && (
                      <span className="px-3 py-1 bg-[#C7402D] text-white font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.2em] uppercase">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div
                    className="relative overflow-hidden"
                    style={{
                      minHeight: event.featured ? "550px" : "280px",
                    }}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <p
                      className="font-[family-name:var(--font-dm-mono)] uppercase mb-1"
                      style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#8C8578" }}
                    >
                      {event.category}
                    </p>
                    <h3
                      className="font-[family-name:var(--font-cormorant)] font-normal text-[#1A1714]"
                      style={{
                        fontSize: event.featured ? "1.5rem" : "1.125rem",
                      }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="font-[family-name:var(--font-dm-mono)] mt-2"
                      style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#8C8578" }}
                    >
                      {event.location}
                    </p>
                    <p
                      className="font-[family-name:var(--font-dm-mono)] mt-0.5"
                      style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#8C8578" }}
                    >
                      {event.date}
                    </p>
                  </div>
                </motion.a>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial break */}
      <section
        className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden border-y border-[rgba(196,149,106,0.2)]"
        style={{ borderWidth: "1px 0" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop"
          alt=""
          fill
          className="object-cover popup-warm-image"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(250,247,242,0.5) 0%, rgba(250,247,242,0.85) 100%)",
          }}
        />
        <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
          <SectionReveal>
            <blockquote
              className="font-[family-name:var(--font-cormorant)] font-light italic text-[#1A1714] leading-relaxed"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
            >
              &ldquo;The details are not the details. They make the design.&rdquo;
            </blockquote>
            <p className="font-[family-name:var(--font-dm-mono)] text-sm tracking-widest uppercase text-[#8C8578] mt-6">
              — Charles Eames
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[#1A1714] text-center mb-20">
              Three steps. Sixty seconds.
            </h2>
          </SectionReveal>
          <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-4">
            {STEPS.flatMap((step, i) => [
              <SectionReveal
                key={`step-${i}`}
                className="flex-1 flex flex-col items-center text-center md:px-6"
                threshold={0.2}
                delay={i * 0.2}
              >
                <span
                  className="font-[family-name:var(--font-cormorant)] font-light block"
                  style={{
                    fontSize: "clamp(4rem, 8vw, 7rem)",
                    color: "rgba(196,149,106,0.3)",
                  }}
                >
                  {step.num}
                </span>
                <div
                  className="w-10 h-px bg-[#C4956A] my-4"
                  style={{ opacity: 0.6 }}
                />
                <h3
                  className="font-[family-name:var(--font-body)] font-semibold text-[#1A1714]"
                  style={{ fontSize: "18px" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-[family-name:var(--font-body)] font-light text-[#8C8578] mt-2 max-w-xs"
                  style={{ fontSize: "15px" }}
                >
                  {step.desc}
                </p>
              </SectionReveal>,
              ...(i < STEPS.length - 1
                ? [
                    <div
                      key={`line-${i}`}
                      className="hidden md:flex flex-shrink-0 w-12 items-center justify-center self-stretch"
                    >
                      <div
                        className="w-full h-px border-t-2 border-dotted"
                        style={{ borderColor: "rgba(196,149,106,0.3)" }}
                      />
                    </div>,
                  ]
                : []),
            ])}
          </div>
        </div>
      </section>

      {/* Theme Showcase - Interactive */}
      <section
        className="py-24 px-6 transition-all duration-500"
        style={{
          backgroundColor:
            THEME_DATA.find((t) => t.id === hoveredTheme)?.bg || THEME_DATA[0].bg,
          color: THEME_DATA.find((t) => t.id === hoveredTheme)?.text || "#1A1714",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <h2
              className="text-3xl md:text-4xl font-light text-center mb-16 transition-colors duration-500"
              style={{
                fontFamily: `var(${THEME_DATA.find((t) => t.id === hoveredTheme)?.fontVar || "--font-cormorant"})`,
                color: "inherit",
              }}
            >
              Five worlds. One platform.
            </h2>
          </SectionReveal>
          <div className="flex flex-wrap justify-center gap-6">
            {THEME_DATA.map((theme) => (
              <SectionReveal key={theme.id}>
                <motion.div
                  onMouseEnter={() => setHoveredTheme(theme.id)}
                  onMouseLeave={() => setHoveredTheme("atelier")}
                  onClick={() => setHoveredTheme(theme.id)}
                  className="w-full min-w-[200px] max-w-[240px] min-h-[200px] cursor-pointer overflow-hidden rounded-sm bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border-b-2"
                  style={{
                    borderColor: hoveredTheme === theme.id ? theme.accent : "transparent",
                  }}
                >
                  <div className="h-[120px] relative flex items-center justify-center p-4" style={{ backgroundColor: theme.bg }}>
                    <span
                      className="text-2xl font-light"
                      style={{
                        fontFamily: `var(${theme.fontVar})`,
                        color: theme.accent,
                      }}
                    >
                      {theme.name}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-2 mb-3 justify-center">
                      {theme.colors.map((c, j) => (
                        <div
                          key={j}
                          className="w-5 h-5 rounded-full border border-[#E8E2D9] shrink-0"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <p
                      className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] uppercase mb-2"
                      style={{ color: "inherit", opacity: 0.8 }}
                    >
                      {theme.category}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.9 }}>
                      {theme.desc}
                    </p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[#1A1714] text-center mb-20">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </SectionReveal>
          <div className="space-y-24">
            {FEATURES.map((feature, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className={`flex flex-col gap-12 items-center ${
                    i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="flex-1 max-w-xl">
                    <div className="w-10 h-px bg-[#C4956A] mb-4" />
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#1A1714]">
                      <span className="text-[#C4956A]">{feature.title.split(" ")[0]}</span>{" "}
                      {feature.title.split(" ").slice(1).join(" ")}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-[#8C8578] mt-4 max-w-lg leading-relaxed" style={{ lineHeight: 1.7 }}>
                      {feature.desc}
                    </p>
                  </div>
                  <div
                    className="flex-1 relative overflow-hidden rounded-lg popup-warm-image"
                    style={{
                      minHeight: "350px",
                      boxShadow: "0 20px 60px rgba(26,23,20,0.08)",
                    }}
                  >
                    <Image
                      src={feature.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#F0ECE5]">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[#1A1714] text-center mb-16">
              Trusted by creators who care about beauty
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <SectionReveal key={i}>
                <div className="relative p-8 bg-white border border-[#E8E2D9] rounded-sm card-shadow transition-colors duration-300 hover:border-[#C4956A]">
                  <span
                    className="absolute top-6 left-6 font-[family-name:var(--font-cormorant)] text-[80px] leading-none opacity-15"
                    style={{ color: "#C4956A" }}
                  >
                    &ldquo;
                  </span>
                  <p
                    className="font-[family-name:var(--font-cormorant)] text-lg italic text-[#1A1714] leading-relaxed relative z-10"
                    style={{ lineHeight: 1.6 }}
                  >
                    {t.quote}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 popup-warm-image">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-body)] font-medium text-[#1A1714]">
                        {t.name}
                      </p>
                      <p className="font-[family-name:var(--font-dm-mono)] text-xs tracking-wider text-[#8C8578]">
                        {t.title}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#F0ECE5]">
        <div className="max-w-2xl mx-auto">
          <SectionReveal>
            <div
              className="rounded-sm text-center relative"
              style={{
                border: "1px solid #E8E2D9",
                padding: "60px 80px",
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-[#C4956A]"
              />
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[#1A1714] mb-8">
                Simple.
              </h2>
              <div
                className="mb-4 font-[family-name:var(--font-cormorant)] font-light"
                style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}
              >
                <span className="align-top text-[#8C8578]" style={{ fontSize: "0.5em" }}>
                  $
                </span>
                <span className="text-[#1A1714]">9.99</span>
              </div>
              <p
                className="font-[family-name:var(--font-dm-mono)] font-light text-[#8C8578] uppercase mb-10"
                style={{ letterSpacing: "0.2em", fontSize: "12px" }}
              >
                per event
              </p>
              <p className="font-[family-name:var(--font-body)] text-[#1A1714] text-sm leading-relaxed max-w-md mx-auto mb-12">
                <span>AI-generated event page</span>
                <span className="text-[#C4956A] mx-1">·</span>
                <span>Unlimited ticket sales</span>
                <span className="text-[#C4956A] mx-1">·</span>
                <span>Guest management & check-in</span>
                <span className="text-[#C4956A] mx-1">·</span>
                <span>Promotion toolkit</span>
                <span className="text-[#C4956A] mx-1">·</span>
                <span>Custom domain support</span>
                <span className="text-[#C4956A] mx-1">·</span>
                <span>No monthly fees</span>
                <span className="text-[#C4956A] mx-1">·</span>
                <span>No percentage of sales</span>
              </p>
              <Link
                href="/create"
                className="inline-block px-10 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm font-medium tracking-[0.1em] uppercase hover:bg-[#A67B52] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C4956A]/25 transition-all duration-300"
              >
                Create Your First Event →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light italic text-[#1A1714] text-center max-w-3xl mx-auto mb-16"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              For the moments that deserve more than a Google Form
            </p>
          </SectionReveal>
          <div
            className="border-t border-[#C4956A]/30 pt-12 mb-8"
            style={{ borderWidth: "1px 0 0 0" }}
          />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic text-[#1A1714]">
              Popup
            </span>
            <div className="flex flex-wrap justify-center gap-8 font-[family-name:var(--font-body)] text-sm text-[#8C8578]">
              <a href="#" className="link-underline hover:text-[#1A1714] transition-colors">
                About
              </a>
              <a href="#pricing" className="link-underline hover:text-[#1A1714] transition-colors">
                Pricing
              </a>
              <a href="#" className="link-underline hover:text-[#1A1714] transition-colors">
                Blog
              </a>
              <a href="#" className="link-underline hover:text-[#1A1714] transition-colors">
                Contact
              </a>
              <a href="#" className="link-underline hover:text-[#1A1714] transition-colors">
                Terms
              </a>
              <a href="#" className="link-underline hover:text-[#1A1714] transition-colors">
                Privacy
              </a>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-[#8C8578] hover:text-[#C4956A] transition-colors cursor-pointer" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-[#8C8578] hover:text-[#C4956A] transition-colors cursor-pointer" aria-label="Pinterest">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="text-[#8C8578] hover:text-[#C4956A] transition-colors cursor-pointer" aria-label="X (Twitter)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
          <p className="text-center font-[family-name:var(--font-cormorant)] text-sm italic text-[#8C8578] mt-8">
            Made for the moments that matter
          </p>
          <p
            className="text-center font-[family-name:var(--font-dm-mono)] mt-4"
            style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#8C8578" }}
          >
            Design by Jenna Leigh West · The Forgotten Code
          </p>
        </div>
      </footer>
    </div>
  );
}
