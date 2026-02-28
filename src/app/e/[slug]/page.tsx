"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";

const DEMO_EVENT = {
  name: "The Edit — Spring Sample Sale",
  tagline: "Three days of designer fashion at up to 70% off",
  category: "fashion",
  theme: "atelier" as const,
  city: "New York",
  venue: "The Loft on Spring",
  address: "161 Spring Street, SoHo",
  date: "May 15-17, 2026",
  time: "10:00 AM - 7:00 PM",
  heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop",
  highlights: [
    {
      title: "Curated Designers",
      desc: "40+ independent designers from NYC, LA, and London",
    },
    {
      title: "Personal Styling",
      desc: "Book a 30-minute session with our in-house stylists",
    },
    {
      title: "Cocktails & Music",
      desc: "Live DJ sets and a complimentary prosecco bar",
    },
  ],
  hosts: [
    { name: "Alexandra Chen", role: "Creative Director, Maison Noir", bio: "Former Vogue editor with an eye for emerging talent.", image: "https://ui-avatars.com/api/?name=Alexandra+Chen&size=200&background=C4956A&color=ffffff" },
    { name: "Marcus Webb", role: "Founder, Webb Gallery", bio: "Curator and collector of contemporary fashion.", image: "https://ui-avatars.com/api/?name=Marcus+Webb&size=200&background=8C8578&color=ffffff" },
    { name: "Elena Rivera", role: "Stylist & Consultant", bio: "Building capsule wardrobes for the modern professional.", image: "https://ui-avatars.com/api/?name=Elena+Rivera&size=200&background=5C7C50&color=ffffff" },
    { name: "James Park", role: "Designer, Park Studio", bio: "Minimalist aesthetics meet sustainable fashion.", image: "https://ui-avatars.com/api/?name=James+Park&size=200&background=1A1A1A&color=ffffff" },
    { name: "Sophie Laurent", role: "Fashion Director", bio: "Bridging Paris and New York for over a decade.", image: "https://ui-avatars.com/api/?name=Sophie+Laurent&size=200&background=A67B52&color=ffffff" },
    { name: "David Kim", role: "Accessories Curator", bio: "Specializing in vintage and artisan pieces.", image: "https://ui-avatars.com/api/?name=David+Kim&size=200&background=556B2F&color=ffffff" },
  ],
  schedule: [
    { time: "10:00 AM", title: "Doors Open & Welcome Prosecco" },
    { time: "10:30 AM", title: "Trunk Show: Maison Noir Spring Collection" },
    { time: "12:00 PM", title: "Styling Workshop: Building a Capsule Wardrobe" },
    { time: "1:00 PM", title: "Lunch Break & DJ Set" },
    { time: "2:00 PM", title: "Designer Meet & Greet" },
    { time: "3:30 PM", title: "VIP Preview: Summer Accessories" },
    { time: "5:00 PM", title: "Cocktail Hour & Closing Reception" },
  ],
  venueImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=800&fit=crop",
  tickets: [
    { name: "General Admission", price: 0, desc: "Access to all three days" },
    { name: "VIP Preview", price: 45, desc: "Early access + styling session + gift bag" },
    { name: "Collector's Pass", price: 95, desc: "All VIP perks + private designer dinner" },
  ],
  faqs: [
    { q: "What is the dress code?", a: "Smart casual. We encourage expressing your personal style." },
    { q: "Is parking available?", a: "Street parking and nearby garages. We recommend rideshare." },
    { q: "Can I bring a guest?", a: "General Admission includes one guest. VIP tiers include two." },
    { q: "Are refunds available?", a: "Full refunds up to 7 days before the event." },
    { q: "Will there be food?", a: "Light bites and prosecco. Lunch break has nearby options." },
  ],
};

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

