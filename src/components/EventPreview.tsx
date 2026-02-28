"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import type { EventData } from "@/types/event";

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

export function EventPreview({ event, showFooter = true }: { event: EventData; showFooter?: boolean }) {
  const theme = themes[event.theme as keyof typeof themes] || themes.atelier;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--theme-body-font)", color: theme.colors.text }}>
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 ken-burns">
          <Image src={event.heroImage} alt="" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${theme.colors.bg} 0%, transparent 50%)` }} />
        <div className="relative z-10 px-6 md:px-12 pb-20 md:pb-24 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>
            {event.name}
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl" style={{ color: theme.colors.textMuted }}>{event.tagline}</p>
          <p className="text-sm tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>
            {event.date} · {event.venue} · {event.city}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#tickets" className="px-8 py-4 text-white font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl" style={{ backgroundColor: theme.colors.accent, borderRadius: `${theme.buttonRadius}px` }}>
              Get Tickets →
            </a>
            <a href="#experience" className="px-8 py-4 font-medium tracking-wider uppercase transition-colors" style={{ color: theme.colors.text }}>Learn More ↓</a>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal><h2 className="text-3xl md:text-4xl font-light mb-16" style={{ fontFamily: "var(--theme-display-font)" }}>The Experience</h2></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {event.highlights.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="p-8 h-full transition-shadow duration-300 hover:shadow-lg" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: `${theme.cardRadius}px` }}>
                  <div className="w-10 h-px mb-6" style={{ backgroundColor: theme.colors.accent }} />
                  <h3 className="text-xl font-light mb-3" style={{ fontFamily: "var(--theme-display-font)" }}>{h.title}</h3>
                  <p className="max-w-[320px]" style={{ color: theme.colors.textMuted }}>{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bg }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal><h2 className="text-3xl md:text-4xl font-light mb-16" style={{ fontFamily: "var(--theme-display-font)" }}>Your Hosts</h2></SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {event.hosts.map((host, i) => (
              <SectionReveal key={i} className={i === 0 ? "md:col-span-2" : i === 4 ? "md:col-span-2" : ""}>
                <div className="group p-6 transition-all duration-300 hover:shadow-lg h-full" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: `${theme.cardRadius}px` }}>
                  <div className={`relative overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105 mb-4 aspect-square ${i === 0 || i === 4 ? "max-w-[200px]" : "max-w-[140px]"}`}>
                    <Image src={host.image} alt={host.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <h3 className="text-lg font-light" style={{ fontFamily: "var(--theme-display-font)" }}>{host.name}</h3>
                  <p className="text-sm mt-1" style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}>{host.role}</p>
                  <p className="text-sm mt-2" style={{ color: theme.colors.textMuted }}>{host.bio}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
        <div className="max-w-3xl mx-auto">
          <SectionReveal><h2 className="text-3xl md:text-4xl font-light mb-16" style={{ fontFamily: "var(--theme-display-font)" }}>The Program</h2></SectionReveal>
          <div className="relative">
            {event.schedule.map((item, i) => (
              <SectionReveal key={i}>
                <div className="flex gap-8 pb-12 last:pb-0">
                  <div className="flex-shrink-0 w-24 text-sm" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.accent }}>{item.time}</div>
                  <div className="flex-1 border-l-2 pl-8" style={{ borderColor: theme.colors.accent }}>
                    <h3 className="text-lg font-light" style={{ fontFamily: "var(--theme-display-font)" }}>{item.title}</h3>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bg }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
              <Image src={event.venueImage} alt={event.venue} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12" style={{ background: `linear-gradient(to top, ${theme.colors.bg} 0%, transparent 60%)` }}>
                <h2 className="text-2xl md:text-4xl font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>{event.venue}</h2>
                <p className="text-sm mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>{event.address}</p>
                {event.address && <a href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium tracking-wider uppercase w-fit" style={{ color: theme.colors.accent }}>Get Directions →</a>}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="tickets" className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
        <div className="max-w-4xl mx-auto">
          <SectionReveal><h2 className="text-3xl md:text-4xl font-light text-center mb-16" style={{ fontFamily: "var(--theme-display-font)" }}>Get Your Tickets</h2></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {event.tickets.map((ticket, i) => (
              <SectionReveal key={i}>
                <div className="p-8 h-full flex flex-col transition-shadow duration-300 hover:shadow-lg" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: `${theme.cardRadius}px` }}>
                  <h3 className="text-xl font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>{ticket.name}</h3>
                  <p className="text-2xl font-light mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.accent }}>{ticket.price === 0 ? "Free RSVP" : `$${ticket.price}`}</p>
                  <p className="text-sm mb-6 flex-1" style={{ color: theme.colors.textMuted }}>{ticket.desc}</p>
                  <a href="#" className="inline-block text-center py-3 font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5" style={{ border: `2px solid ${theme.colors.accent}`, borderRadius: `${theme.buttonRadius}px`, color: theme.colors.text }}>Select →</a>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bg }}>
        <div className="max-w-2xl mx-auto">
          <SectionReveal><h2 className="text-3xl md:text-4xl font-light mb-16" style={{ fontFamily: "var(--theme-display-font)" }}>FAQ</h2></SectionReveal>
          <div className="space-y-2">
            {event.faqs.map((faq, i) => (
              <SectionReveal key={i}>
                <div className="border-b transition-colors" style={{ borderColor: theme.colors.cardBorder }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-6 text-left flex justify-between items-center gap-4">
                    <span className="font-light" style={{ fontFamily: "var(--theme-display-font)" }}>{faq.q}</span>
                    <span className="text-xl transition-transform" style={{ color: theme.colors.accent, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                  </button>
                  {openFaq === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden"><p className="pb-6" style={{ color: theme.colors.textMuted }}>{faq.a}</p></motion.div>}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {showFooter && (
        <footer className="py-12 px-6 text-center" style={{ backgroundColor: theme.colors.bg, borderTop: `1px solid ${theme.colors.cardBorder}` }}>
          <p className="text-sm mb-2" style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}>Powered by Popup</p>
          <a href="/" className="text-sm font-medium tracking-wider uppercase transition-opacity hover:opacity-70" style={{ color: theme.colors.accent }}>Create your own event</a>
          <p className="text-xs tracking-widest uppercase mt-6" style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}>Design by Jenna Leigh West · The Forgotten Code</p>
        </footer>
      )}
    </div>
  );
}
