"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import { CATEGORY_LABELS } from "@/types/event";
import type { EventData } from "@/types/event";

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

export function EventPreview({ event, showFooter = true }: { event: EventData; showFooter?: boolean }) {
  const theme = themes[event.theme as keyof typeof themes] || themes.atelier;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const cat = event.category || "music";
  const labels = CATEGORY_LABELS[cat] || CATEGORY_LABELS.music;

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

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--theme-body-font)", color: theme.colors.text, lineHeight: 1.7 }}>
      {/* Hero - full bleed, magazine cover typography */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 ken-burns">
          <Image src={event.heroImage} alt="" fill className="object-cover event-hero-image" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${theme.colors.bg} 0%, transparent 50%)` }} />
        <div className="relative z-10 px-6 md:px-12 pb-20 md:pb-24 max-w-4xl">
          <h1 className="font-light leading-tight mb-4" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            {event.name}
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl" style={{ color: theme.colors.textMuted }}>{event.tagline}</p>
          {event.scarcityMessage && (
            <p className="text-sm uppercase mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.accent, letterSpacing: "0.15em" }}>
              {event.scarcityMessage}
            </p>
          )}
          <p className="text-sm uppercase mb-8" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted, letterSpacing: "0.2em" }}>
            {event.date} · {event.venue} · {event.city}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#tickets" className="px-8 py-4 text-white font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(26,23,20,0.12)]" style={{ backgroundColor: theme.colors.accent, borderRadius: `${theme.buttonRadius}px` }}>
              {getCtaLabel(cat)} →
            </a>
            <a href="#experience" className="px-8 py-4 font-medium tracking-wider uppercase transition-colors" style={{ color: theme.colors.text }}>Learn More ↓</a>
          </div>
        </div>
      </section>

      {/* About / Highlights */}
      <section id="experience" className="section-luxury px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal><h2 className="font-light mb-16" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2rem, 4vw, 4rem)" }}>{labels.about}</h2></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <div className="p-8 h-full transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(26,23,20,0.08)]" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: `${theme.cardRadius}px` }}>
                  <div className="w-10 h-px mb-6" style={{ backgroundColor: theme.colors.accent }} />
                  <h3 className="text-xl font-light mb-3" style={{ fontFamily: "var(--theme-display-font)" }}>{h.title}</h3>
                  <p className="max-w-[320px]" style={{ color: theme.colors.textMuted }}>{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fashion: Brand marquee - lookbook style */}
      {cat === "fashion" && brands.length > 0 && (
        <section className="py-8 overflow-hidden border-y" style={{ backgroundColor: theme.colors.bg, borderColor: theme.colors.cardBorder }}>
          <div className="flex animate-drift gap-12 md:gap-16" style={{ width: "max-content" }}>
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="px-4 font-light whitespace-nowrap" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(1rem, 2vw, 1.5rem)" }}>{b}</span>
            ))}
          </div>
        </section>
      )}

      {/* People: Hosts / Brands / Chef / Artist / Guide / Vendors */}
      {hosts.length > 0 && (
        <section className="section-luxury px-6" style={{ backgroundColor: theme.colors.bg }}>
          <div className="max-w-[1200px] mx-auto">
            <SectionReveal><h2 className="font-light mb-16" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2rem, 4vw, 4rem)" }}>{labels.people}</h2></SectionReveal>
            {cat === "fashion" && brands.length > 0 ? (
              <div className="flex flex-wrap gap-6 md:gap-8">
                {brands.map((b, i) => (
                  <span key={i} className="px-8 py-4 border font-light transition-all duration-300 hover:scale-[1.02]" style={{ borderColor: theme.colors.cardBorder, fontFamily: "var(--theme-display-font)", fontSize: i % 3 === 0 ? "1.5rem" : i % 3 === 1 ? "1.25rem" : "1rem" }}>{b}</span>
                ))}
              </div>
            ) : cat === "market" && vendors.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {vendors.map((v, i) => (
                  <SectionReveal key={i}>
                    <div className="p-6 text-center transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(26,23,20,0.08)]" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: `${theme.cardRadius}px` }}>
                      <div className="w-20 h-20 mx-auto mb-4 relative rounded-full overflow-hidden" style={{ backgroundColor: theme.colors.cardBorder }}>
                        {v.image && <Image src={v.image} alt={v.name} fill className="object-cover" sizes="80px" />}
                      </div>
                      <h3 className="font-light" style={{ fontFamily: "var(--theme-display-font)" }}>{v.name}</h3>
                      <p className="text-sm mt-1" style={{ color: theme.colors.textMuted }}>{v.category}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            ) : (
              <div className={`grid gap-6 md:gap-8 ${hosts.length === 1 ? "max-w-2xl" : "grid-cols-2 md:grid-cols-3"}`}>
                {hosts.map((host, i) => (
                  <SectionReveal key={i} className={hosts.length === 1 ? "" : (i === 0 ? "md:col-span-2" : i === 4 ? "md:col-span-2" : "")}>
                    <div className="group p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(26,23,20,0.08)] h-full" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: `${theme.cardRadius}px` }}>
                      <div className={`relative overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105 mb-4 aspect-square ${hosts.length === 1 ? "max-w-[200px]" : i === 0 || i === 4 ? "max-w-[200px]" : "max-w-[140px]"}`}>
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

      {/* Artist bio (art only) - gallery wall label feel */}
      {cat === "art" && event.artistBio && (
        <section className="section-luxury px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
          <div className="max-w-[640px] mx-auto">
            <SectionReveal>
              <p className="text-xl font-light leading-relaxed italic" style={{ fontFamily: "var(--theme-display-font)" }}>{event.artistBio}</p>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Schedule / Menu / Journey / What's Happening */}
      {(schedule.length > 0 || menu.length > 0 || journey.length > 0 || (cat === "market" && event.whatsHappening?.length)) && (
        <section className="section-luxury px-6" style={{ backgroundColor: cat === "food" ? theme.colors.bg : theme.colors.bgAlt }}>
          <div className={cat === "food" ? "max-w-[640px] mx-auto" : "max-w-3xl mx-auto"}>
            <SectionReveal><h2 className="font-light mb-16" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2rem, 4vw, 4rem)" }}>{labels.schedule}</h2></SectionReveal>
            {menu.length > 0 ? (
              <div className="py-12 px-8 md:py-16 md:px-12 rounded-sm" style={{ backgroundColor: "rgba(250,247,242,0.6)", border: `1px solid ${theme.colors.cardBorder}` }}>
                {menu.map((m, i) => (
                  <SectionReveal key={i}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 py-6 border-b last:border-b-0" style={{ borderColor: theme.colors.cardBorder }}>
                      <div>
                        <p className="font-light italic" style={{ fontFamily: "var(--theme-display-font)", fontSize: "1.25rem" }}>{m.course}</p>
                      </div>
                      {m.pairing && <p className="text-sm uppercase" style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)", letterSpacing: "0.15em" }}>{m.pairing}</p>}
                    </div>
                  </SectionReveal>
                ))}
              </div>
            ) : journey.length > 0 ? (
              <div className="max-w-[640px] space-y-12">
                {journey.map((j, i) => (
                  <SectionReveal key={i}>
                    <div>
                      <h3 className="text-xl font-light mb-4" style={{ fontFamily: "var(--theme-display-font)" }}>{j.step}</h3>
                      <p className="text-lg leading-relaxed" style={{ color: theme.colors.textMuted }}>{j.desc}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            ) : cat === "market" && event.whatsHappening ? (
              <div className="flex flex-wrap gap-4">
                {event.whatsHappening.map((w, i) => (
                  <span key={i} className="px-6 py-3 border" style={{ borderColor: theme.colors.cardBorder }}>{w}</span>
                ))}
              </div>
            ) : schedule.length > 0 ? (
              <div className="relative">
                {schedule.map((item, i) => (
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
            ) : null}
          </div>
        </section>
      )}

      {/* Exhibition dates (art) */}
      {cat === "art" && event.exhibitionDates && (
        <section className="py-12 px-6" style={{ backgroundColor: theme.colors.bg }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm tracking-widest uppercase" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>{event.exhibitionDates}</p>
          </div>
        </section>
      )}

      {/* Featured works (art) */}
      {cat === "art" && event.featuredWorks && event.featuredWorks.length > 0 && (
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
          <div className="max-w-6xl mx-auto">
            <SectionReveal><h2 className="text-3xl md:text-4xl font-light mb-16" style={{ fontFamily: "var(--theme-display-font)" }}>Featured Works</h2></SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {event.featuredWorks.map((w, i) => (
                <SectionReveal key={i}>
                  <div className="p-6" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}` }}>
                    <h3 className="font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>{w.title}</h3>
                    {w.desc && <p className="text-sm" style={{ color: theme.colors.textMuted }}>{w.desc}</p>}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related programming (art) */}
      {cat === "art" && event.relatedProgramming && event.relatedProgramming.length > 0 && (
        <section className="py-12 px-6" style={{ backgroundColor: theme.colors.bg }}>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-light mb-6" style={{ fontFamily: "var(--theme-display-font)" }}>Related Programming</h3>
            <div className="space-y-2">
              {event.relatedProgramming.map((r, i) => (
                <p key={i}><span className="font-medium">{r.title}</span>{r.when && <span style={{ color: theme.colors.textMuted }}> · {r.when}</span>}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Food: What's included / not / dietary */}
      {cat === "food" && (
        <section className="py-12 px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
          <div className="max-w-2xl mx-auto space-y-8">
            {event.whatsIncluded && event.whatsIncluded.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>What&apos;s Included</h3>
                <ul className="space-y-2">
                  {event.whatsIncluded.map((w, i) => <li key={i}>{w}</li>)}
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

      {/* Wellness: What to bring / provided / testimonials */}
      {cat === "wellness" && (
        <section className="py-20 md:py-28 px-6" style={{ backgroundColor: theme.colors.bg }}>
          <div className="max-w-2xl mx-auto space-y-12">
            {event.whatToBring && event.whatToBring.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>What to Bring</h3>
                <p>{event.whatToBring.join(" · ")}</p>
              </div>
            )}
            {event.whatsProvided && event.whatsProvided.length > 0 && (
              <div>
                <h3 className="text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>What&apos;s Provided</h3>
                <p>{event.whatsProvided.join(" · ")}</p>
              </div>
            )}
            {event.testimonials && event.testimonials.length > 0 && (
              <div className="border-l-2 pl-8" style={{ borderColor: theme.colors.accent }}>
                <p className="text-lg font-light italic mb-4" style={{ fontFamily: "var(--theme-display-font)" }}>&ldquo;{event.testimonials[0].quote}&rdquo;</p>
                {event.testimonials[0].author && <p className="text-sm" style={{ color: theme.colors.textMuted }}>{event.testimonials[0].author}</p>}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Fashion: Shopping rules */}
      {cat === "fashion" && event.shoppingRules && event.shoppingRules.length > 0 && (
        <section className="py-12 px-6" style={{ backgroundColor: theme.colors.bg }}>
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
              <div className="p-6 border" style={{ borderColor: theme.colors.accent }}>
                <h3 className="text-lg font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>Want to Sell?</h3>
                <p style={{ color: theme.colors.textMuted }}>{event.vendorApplication}</p>
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
      <section id="tickets" className="section-luxury px-6" style={{ backgroundColor: theme.colors.bgAlt }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal><h2 className="font-light text-center mb-16" style={{ fontFamily: "var(--theme-display-font)", fontSize: "clamp(2rem, 4vw, 4rem)" }}>{labels.tickets}</h2></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tickets.map((ticket, i) => (
              <SectionReveal key={i}>
                <div className="p-8 h-full flex flex-col transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(26,23,20,0.08)]" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.cardBorder}`, borderRadius: `${theme.cardRadius}px` }}>
                  <h3 className="text-xl font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>{ticket.name}</h3>
                  <p className="text-2xl font-light mb-4" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.accent }}>{ticket.price === 0 ? "Free" : `$${ticket.price}`}</p>
                  <p className="text-sm mb-6 flex-1" style={{ color: theme.colors.textMuted }}>{ticket.desc}</p>
                  <Link href={`/e/${event.slug}/tickets?tier=${i}`} className="inline-block text-center py-3 font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(26,23,20,0.08)]" style={{ border: `2px solid ${theme.colors.accent}`, borderRadius: `${theme.buttonRadius}px`, color: theme.colors.text }}>Select →</Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

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
          <p className="text-sm mb-2" style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}>Powered by Popup</p>
          <a href="/" className="text-sm font-medium tracking-wider uppercase transition-opacity hover:opacity-70" style={{ color: theme.colors.accent }}>Create your own event</a>
          <p className="text-xs tracking-widest uppercase mt-6" style={{ color: theme.colors.textMuted, fontFamily: "var(--theme-mono-font)" }}>Design by Jenna Leigh West · The Forgotten Code</p>
        </footer>
      )}
    </div>
  );
}
