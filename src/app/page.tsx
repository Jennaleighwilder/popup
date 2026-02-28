"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const HERO_WORDS = "Every gathering deserves a beautiful invitation".split(" ");

function AnimatedHeadline() {
  return (
    <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] text-[#1A1714] max-w-4xl">
      {HERO_WORDS.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

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

const SHOWCASE_EVENTS = [
  {
    title: "The Edit — Spring Sample Sale",
    location: "New York",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    title: "The Long Table",
    location: "London",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    gridClass: "md:col-span-1",
  },
  {
    title: "First Friday Art Walk",
    location: "Asheville",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=400&fit=crop",
    gridClass: "md:col-span-1",
  },
  {
    title: "Morning Rituals",
    location: "Joshua Tree",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop",
    gridClass: "md:col-span-2 md:col-start-1",
  },
];

const STEPS = [
  { num: "01", title: "Describe", desc: "Tell us about your event. AI handles the rest." },
  { num: "02", title: "Design", desc: "Choose a look. Customize every detail." },
  { num: "03", title: "Publish", desc: "Go live for $9.99. Start selling tickets." },
];

const THEMES = [
  { name: "Atelier", category: "Fashion", color: "#C4956A" },
  { name: "Harvest", category: "Food", color: "#8B4513" },
  { name: "Gallery", category: "Art", color: "#111111" },
  { name: "Botanica", category: "Wellness", color: "#5C7C50" },
  { name: "Soirée", category: "Nightlife", color: "#D4AF37" },
];

const FEATURES = [
  {
    title: "AI-powered creation",
    desc: "Describe your event in plain English. Our AI writes the copy, curates the imagery, and builds a complete page in under a minute. No design skills required.",
  },
  {
    title: "Beautiful by default",
    desc: "Five editorial themes—Atelier, Harvest, Gallery, Botanica, Soirée—each crafted for a different world. Your event looks like it belongs in a magazine.",
  },
  {
    title: "Tickets built in",
    desc: "Sell tickets, collect payments, and manage your guest list. No third-party tools. Everything lives in one place.",
  },
  {
    title: "Promote with AI",
    desc: "Generate social copy, email campaigns, and SEO-optimized descriptions. Share your event with confidence.",
  },
];

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent hover:bg-[#FAF7F2]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-2xl font-light text-[#1A1714]">
            Popup
          </span>
          <div className="flex items-center gap-8 font-[family-name:var(--font-body)] text-sm tracking-wider uppercase text-[#8C8578]">
            <a href="#examples" className="hover:text-[#1A1714] transition-colors">
              Examples
            </a>
            <a href="#pricing" className="hover:text-[#1A1714] transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-[#1A1714] transition-colors">
              Log In
            </a>
            <a
              href="#"
              className="px-5 py-2.5 bg-[#C4956A] text-white text-sm tracking-wider uppercase hover:bg-[#A67B52] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C4956A]/20 transition-all duration-300"
            >
              Create Event →
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
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
              className="px-8 py-4 font-[family-name:var(--font-body)] text-sm tracking-wider uppercase text-[#1A1714] border-b-2 border-[#1A1714] hover:border-[#C4956A] hover:text-[#C4956A] transition-colors"
            >
              See Examples
            </a>
          </motion.div>
        </div>

        {/* Category pills - horizontal scroll */}
        <div className="absolute bottom-12 left-0 right-0 overflow-hidden">
          <div className="flex animate-drift gap-6 whitespace-nowrap">
            {[...CATEGORY_PILLS, ...CATEGORY_PILLS].map((pill, i) => (
              <span key={i} className="flex items-center gap-6">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578]">
                  {pill}
                </span>
                <span className="text-[#E8E2D9]">{String.fromCharCode(183)}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section id="examples" className="py-24 px-6 bg-[#F0ECE5]">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-[#1A1714] text-center mb-16">
              Events that feel like art
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 md:gap-8">
            {SHOWCASE_EVENTS.map((event, i) => (
              <SectionReveal key={i} className={`${event.gridClass} min-h-0`}>
                <motion.a
                  href="#"
                  className="block group overflow-hidden rounded-sm bg-white border border-[#E8E2D9] card-shadow card-shadow-hover transition-all duration-600"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="aspect-[4/3] md:aspect-[3/2] relative overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-light text-[#1A1714]">
                      {event.title}
                    </h3>
                    <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mt-2">
                      {event.location}
                    </p>
                  </div>
                </motion.a>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-[#1A1714] text-center mb-20">
              Three steps. Sixty seconds.
            </h2>
          </SectionReveal>
          <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-0">
            {STEPS.flatMap((step, i) => [
              <SectionReveal key={`step-${i}`} className="flex-1 flex flex-col items-center text-center md:px-6">
                <span className="font-[family-name:var(--font-mono)] text-4xl font-light text-[#C4956A]/70">
                  {step.num}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-light text-[#1A1714] mt-4">
                  {step.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[#8C8578] mt-2 max-w-xs">
                  {step.desc}
                </p>
              </SectionReveal>,
              ...(i < STEPS.length - 1
                ? [
                    <div
                      key={`line-${i}`}
                      className="hidden md:flex flex-shrink-0 w-16 items-center justify-center"
                    >
                      <div className="w-full h-px bg-[#E8E2D9]" />
                    </div>,
                  ]
                : []),
            ])}
          </div>
        </div>
      </section>

      {/* Theme Showcase */}
      <section className="py-24 px-6 bg-[#F0ECE5]">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-[#1A1714] text-center mb-16">
              Five worlds. One platform.
            </h2>
          </SectionReveal>
          <div className="flex flex-wrap justify-center gap-6">
            {THEMES.map((theme, i) => (
              <SectionReveal key={i}>
                <motion.div
                  className="px-8 py-6 bg-white border border-[#E8E2D9] rounded-sm cursor-pointer card-shadow hover:shadow-lg hover:shadow-[#1A1714]/8 transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="w-12 h-12 rounded-full mb-4"
                    style={{ backgroundColor: theme.color }}
                  />
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-light text-[#1A1714]">
                    {theme.name}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mt-1">
                    {theme.category}
                  </p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-[#1A1714] text-center mb-20">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </SectionReveal>
          <div className="space-y-20">
            {FEATURES.map((feature, i) => (
              <SectionReveal key={i}>
                <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}>
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-light text-[#1A1714]">
                      {feature.title}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-[#8C8578] mt-4 max-w-lg leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="flex-1 h-48 bg-[#F0ECE5] rounded-sm" />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#F0ECE5]">
        <div className="max-w-2xl mx-auto text-center">
          <SectionReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-[#1A1714] mb-6">
              Simple. $9.99 per event.
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#8C8578] text-lg mb-8">
              per published event
            </p>
            <p className="font-[family-name:var(--font-body)] text-[#1A1714] text-sm leading-relaxed max-w-md mx-auto mb-12">
              AI-generated event page · Unlimited ticket sales · Guest management & check-in ·
              Promotion toolkit · Custom domain support · No monthly fees · No percentage of sales
            </p>
            <a
              href="#"
              className="inline-block px-10 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C4956A]/25 transition-all duration-300"
            >
              Create Your First Event →
            </a>
          </SectionReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-[#FAF7F2] border-t border-[#E8E2D9]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <span className="font-[family-name:var(--font-display)] text-2xl font-light text-[#1A1714]">
            Popup
          </span>
          <div className="flex flex-wrap justify-center gap-8 font-[family-name:var(--font-body)] text-sm text-[#8C8578]">
            <a href="#" className="hover:text-[#1A1714] transition-colors">About</a>
            <a href="#" className="hover:text-[#1A1714] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#1A1714] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#1A1714] transition-colors">Contact</a>
            <a href="#" className="hover:text-[#1A1714] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#1A1714] transition-colors">Privacy</a>
          </div>
        </div>
        <p className="text-center font-[family-name:var(--font-body)] text-sm text-[#8C8578] mt-12">
          Made for the moments that matter
        </p>
      </footer>
    </div>
  );
}