function EventPageContent() {
  const theme = themes[DEMO_EVENT.theme];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "var(--theme-body-font)",
        color: theme.colors.text,
      }}
    >
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 ken-burns">
          <Image
            src={DEMO_EVENT.heroImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${theme.colors.bg} 0%, transparent 50%)`,
          }}
        />
        <div className="relative z-10 px-6 md:px-12 pb-20 md:pb-24 max-w-4xl">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-2"
            style={{ fontFamily: "var(--theme-display-font)" }}
          >
            {DEMO_EVENT.name}
          </h1>
          <p
            className="text-lg md:text-xl mb-6 max-w-2xl"
            style={{ color: theme.colors.textMuted }}
          >
            {DEMO_EVENT.tagline}
          </p>
          <p
            className="text-sm tracking-[0.2em] uppercase mb-8"
            style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}
          >
            {DEMO_EVENT.date} · {DEMO_EVENT.venue} · {DEMO_EVENT.city}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#tickets"
              className="px-8 py-4 text-white font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                backgroundColor: theme.colors.accent,
                borderRadius: `${theme.buttonRadius}px`,
              }}
            >
              Get Tickets →
            </a>
            <a
              href="#experience"
              className="px-8 py-4 font-medium tracking-wider uppercase transition-colors"
              style={{ color: theme.colors.text }}
            >
              Learn More ↓
            </a>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section
        id="experience"
        className="py-20 md:py-28 px-6"
        style={{ backgroundColor: theme.colors.bgAlt }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <h2
              className="text-3xl md:text-4xl font-light mb-16"
              style={{ fontFamily: "var(--theme-display-font)" }}
            >
              The Experience
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMO_EVENT.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div
                  className="p-8 h-full transition-shadow duration-300 hover:shadow-lg group"
                  style={{
                    backgroundColor: theme.colors.card,
                    border: `1px solid ${theme.colors.cardBorder}`,
                    borderRadius: `${theme.cardRadius}px`,
                  }}
                >
                  <div
                    className="w-10 h-px mb-6"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  <h3
                    className="text-xl font-light mb-3"
                    style={{ fontFamily: "var(--theme-display-font)" }}
                  >
                    {h.title}
                  </h3>
                  <p className="max-w-[320px]" style={{ color: theme.colors.textMuted }}>{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosted By */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bg }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <h2
              className="text-3xl md:text-4xl font-light mb-16"
              style={{ fontFamily: "var(--theme-display-font)" }}
            >
              Featured Designers
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {DEMO_EVENT.hosts.map((host, i) => (
              <SectionReveal
                key={i}
                className={i === 0 ? "md:col-span-2" : i === 4 ? "md:col-span-2" : ""}
              >
                <div
                  className="group p-6 transition-all duration-300 hover:shadow-lg h-full"
                  style={{
                    backgroundColor: theme.colors.card,
                    border: `1px solid ${theme.colors.cardBorder}`,
                    borderRadius: `${theme.cardRadius}px`,
                  }}
                >
                  <div
                    className={`relative overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105 mb-4 aspect-square ${
                      i === 0 || i === 4 ? "max-w-[200px]" : "max-w-[140px]"
                    }`}
                  >
                    <Image
                      src={host.image}
                      alt={host.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3
                    className="text-lg font-light"
                    style={{ fontFamily: "var(--theme-display-font)" }}
                  >
                    {host.name}
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}
                  >
                    {host.role}
                  </p>
                  <p className="text-sm mt-2" style={{ color: theme.colors.textMuted }}>
                    {host.bio}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Program */}
      <section
        className="py-20 md:py-28 px-6"
        style={{ backgroundColor: theme.colors.bgAlt }}
      >
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <h2
              className="text-3xl md:text-4xl font-light mb-16"
              style={{ fontFamily: "var(--theme-display-font)" }}
            >
              The Program
            </h2>
          </SectionReveal>
          <div className="relative">
            {DEMO_EVENT.schedule.map((item, i) => (
              <SectionReveal key={i}>
                <div className="flex gap-8 pb-12 last:pb-0">
                  <div
                    className="flex-shrink-0 w-24 text-sm"
                    style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.accent }}
                  >
                    {item.time}
                  </div>
                  <div className="flex-1 border-l-2 pl-8" style={{ borderColor: theme.colors.accent }}>
                    <h3
                      className="text-lg font-light"
                      style={{ fontFamily: "var(--theme-display-font)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Venue */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bg }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
              <Image
                src={DEMO_EVENT.venueImage}
                alt={DEMO_EVENT.venue}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-8 md:p-12"
                style={{
                  background: `linear-gradient(to top, ${theme.colors.bg} 0%, transparent 60%)`,
                }}
              >
                <h2
                  className="text-2xl md:text-4xl font-light mb-2"
                  style={{ fontFamily: "var(--theme-display-font)" }}
                >
                  {DEMO_EVENT.venue}
                </h2>
                <p
                  className="text-sm mb-4"
                  style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}
                >
                  {DEMO_EVENT.address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(DEMO_EVENT.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium tracking-wider uppercase w-fit"
                  style={{ color: theme.colors.accent }}
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Tickets */}
      <section
        id="tickets"
        className="py-20 md:py-28 px-6"
        style={{ backgroundColor: theme.colors.bgAlt }}
      >
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <h2
              className="text-3xl md:text-4xl font-light text-center mb-16"
              style={{ fontFamily: "var(--theme-display-font)" }}
            >
              Get Your Tickets
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_EVENT.tickets.map((ticket, i) => (
              <SectionReveal key={i}>
                <div
                  className="p-8 h-full flex flex-col transition-shadow duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: theme.colors.card,
                    border: `1px solid ${theme.colors.cardBorder}`,
                    borderRadius: `${theme.cardRadius}px`,
                  }}
                >
                  <h3
                    className="text-xl font-light mb-2"
                    style={{ fontFamily: "var(--theme-display-font)" }}
                  >
                    {ticket.name}
                  </h3>
                  <p
                    className="text-2xl font-light mb-4"
                    style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.accent }}
                  >
                    {ticket.price === 0 ? "Free RSVP" : `$${ticket.price}`}
                  </p>
                  <p className="text-sm mb-6 flex-1" style={{ color: theme.colors.textMuted }}>
                    {ticket.desc}
                  </p>
                  <a
                    href="#"
                    className="inline-block text-center py-3 font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      border: `2px solid ${theme.colors.accent}`,
                      borderRadius: `${theme.buttonRadius}px`,
                      color: theme.colors.text,
                    }}
                  >
                    Select →
                  </a>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bg }}>
        <div className="max-w-2xl mx-auto">
          <SectionReveal>
            <h2
              className="text-3xl md:text-4xl font-light mb-16"
              style={{ fontFamily: "var(--theme-display-font)" }}
            >
              FAQ
            </h2>
          </SectionReveal>
          <div className="space-y-2">
            {DEMO_EVENT.faqs.map((faq, i) => (
              <SectionReveal key={i}>
                <div
                  className="border-b transition-colors"
                  style={{ borderColor: theme.colors.cardBorder }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-6 text-left flex justify-between items-center gap-4"
                  >
                    <span
                      className="font-light"
                      style={{ fontFamily: "var(--theme-display-font)" }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="text-xl transition-transform"
                      style={{
                        color: theme.colors.accent,
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-6"
                        style={{ color: theme.colors.textMuted }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Share & Save */}
      <section
        className="py-20 md:py-28 px-6"
        style={{ backgroundColor: theme.colors.bgAlt }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <SectionReveal>
            <h2
              className="text-2xl font-light mb-8"
              style={{ fontFamily: "var(--theme-display-font)" }}
            >
              Share this event
            </h2>
            <div className="flex justify-center gap-6 mb-12">
              <button
                className="p-3 transition-opacity hover:opacity-70"
                style={{ color: theme.colors.text }}
                aria-label="Copy link"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h2m0 0h2a2 2 0 012 2v2m0 6v2a2 2 0 01-2 2h-2m-2 0h-2a2 2 0 01-2-2v-2m0-6V6a2 2 0 012-2h2" />
                </svg>
              </button>
              <a href="#" className="p-3 transition-opacity hover:opacity-70" style={{ color: theme.colors.text }} aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>
              </a>
              <a href="#" className="p-3 transition-opacity hover:opacity-70" style={{ color: theme.colors.text }} aria-label="X">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                </svg>
              </a>
              <a href="#" className="p-3 transition-opacity hover:opacity-70" style={{ color: theme.colors.text }} aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            <h3
              className="text-lg font-light mb-4"
              style={{ fontFamily: "var(--theme-display-font)" }}
            >
              Add to Calendar
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="px-6 py-3 text-sm tracking-wider uppercase transition-opacity hover:opacity-70"
                style={{ color: theme.colors.accent }}
              >
                Google
              </a>
              <a
                href="#"
                className="px-6 py-3 text-sm tracking-wider uppercase transition-opacity hover:opacity-70"
                style={{ color: theme.colors.accent }}
              >
                iCal
              </a>
              <a
                href="#"
                className="px-6 py-3 text-sm tracking-wider uppercase transition-opacity hover:opacity-70"
                style={{ color: theme.colors.accent }}
              >
                Outlook
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-6 text-center"
        style={{ backgroundColor: theme.colors.bg, borderTop: `1px solid ${theme.colors.cardBorder}` }}
      >
        <p
          className="text-sm mb-2"
          style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}
        >
          Powered by Popup
        </p>
        <a
          href="/"
          className="text-sm font-medium tracking-wider uppercase transition-opacity hover:opacity-70"
          style={{ color: theme.colors.accent }}
        >
          Create your own event
        </a>
        <p
          className="text-xs tracking-widest uppercase mt-6"
          style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}
        >
          Design by Jenna Leigh West · The Forgotten Code
        </p>
      </footer>
    </div>
  );
}

export default function EventPage() {
  const theme = themes[DEMO_EVENT.theme];
  return (
    <ThemeProvider theme={theme}>
      <EventPageContent />
    </ThemeProvider>
  );
}
