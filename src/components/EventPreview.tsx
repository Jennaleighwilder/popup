"use client";

import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { CATEGORY_LABELS } from "@/types/event";
import type { EventData } from "@/types/event";

const VENDOR_BORDER_COLORS: Record<string, string> = {
  ceramics: "#A0522D",
  skincare: "#5C7C50",
  knives: "#36454F",
  fashion: "#C7402D",
  food: "#8B4513",
  prints: "#1e3a5f",
  candles: "#D4A574",
  bakery: "#D4AF37",
};

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function getCtaLabel(category: string): string {
  const labels: Record<string, string> = {
    fashion: "Get Access",
    food: "Reserve Your Seat",
    art: "Visit",
    wellness: "Register",
    market: "Free Entry",
    music: "Get Tickets",
  };
  return labels[category] || "Get Tickets";
}

export function EventPreview({ event, showFooter = true, isDemo = false }: { event: EventData; showFooter?: boolean; isDemo?: boolean }) {
  const theme = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const ticketsRef = useRef<HTMLDivElement>(null);
  const cat = event.category || "music";
  const labels = CATEGORY_LABELS[cat] || CATEGORY_LABELS.music;

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setStickyVisible(latest > 400);
  });

  const ticketsInView = useInView(ticketsRef, { margin: "-150px" });

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/e/${event.slug}` : "";
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      if (navigator.share) {
        await navigator.share({ title: event.name, url: shareUrl, text: event.tagline });
      }
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(event.name);
    const location = [event.venue, event.address, event.city].filter(Boolean).join(", ");
    const details = encodeURIComponent(`${event.tagline}\n\n${event.venue}\n${event.address || ""}\n${event.city}`);
    const start = event.date && event.time ? `${event.date.replace(/\s/g, "").replace(/(\d)([AP]M)/i, "$1:00 $2")}` : event.date || "";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${start}&details=${details}&location=${encodeURIComponent(location)}`;
    window.open(url, "_blank");
  };

  const heroGradient = cat === "music" ? "linear-gradient(to top, #0D0D0D 0%, transparent 40%)" : `linear-gradient(to top, ${theme.colors.bg} 0%, transparent 40%)`;

  const highlights = event.highlights ?? [];
  const hosts = event.hosts ?? [];
  const schedule = event.schedule ?? [];
  const tickets = event.tickets ?? [];
  const faqs = event.faqs ?? [];
  const menu = event.menu ?? [];
  const brands = event.brands ?? [];
  const shoppingRules = event.shoppingRules ?? [];
  const journey = event.journey ?? [];
  const vendors = event.vendors ?? [];

  const wrapperStyle: React.CSSProperties = {
    fontFamily: "var(--theme-body-font)",
    color: theme.colors.text,
    lineHeight: 1.7,
    ...(cat === "music" && {
      background: "linear-gradient(to bottom, #0D0D0D 0%, #1A1510 100%)",
      minHeight: "100vh",
    }),
  };

  return (
    <div className="min-h-screen" style={wrapperStyle}>
      {/* Nav - Popup wordmark */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <Link href="/" className="font-light italic" style={{ fontFamily: "var(--theme-display-font)", fontSize: "24px", color: theme.colors.text }}>
          Popup
        </Link>
      </nav>

      {/* Hero - Ken Burns, gradient overlay, typography */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 ken-burns">
          <Image src={event.heroImage} alt="" fill className="object-cover event-hero-image" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0" style={{ background: heroGradient }} />
        {cat === "wellness" && <div className="absolute inset-0 pointer-events-none wellness-hero-pattern" />}
        {cat === "music" && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#D4AF37]"
                style={{
                  left: `${15 + i * 20}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animation: `twinkle ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        )}
        <div className="relative z-10 px-6 md:px-12 pb-20 md:pb-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
          >
            <motion.h1
              className="font-light leading-tight mb-4 flex items-start gap-3"
              style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              {cat === "art" && <span className="w-2 h-2 rounded-full shrink-0 mt-4" style={{ backgroundColor: "#E63946" }} />}
              {event.name}
            </motion.h1>
            <motion.p className="text-lg md:text-xl mb-6 max-w-2xl" style={{ color: theme.colors.textMuted }} transition={{ delay: 0.2 }}>
              {event.tagline}
            </motion.p>
            {event.scarcityMessage && (
              <motion.p
                className={`text-sm uppercase mb-4 scarcity-pulse ${cat === "fashion" ? "" : ""}`}
                style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.accent, letterSpacing: "0.15em" }}
                transition={{ delay: 0.3 }}
              >
                {event.scarcityMessage}
              </motion.p>
            )}
            <motion.p
              className="text-sm uppercase mb-8"
              style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted, letterSpacing: "0.1em" }}
              transition={{ delay: 0.4 }}
            >
              {event.date} · {event.venue} · {event.city}
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" transition={{ delay: 0.5 }}>
              <a
                href="#tickets"
                className="px-8 py-4 text-white font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(26,23,20,0.12)]"
                style={{ backgroundColor: theme.colors.accent, borderRadius: `${theme.buttonRadius}px` }}
              >
                {getCtaLabel(cat)} →
              </a>
              <a href="#experience" className="px-8 py-4 font-medium tracking-wider uppercase transition-colors" style={{ color: theme.colors.text }}>
                Learn More ↓
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gradient transition zone */}
      <div className="h-20" style={{ background: cat === "music" ? "linear-gradient(to bottom, transparent, #1A1510)" : `linear-gradient(to bottom, transparent, ${theme.colors.bgAlt})` }} />

      {/* Sticky ticket CTA - appears after hero, hides when tickets in view */}
      {stickyVisible && !ticketsInView && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="fixed bottom-0 left-0 right-0 z-40 h-[60px] flex items-center justify-between px-6 backdrop-blur-md border-t"
          style={{
            backgroundColor: `${theme.colors.bg}ee`,
            borderColor: theme.colors.cardBorder,
          }}
        >
          <p className="truncate max-w-[50%] font-light" style={{ fontFamily: "var(--theme-display-font)", fontSize: "1rem" }}>
            {event.name}
          </p>
          <a
            href="#tickets"
            className="px-6 py-3 font-medium tracking-wider uppercase shrink-0"
            style={{ backgroundColor: theme.colors.accent, color: cat === "music" ? "#0D0D0D" : "white", borderRadius: `${theme.buttonRadius}px` }}
          >
            {getCtaLabel(cat)} →
          </a>
        </motion.div>
      )}

      {/* About / Highlights */}
      <section id="experience" className={`px-6 ${cat === "art" ? "py-[140px]" : "section-luxury"}`} style={{ backgroundColor: theme.colors.bgAlt }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal><h2 className="font-light mb-16" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2rem, 4vw, 4rem)", ...(cat === "music" && { background: "linear-gradient(135deg, #D4AF37, #F5E6A3, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }) }}>{labels.about}</h2></SectionReveal>
          <div className={`grid grid-cols-1 gap-8 ${cat === "music" ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {highlights.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <div className="p-8 h-full transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(26,23,20,0.08)]" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: `${theme.cardRadius}px`, ...(cat === "wellness" && { borderLeft: "4px solid #5C7C50" }), ...(cat === "music" && { borderColor: "rgba(212,175,55,0.25)", borderLeft: "3px solid #D4AF37" }), ...(cat === "food" && { borderLeft: "4px solid #722F37" }) }}>
                  <div className="w-10 h-px mb-6" style={{ backgroundColor: cat === "wellness" ? "#5C7C50" : cat === "food" ? "#722F37" : theme.colors.accent }} />
                  <h3 className="text-xl font-light mb-3" style={{ fontFamily: "var(--theme-display-font)" }}>{h.title}</h3>
                  <p className="max-w-[320px]" style={{ color: theme.colors.textMuted }}>{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fashion: Brand marquee - every 3rd in editorial red */}
      {cat === "fashion" && brands.length > 0 && (
        <section className="py-8 overflow-hidden border-y" style={{ backgroundColor: theme.colors.bg, borderColor: theme.colors.cardBorder }}>
          <div className="flex animate-drift gap-12 md:gap-16" style={{ width: "max-content" }}>
            {[...brands, ...brands].map((b, i) => (
              <span
                key={i}
                className="px-4 font-light whitespace-nowrap"
                style={{
                  fontFamily: "var(--theme-display-font)",
                  fontSize: "clamp(1rem, 2vw, 1.5rem)",
                  color: i % 3 === 2 ? "#C7402D" : theme.colors.text,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* People: Hosts / Brands / Chef / Artist / Guide / Vendors */}
      {(hosts.length > 0 || (cat === "market" && vendors.length > 0)) && (
        <section className={`px-6 ${cat === "art" ? "py-[140px]" : "section-luxury"}`} style={{ backgroundColor: theme.colors.bg }}>
          <div className="max-w-[1200px] mx-auto">
            <SectionReveal>
              <div className="mb-16">
                {cat === "fashion" && (
                  <div className="w-10 h-0.5 mb-4 bg-[#C7402D]" />
                )}
                <h2
                  className="font-light"
                  style={{
                    fontFamily: "var(--theme-display-font)",
                    fontSize: "clamp(2rem, 4vw, 4rem)",
                    ...(cat === "music" && {
                      background: "linear-gradient(135deg, #D4AF37, #F5E6A3, #D4AF37)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }),
                  }}
                >
                  {labels.people}
                </h2>
              </div>
            </SectionReveal>
            {cat === "fashion" && brands.length > 0 ? (
              <div className="flex flex-wrap gap-6 md:gap-8">
                {brands.map((b, i) => (
                  <span
                    key={i}
                    className="px-8 py-4 border font-light transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      borderColor: theme.colors.cardBorder,
                      fontFamily: "var(--theme-display-font)",
                      fontSize: i % 3 === 0 ? "1.5rem" : i % 3 === 1 ? "1.25rem" : "1rem",
                      color: i % 3 === 2 ? "#C7402D" : theme.colors.text,
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            ) : cat === "market" && vendors.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {vendors.map((v, i) => {
                  const catKey = v.category.toLowerCase();
                  const borderColor = Object.keys(VENDOR_BORDER_COLORS).find((k) => catKey.includes(k))
                    ? VENDOR_BORDER_COLORS[Object.keys(VENDOR_BORDER_COLORS).find((k) => catKey.includes(k))!]
                    : theme.colors.accent;
                  return (
                    <SectionReveal key={i}>
                      <div
                        className="p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(26,23,20,0.12)]"
                        style={{
                          backgroundColor: theme.colors.card,
                          border: `2px solid ${borderColor}40`,
                          borderLeftWidth: "5px",
                          borderLeftColor: borderColor,
                          borderRadius: "12px",
                          boxShadow: `0 4px 20px ${borderColor}15`,
                        }}
                      >
                        <div className="w-20 h-20 mx-auto mb-4 relative rounded-full overflow-hidden" style={{ backgroundColor: theme.colors.cardBorder }}>
                          {v.image && <Image src={v.image} alt={v.name} fill className="object-cover" sizes="80px" />}
                        </div>
                        <h3 className="font-light" style={{ fontFamily: "var(--theme-display-font)" }}>{v.name}</h3>
                        <span
                          className="inline-block mt-2 px-2 py-0.5 text-xs rounded"
                          style={{ backgroundColor: `${borderColor}20`, color: borderColor }}
                        >
                          {v.category}
                        </span>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
            ) : (
              <div className={`grid gap-6 md:gap-8 ${hosts.length === 1 ? "max-w-2xl" : "grid-cols-2 md:grid-cols-3"}`}>
                {hosts.map((host, i) => (
                  <SectionReveal key={i} className={hosts.length === 1 ? "" : (i === 0 ? "md:col-span-2" : i === 4 ? "md:col-span-2" : "")}>
                    <div
                      className="group p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(26,23,20,0.08)] h-full"
                      style={{
                        backgroundColor: theme.colors.card,
                        border: `1px solid ${theme.colors.cardBorder}`,
                        borderRadius: `${theme.cardRadius}px`,
                        ...(cat === "food" && { borderLeft: "4px solid #A0522D" }),
                      }}
                    >
                      <div
                        className={`relative overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105 mb-4 aspect-square ${hosts.length === 1 ? "max-w-[200px]" : i === 0 || i === 4 ? "max-w-[200px]" : "max-w-[140px]"}`}
                        style={cat === "music" ? { border: "2px solid rgba(212,175,55,0.5)" } : {}}
                      >
                        <Image src={host.image} alt={host.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                      </div>
                      <h3 className="text-lg font-light" style={{ fontFamily: "var(--theme-display-font)" }}>{host.name}</h3>
                      <p className="text-sm mt-1" style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}>{host.role}</p>
                      <p className="text-sm mt-2" style={{ color: theme.colors.textMuted }}>{host.bio}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Artist bio (art only) - gallery press release style */}
      {cat === "art" && event.artistBio && (
        <section className="py-[140px] px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
          <div className="max-w-[560px] mx-auto">
            <SectionReveal>
              <div className="w-20 h-px mb-8" style={{ backgroundColor: theme.colors.text }} />
              <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>About the Collective</p>
              <p className="text-lg leading-[1.8]" style={{ fontFamily: "var(--theme-body-font)" }}>{event.artistBio}</p>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Schedule / Menu / Journey / What's Happening */}
      {(schedule.length > 0 || menu.length > 0 || journey.length > 0 || (cat === "market" && event.whatsHappening?.length)) && (
        <section className="section-luxury px-6" style={{ backgroundColor: cat === "food" ? "#F8F4EE" : cat === "wellness" ? "#F5F3EE" : cat === "market" ? "#F5F2EB" : cat === "music" ? "#1A1510" : theme.colors.bgAlt }}>
          <div className={cat === "food" ? "max-w-[640px] mx-auto" : "max-w-3xl mx-auto"}>
            <SectionReveal><h2 className="font-light mb-16" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2rem, 4vw, 4rem)", ...(cat === "food" && { color: "#722F37" }), ...(cat === "music" && { background: "linear-gradient(135deg, #D4AF37, #F5E6A3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }), ...(cat === "market" && { color: "#8B4513" }) }}>{labels.schedule}</h2></SectionReveal>
            {menu.length > 0 ? (
              <div className="py-12 px-8 md:py-16 md:px-12 rounded-sm" style={{ backgroundColor: "#FBF6EF", border: "2px solid #722F37", boxShadow: "0 8px 32px rgba(114,47,55,0.08)" }}>
                {menu.map((m, i) => (
                  <SectionReveal key={i}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 py-6 border-b last:border-b-0" style={{ borderColor: theme.colors.cardBorder }}>
                      <div>
                        <p className="font-light italic" style={{ fontFamily: "var(--theme-display-font)", fontSize: "1.25rem" }}>{m.course}</p>
                      </div>
                      {m.pairing && (
                        <p className="text-sm uppercase flex items-center gap-2" style={{ color: "#722F37", fontFamily: "var(--theme-mono-font)", letterSpacing: "0.15em" }}>
                          {m.pairing}
                        </p>
                      )}
                    </div>
                  </SectionReveal>
                ))}
              </div>
            ) : journey.length > 0 && cat === "wellness" ? (
              <div className="max-w-4xl mx-auto space-y-16">
                {journey.map((j, i) => (
                  <SectionReveal key={i}>
                    {i > 0 && (
                      <div className="flex justify-center py-8">
                        <div className="w-3 h-3 rounded-full breathe-pulse" style={{ backgroundColor: "#5C7C50" }} />
                      </div>
                    )}
                    <div className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                      {j.image && (
                        <div className="shrink-0 w-full md:w-[250px]">
                          <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                            <Image src={j.image} alt={j.step} fill className="object-cover" sizes="250px" />
                          </div>
                        </div>
                      )}
                      <div className="flex-1 relative">
                        <span className="absolute -top-2 -left-2 text-6xl font-light opacity-20" style={{ fontFamily: "var(--theme-display-font)", color: "#5C7C50" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-2xl font-light mb-4 relative" style={{ fontFamily: "var(--theme-display-font)" }}>{j.step}</h3>
                        <p className="text-lg leading-relaxed relative" style={{ color: theme.colors.textMuted }}>{j.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            ) : journey.length > 0 ? (
              <div className="max-w-[640px] space-y-12">
                {journey.map((j, i) => (
                  <SectionReveal key={i}>
                    <div className="flex gap-6 items-start">
                      {i > 0 && <div className="w-3 h-3 rounded-full breathe-pulse shrink-0 mt-2" style={{ backgroundColor: "#5C7C50" }} />}
                      <div className="flex-1 border-l-4 pl-6" style={{ borderColor: "rgba(92,124,80,0.4)" }}>
                        <h3 className="text-xl font-light mb-4" style={{ fontFamily: "var(--theme-display-font)" }}>{j.step}</h3>
                        <p className="text-lg leading-relaxed" style={{ color: theme.colors.textMuted }}>{j.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            ) : cat === "market" && event.whatsHappening ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.whatsHappening.map((w, i) => {
                  const colors = ["#A0522D", "#5C7C50", "#C7402D", "#8B4513", "#1e3a5f"];
                  const color = colors[i % colors.length];
                  return (
                    <div
                      key={i}
                      className="p-6 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                      style={{ backgroundColor: `${color}08`, borderLeft: `4px solid ${color}`, borderRadius: "8px", border: `1px solid ${color}20` }}
                    >
                      <span className="text-2xl font-light" style={{ fontFamily: "var(--theme-display-font)", color }}>✦</span>
                      <span className="font-light" style={{ fontFamily: "var(--theme-display-font)", color: theme.colors.text }}>{w}</span>
                    </div>
                  );
                })}
              </div>
            ) : schedule.length > 0 ? (
              <div className="relative">
                {schedule.map((item, i) => (
                  <SectionReveal key={i}>
                    <div className="flex gap-8 pb-12 last:pb-0">
                      <div
                        className="flex-shrink-0 w-24 text-sm"
                        style={{
                          fontFamily: "var(--theme-mono-font)",
                          color: cat === "music" ? "#D4AF37" : theme.colors.accent,
                        }}
                      >
                        {item.time}
                      </div>
                      <div className="flex-1 border-l-2 pl-8" style={{ borderColor: cat === "music" ? "#D4AF37" : theme.colors.accent }}>
                        <h3 className="text-lg font-light" style={{ fontFamily: "var(--theme-display-font)" }}>{item.title}</h3>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Music: Genre tags + testimonials */}
      {cat === "music" && (
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: "#1A1510" }}>
          <div className="max-w-4xl mx-auto space-y-16">
            {event.genreTags && event.genreTags.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-8" style={{ fontFamily: "var(--theme-mono-font)", color: "#D4AF37" }}>The Sound</h3>
                <div className="flex flex-wrap gap-3">
                  {event.genreTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 font-light transition-all duration-300 hover:scale-105"
                      style={{ border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37", fontFamily: "var(--theme-display-font)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {event.testimonials && event.testimonials.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-8" style={{ fontFamily: "var(--theme-mono-font)", color: "#D4AF37" }}>What People Say</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {event.testimonials.map((t, i) => (
                    <div key={i} className="p-6 rounded border-l-2" style={{ backgroundColor: "rgba(212,175,55,0.06)", borderColor: "#D4AF37" }}>
                      <p className="text-base font-light italic mb-4" style={{ fontFamily: "var(--theme-display-font)", color: theme.colors.text }}>&ldquo;{t.quote}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        {t.image && (
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                            <Image src={t.image} alt="" width={40} height={40} className="object-cover w-full h-full" />
                          </div>
                        )}
                        {t.author && <p className="text-sm" style={{ color: theme.colors.textMuted }}>{t.author}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Exhibition dates (art) - generous letter-spacing */}
      {cat === "art" && event.exhibitionDates && (
        <section className="py-[140px] px-6" style={{ backgroundColor: theme.colors.bg }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>{event.exhibitionDates}</p>
          </div>
        </section>
      )}

      {/* Featured works (art) - gallery wall layout */}
      {cat === "art" && event.featuredWorks && event.featuredWorks.length > 0 && (
        <section className="py-[140px] px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
          <div className="max-w-6xl mx-auto">
            <SectionReveal><h2 className="text-3xl md:text-4xl font-light mb-20" style={{ fontFamily: "var(--theme-display-font)" }}>Featured Works</h2></SectionReveal>
            <div className="flex flex-wrap gap-8 md:gap-12 items-start justify-center md:justify-start">
              {event.featuredWorks.map((w, i) => {
                const widths = [500, 350, 280];
                const wpx = widths[i] || 350;
                return (
                  <SectionReveal key={i}>
                    <div
                      className="art-gallery-work transition-all duration-300 cursor-default"
                      style={{
                        width: "100%",
                        maxWidth: `${wpx}px`,
                        padding: "16px",
                        backgroundColor: "#fff",
                        border: "1px solid #E0E0E0",
                      }}
                    >
                      <div className="relative aspect-[6/5] overflow-hidden mb-4">
                        {w.image && <Image src={w.image} alt={w.title} fill className="object-cover" sizes={`${wpx}px`} />}
                      </div>
                      <p className="font-light italic text-lg mb-1" style={{ fontFamily: "var(--theme-display-font)" }}>{w.title}</p>
                      {(w.medium || w.dimensions) && (
                        <p className="text-sm mb-1" style={{ color: theme.colors.textMuted }}>{[w.medium, w.dimensions].filter(Boolean).join(" · ")}</p>
                      )}
                      {w.artist && <p className="text-sm" style={{ color: theme.colors.textMuted }}>{w.artist}</p>}
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related programming (art) - minimal timeline */}
      {cat === "art" && event.relatedProgramming && event.relatedProgramming.length > 0 && (
        <section className="py-[140px] px-6" style={{ backgroundColor: theme.colors.bg }}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-light mb-12" style={{ fontFamily: "var(--theme-display-font)" }}>Related Programming</h3>
            <div className="space-y-8">
              {event.relatedProgramming.map((r, i) => (
                <div key={i} className="pl-6 border-l-2" style={{ borderColor: theme.colors.text }}>
                  {r.when && <p className="font-bold text-lg mb-1" style={{ fontFamily: "var(--theme-display-font)", color: theme.colors.text }}>{r.when}</p>}
                  <p className="text-lg" style={{ color: theme.colors.textMuted }}>{r.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Food: What's included / not / dietary */}
      {cat === "food" && (
        <section className="py-16 px-6" style={{ backgroundColor: "#F5EFE7" }}>
          <div className="max-w-2xl mx-auto space-y-10">
            {event.whatsIncluded && event.whatsIncluded.length > 0 && (
              <div className="p-8 rounded-lg" style={{ backgroundColor: "#FFF8F5", borderLeft: "4px solid #722F37", boxShadow: "0 4px 20px rgba(114,47,55,0.06)" }}>
                <h3 className="text-sm tracking-widest uppercase mb-6" style={{ fontFamily: "var(--theme-mono-font)", color: "#722F37" }}>What&apos;s Included</h3>
                <ul className="space-y-3">
                  {event.whatsIncluded.map((w, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="font-medium" style={{ color: "#722F37" }}>✓</span> <span style={{ color: theme.colors.text }}>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {event.whatsNotIncluded && event.whatsNotIncluded.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>What&apos;s Not Included</h3>
                <ul className="space-y-2" style={{ color: theme.colors.textMuted }}>
                  {event.whatsNotIncluded.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}
            {event.dietaryNote && (
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>{event.dietaryNote}</p>
            )}
            {event.capacity && (
              <p className="text-sm tracking-widest uppercase" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>Limited to {event.capacity} guests</p>
            )}
          </div>
        </section>
      )}

      {/* Wellness: What to bring / provided / landscape / testimonials */}
      {cat === "wellness" && (
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bg }}>
          <div className="max-w-4xl mx-auto space-y-16">
            {event.whatToBring && event.whatToBring.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-8" style={{ fontFamily: "var(--theme-mono-font)", color: "#5C7C50" }}>What to Bring</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.whatToBring.map((w, i) => (
                    <div
                      key={i}
                      className="p-6 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
                      style={{ border: "1px solid rgba(92,124,80,0.5)", borderLeft: "4px solid #5C7C50", borderRadius: "8px" }}
                    >
                      <span className="text-sm font-light w-6" style={{ color: "#5C7C50", fontFamily: "var(--theme-mono-font)" }}>—</span>
                      <span className="font-light" style={{ fontFamily: "var(--theme-display-font)" }}>{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {event.whatsProvided && event.whatsProvided.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-8" style={{ fontFamily: "var(--theme-mono-font)", color: "#5C7C50" }}>What&apos;s Provided</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.whatsProvided.map((w, i) => (
                    <div
                      key={i}
                      className="p-6 transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: "linear-gradient(135deg, rgba(92,124,80,0.2) 0%, rgba(92,124,80,0.35) 100%)",
                        border: "2px solid #5C7C50",
                        borderRadius: "8px",
                        boxShadow: "0 4px 20px rgba(92,124,80,0.15)",
                      }}
                    >
                      <span className="font-medium" style={{ fontFamily: "var(--theme-display-font)", color: "#2d3a24" }}>{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {event.landscapeImages && event.landscapeImages.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-8" style={{ fontFamily: "var(--theme-mono-font)", color: "#5C7C50" }}>The Space</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {event.landscapeImages.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                      <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {event.testimonials && event.testimonials.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-8" style={{ fontFamily: "var(--theme-mono-font)", color: "#5C7C50" }}>What Guests Say</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {event.testimonials.map((t, i) => (
                    <div key={i} className="p-6 rounded-lg flex flex-col gap-4" style={{ backgroundColor: "#F0EBE0", borderLeft: "4px solid #5C7C50", borderTop: "1px solid rgba(92,124,80,0.3)" }}>
                      <p className="text-base font-light italic flex-1" style={{ fontFamily: "var(--theme-display-font)", color: "#5C7C50" }}>&ldquo;{t.quote}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        {t.image && (
                          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                            <Image src={t.image} alt="" width={48} height={48} className="object-cover w-full h-full" />
                          </div>
                        )}
                        {t.author && <p className="text-sm" style={{ color: theme.colors.textMuted }}>{t.author}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Fashion: Shopping rules - warm amber callout */}
      {cat === "fashion" && event.shoppingRules && event.shoppingRules.length > 0 && (
        <section className="py-12 px-6" style={{ backgroundColor: "#FFF8F0" }}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-sm tracking-widest uppercase mb-6" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>Shopping Rules</h3>
            <ul className="space-y-2">
              {event.shoppingRules.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </section>
      )}

      {/* Market: Getting there / Vendor application */}
      {cat === "market" && (
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bg }}>
          <div className="max-w-2xl mx-auto space-y-8">
            {event.gettingThere && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>Getting There</h3>
                <p>{event.gettingThere}</p>
              </div>
            )}
            {event.vendorApplication && (
              <div className="p-8 border-2 rounded-xl transition-all duration-300 hover:shadow-[0_12px_40px_rgba(139,69,19,0.15)]" style={{ borderColor: "#8B4513", background: "linear-gradient(135deg, #FFF8F0 0%, #FFF3E0 100%)", boxShadow: "0 8px 32px rgba(139,69,19,0.1)" }}>
                <h3 className="text-xl font-light mb-3" style={{ fontFamily: "var(--theme-display-font)", color: "#8B4513" }}>Want to Sell?</h3>
                <p className="mb-6" style={{ color: theme.colors.text }}>{event.vendorApplication}</p>
                <a
                  href={`mailto:hello@themakersmarket.com?subject=Market%20Vendor%20Application%20-%20${encodeURIComponent(event.name)}`}
                  className="inline-block px-8 py-4 font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: "#8B4513", color: "white", borderRadius: "8px", border: "2px solid #6B3410" }}
                >
                  Apply →
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Venue */}
      <section className="section-luxury px-6" style={{ backgroundColor: cat === "food" ? theme.colors.bgAlt : theme.colors.bg }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="w-full h-px mb-16" style={{ backgroundColor: theme.colors.accent }} />
          <SectionReveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
              <Image src={event.venueImage} alt={event.venue} fill className="object-cover event-hero-image" sizes="100vw" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12" style={{ background: `linear-gradient(to top, ${theme.colors.bg} 0%, transparent 60%)` }}>
                <h2 className="text-2xl md:text-4xl font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>{event.venue}</h2>
                <p className="text-sm mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>{event.address}</p>
                {event.address && <a href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium tracking-wider uppercase w-fit" style={{ color: theme.colors.accent }}>Get Directions →</a>}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Tickets */}
      <section id="tickets" ref={ticketsRef} className="section-luxury px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal><h2 className="font-light text-center mb-16" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2rem, 4vw, 4rem)" }}>{labels.tickets}</h2></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tickets.map((ticket, i) => (
              <SectionReveal key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`p-8 h-full flex flex-col transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(26,23,20,0.08)] ${cat === "music" ? "event-card-music" : ""}`}
                  style={{
                    backgroundColor: theme.colors.card,
                    border: `1px solid ${theme.colors.cardBorder}`,
                    borderRadius: `${theme.cardRadius}px`,
                    ...(cat === "music" && { borderColor: "rgba(212,175,55,0.15)" }),
                  }}
                >
                  <h3 className="text-xl font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>{ticket.name}</h3>
                  <p className="text-2xl font-light mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.accent }}>{ticket.price === 0 ? "Free" : `$${ticket.price}`}</p>
                  <p className="text-sm mb-6 flex-1" style={{ color: theme.colors.textMuted }}>{ticket.desc}</p>
                  <Link
                    href={`/e/${event.slug}/tickets?tier=${i}`}
                    className="inline-block text-center py-3 font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(26,23,20,0.08)]"
                    style={{
                      ...(cat === "art" ? { backgroundColor: theme.colors.text, color: "#fff", border: "2px solid transparent" } : { border: `2px solid ${theme.colors.accent}`, color: theme.colors.text }),
                      borderRadius: `${theme.buttonRadius}px`,
                    }}
                  >
                    {cat === "art" && ticket.price === 0 ? "RSVP" : "Select"} →
                  </Link>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Share & Save */}
      {showFooter && (
        <section className="py-12 px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-sm tracking-widest uppercase mb-6" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>Share & Save</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleAddToCalendar}
                className="flex items-center gap-2 px-6 py-3 border font-medium tracking-wider uppercase transition-colors hover:border-[#C4956A]"
                style={{ borderColor: theme.colors.cardBorder }}
              >
                Add to Calendar
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 border font-medium tracking-wider uppercase transition-colors hover:border-[#C4956A]"
                style={{ borderColor: theme.colors.cardBorder }}
              >
                {shareCopied ? "✓ Copied!" : "Share"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-luxury px-6" style={{ backgroundColor: theme.colors.bg }}>
        <div className="max-w-[640px] mx-auto">
          <SectionReveal><h2 className="font-light mb-16" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2rem, 4vw, 4rem)" }}>{labels.faq}</h2></SectionReveal>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
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
          {isDemo && (
            <div className="mb-8">
              <p className="font-[family-name:var(--theme-body-font)] text-lg mb-6" style={{ color: theme.colors.text }}>
                Love this design?
              </p>
              <Link
                href={`/create?theme=${event.theme}`}
                className="inline-block px-8 py-4 font-medium tracking-wider uppercase transition-all duration-300"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.bg,
                  borderRadius: `${theme.buttonRadius}px`,
                }}
              >
                Create your event with this design →
              </Link>
            </div>
          )}
          <p className="text-sm mb-2" style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}>Powered by Popup</p>
          <Link href="/" className="text-sm font-medium tracking-wider uppercase transition-opacity hover:opacity-70" style={{ color: theme.colors.accent }}>Create your own event</Link>
          <p className="text-xs tracking-widest uppercase mt-6" style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}>Design by Jenna Leigh West · The Forgotten Code</p>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="block mt-4 text-xs uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>Back to top ↑</a>
        </footer>
      )}
    </div>
  );
}
