"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { CATEGORY_LABELS } from "@/types/event";
import type { EventData } from "@/types/event";

export function EventPreview({
  event,
  showFooter = true,
  isDemo = false,
}: {
  event: EventData;
  showFooter?: boolean;
  isDemo?: boolean;
}) {
  const theme = useTheme();
  const labels = CATEGORY_LABELS[event.category] || CATEGORY_LABELS.market;
  const highlights = event.highlights ?? [];
  const hosts = event.hosts ?? [];
  const schedule = event.schedule ?? [];
  const tickets = event.tickets ?? [];
  const faqs = event.faqs ?? [];
  const vendors = event.vendors ?? [];
  const menu = event.menu ?? [];
  const journey = event.journey ?? [];
  const whatsHappening = event.whatsHappening ?? [];
  const cardRadius = theme.cardRadius;
  const cardBorderWidth = theme.cardBorderWidth ?? 1;
  const tertiary = theme.colors.tertiary || theme.colors.accent;
  const secondary = theme.colors.secondary || theme.colors.accent;

  const sectionClass = `section-luxury ${theme.specialEffects?.extraWhitespace ? "py-[200px]" : "py-24"} px-6`;
  const cardClass = `card-hover-glow p-6 border bg-[var(--theme-card)] transition-all duration-[var(--theme-animation-duration)]`;
  const headingClass = theme.specialEffects?.uppercaseHeadings ? "uppercase tracking-wider" : "";
  const gradientAttr = theme.specialEffects?.gradientText;
  const imgClass = theme.specialEffects?.sepiaImages ? "theme-sepia-images" : "";
  const monoLabelClass = theme.specialEffects?.typewriterMono ? "font-[family-name:var(--theme-mono-font)]" : "";

  const SectionDivider = () => {
    if (theme.sectionDivider === "thick-line")
      return <hr className="border-t-[3px] border-[var(--theme-text)] my-0" style={{ borderColor: theme.colors.text }} />;
    if (theme.sectionDivider === "glow-line")
      return <hr className="border-t border-[var(--theme-accent)] my-0 opacity-50" style={{ boxShadow: `0 0 12px ${theme.colors.accent}` }} />;
    if (theme.sectionDivider === "brush-stroke")
      return <div className="h-px bg-[var(--theme-accent)] opacity-30 my-8 max-w-xs mx-auto" />;
    if (theme.sectionDivider === "ornament")
      return <div className="text-center py-8 text-[var(--theme-accent)] text-2xl opacity-60">✦</div>;
    if (theme.sectionDivider === "pattern")
      return <div className="h-4 bg-[var(--theme-bg-alt)] my-0 opacity-80" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 8px, var(--theme-accent) 8px, var(--theme-accent) 10px)" }} />;
    return <hr className="border-t border-[var(--theme-card-border)] my-0" />;
  };

  const Hero = () => {
    if (theme.heroStyle === "typographic") {
      return (
        <section className="min-h-[70vh] flex flex-col justify-center px-6 py-24">
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] ${headingClass}`} data-gradient-text={gradientAttr ? "" : undefined} style={{ fontFamily: "var(--theme-display-font)" }}>
            {event.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl opacity-80" style={{ color: theme.colors.textMuted }}>
            {event.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <span className={monoLabelClass} style={{ color: theme.colors.textMuted, fontSize: "0.875rem" }}>{event.date}</span>
            <span className={monoLabelClass} style={{ color: theme.colors.textMuted, fontSize: "0.875rem" }}>{event.time}</span>
            <span className={monoLabelClass} style={{ color: theme.colors.textMuted, fontSize: "0.875rem" }}>{event.venue}</span>
          </div>
        </section>
      );
    }
    if (theme.heroStyle === "minimal") {
      return (
        <section className="relative min-h-[50vh] flex flex-col justify-end px-6 py-16">
          {event.heroImage && (
            <div className={`absolute inset-0 ${imgClass}`}>
              <img src={event.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-85" />
            </div>
          )}
          <div className="relative z-10 max-w-2xl">
            <h1 className={`text-4xl md:text-5xl font-semibold ${headingClass}`} data-gradient-text={gradientAttr ? "" : undefined} style={{ fontFamily: "var(--theme-display-font)", color: theme.colors.text }}>
              {event.name}
            </h1>
            <p className="mt-4 text-lg" style={{ color: theme.colors.textMuted }}>{event.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm" style={{ color: theme.colors.textMuted }}>
              <span>{event.date}</span><span>{event.time}</span><span>{event.venue}</span>
            </div>
          </div>
        </section>
      );
    }
    if (theme.heroStyle === "collage") {
      return (
        <section className="relative min-h-[60vh] overflow-hidden px-6 py-16">
          {event.heroImage && (
            <div className={`absolute inset-0 ${imgClass}`}>
              <img src={event.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 flex flex-col justify-end min-h-[50vh]">
            <h1 className={`text-4xl md:text-6xl font-bold ${headingClass}`} data-gradient-text={gradientAttr ? "" : undefined} style={{ fontFamily: "var(--theme-display-font)", color: "white" }}>
              {event.name}
            </h1>
            <p className="mt-4 text-xl text-white/90">{event.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-white/80 text-sm">
              <span>{event.date}</span><span>{event.time}</span><span>{event.venue}</span>
            </div>
          </div>
        </section>
      );
    }
    return (
      <section className="relative min-h-[60vh] flex flex-col justify-end">
        {event.heroImage && (
          <div className={`absolute inset-0 ${imgClass}`}>
            <img src={event.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="relative z-10 px-6 py-16 max-w-4xl">
          <h1 className={`text-4xl md:text-6xl font-semibold ${headingClass}`} data-gradient-text={gradientAttr ? "" : undefined} style={{ fontFamily: "var(--theme-display-font)", color: "white" }}>
            {event.name}
          </h1>
          <p className="mt-4 text-xl text-white/90">{event.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-white/80">
            <span>{event.date}</span><span>{event.time}</span><span>{event.venue}</span><span>{event.city}</span>
          </div>
        </div>
      </section>
    );
  };

  const maxContentWidth = theme.specialEffects?.singleColumnLayout ? "max-w-[600px] mx-auto" : "max-w-4xl mx-auto";

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--theme-body-font)" }}>
      <Hero />
      <SectionDivider />

      {highlights.length > 0 && (
        <>
          <section className={sectionClass} style={{ backgroundColor: theme.colors.bg }}>
            <div className={maxContentWidth}>
              <h2 className={`text-2xl font-semibold mb-8 ${headingClass}`} data-gradient-text={gradientAttr ? "" : undefined} style={{ fontFamily: "var(--theme-display-font)", color: theme.colors.text }}>
                {labels.about}
              </h2>
              <div className={`grid gap-6 ${highlights.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className={cardClass}
                    style={{
                      borderRadius: cardRadius,
                      borderWidth: cardBorderWidth,
                      borderColor: theme.colors.cardBorder,
                    }}
                  >
                    <h3 className={`font-semibold text-lg ${headingClass}`} style={{ color: theme.colors.accent }}>{h.title}</h3>
                    <p className="mt-2 text-sm" style={{ color: theme.colors.textMuted }}>{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <SectionDivider />
        </>
      )}

      {(hosts.length > 0 || vendors.length > 0) && (
        <>
          <section className={sectionClass} style={{ backgroundColor: theme.colors.bgAlt }}>
            <div className={maxContentWidth}>
              <h2 className={`text-2xl font-semibold mb-8 ${headingClass}`} data-gradient-text={gradientAttr ? "" : undefined} style={{ fontFamily: "var(--theme-display-font)", color: theme.colors.text }}>
                {labels.people}
              </h2>
              {hosts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {hosts.map((h, i) => (
                    <div
                      key={i}
                      className={`flex gap-4 ${cardClass}`}
                      style={{ borderRadius: cardRadius, borderWidth: cardBorderWidth, borderColor: theme.colors.cardBorder }}
                    >
                      {h.image && (
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <img src={h.image} alt={h.name} className={`object-cover w-full h-full ${imgClass}`} width={80} height={80} />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold" style={{ color: theme.colors.text }}>{h.name}</h3>
                        <p className={`text-sm ${monoLabelClass}`} style={{ color: theme.colors.accent }}>{h.role}</p>
                        <p className="mt-2 text-sm" style={{ color: theme.colors.textMuted }}>{h.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {vendors.map((v, i) => (
                    <div
                      key={i}
                      className={cardClass}
                      style={{ borderRadius: cardRadius, borderWidth: cardBorderWidth, borderColor: theme.colors.cardBorder }}
                    >
                      {v.image && (
                        <div className="w-16 h-16 rounded overflow-hidden mb-3">
                          <img src={v.image} alt={v.name} className={`object-cover w-full h-full ${imgClass}`} width={64} height={64} />
                        </div>
                      )}
                      <h3 className="font-semibold" style={{ color: theme.colors.text }}>{v.name}</h3>
                      <p className={`text-sm ${monoLabelClass}`} style={{ color: theme.colors.textMuted }}>{v.category}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          <SectionDivider />
        </>
      )}

      {(schedule.length > 0 || menu.length > 0 || journey.length > 0 || whatsHappening.length > 0) && (
        <>
          <section className={sectionClass} style={{ backgroundColor: theme.colors.bg }}>
            <div className={maxContentWidth}>
              <h2 className={`text-2xl font-semibold mb-8 ${headingClass}`} data-gradient-text={gradientAttr ? "" : undefined} style={{ fontFamily: "var(--theme-display-font)", color: theme.colors.text }}>
                {labels.schedule}
              </h2>
              {schedule.length > 0 && (
                <div className="space-y-4">
                  {schedule.map((s, i) => (
                    <div key={i} className="flex gap-6 py-3 border-b" style={{ borderColor: theme.colors.cardBorder }}>
                      <span className={`font-medium ${monoLabelClass} w-24 flex-shrink-0`} style={{ color: theme.colors.accent }}>{s.time}</span>
                      <span style={{ color: theme.colors.text }}>{s.title}</span>
                    </div>
                  ))}
                </div>
              )}
              {menu.length > 0 && schedule.length === 0 && (
                <div className="space-y-4">
                  {menu.map((m, i) => (
                    <div key={i} className="flex justify-between py-3 border-b" style={{ borderColor: theme.colors.cardBorder }}>
                      <span style={{ color: theme.colors.text }}>{m.course}</span>
                      {m.pairing && <span className={monoLabelClass} style={{ color: theme.colors.textMuted }}>{m.pairing}</span>}
                    </div>
                  ))}
                </div>
              )}
              {journey.length > 0 && schedule.length === 0 && menu.length === 0 && (
                <div className="space-y-6">
                  {journey.map((j, i) => (
                    <div key={i} className={cardClass} style={{ borderRadius: cardRadius, borderWidth: cardBorderWidth, borderColor: theme.colors.cardBorder }}>
                      <h3 className="font-semibold" style={{ color: theme.colors.accent }}>{j.step}</h3>
                      <p className="mt-2" style={{ color: theme.colors.textMuted }}>{j.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {whatsHappening.length > 0 && schedule.length === 0 && menu.length === 0 && journey.length === 0 && (
                <ul className="space-y-2">
                  {whatsHappening.map((w, i) => (
                    <li key={i} className="flex items-center gap-2" style={{ color: theme.colors.text }}>
                      <span style={{ color: theme.colors.accent }}>•</span> {w}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
          <SectionDivider />
        </>
      )}

      {tickets.length > 0 && (
        <>
          <section id="tickets" className={sectionClass} style={{ backgroundColor: theme.colors.bgAlt }}>
            <div className={maxContentWidth}>
              <h2 className={`text-2xl font-semibold mb-8 ${headingClass}`} data-gradient-text={gradientAttr ? "" : undefined} style={{ fontFamily: "var(--theme-display-font)", color: theme.colors.text }}>
                {labels.tickets}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {tickets.map((t, i) => (
                  <div
                    key={i}
                    className={cardClass}
                    style={{ borderRadius: cardRadius, borderWidth: cardBorderWidth, borderColor: theme.colors.cardBorder }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold" style={{ color: theme.colors.text }}>{t.name}</h3>
                        <p className="text-sm mt-1" style={{ color: theme.colors.textMuted }}>{t.desc}</p>
                      </div>
                      <span className="font-semibold" style={{ color: theme.colors.accent }}>
                        {t.price === 0 ? "Free" : `€${t.price}`}
                      </span>
                    </div>
                    <Link
                      href={`#tickets`}
                      className={`mt-4 inline-block px-6 py-3 text-center text-sm font-medium transition-all duration-[var(--theme-animation-duration)] ${
                        theme.buttonStyle === "filled"
                          ? "bg-[var(--theme-text)] text-[var(--theme-bg)] hover:opacity-90"
                          : "border-2 border-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
                      }`}
                      style={{
                        borderRadius: theme.buttonRadius,
                        ...(theme.specialEffects?.glowEffects && { boxShadow: `0 0 20px ${theme.colors.accent}` }),
                      }}
                    >
                      Get tickets
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <SectionDivider />
        </>
      )}

      {faqs.length > 0 && (
        <section className={sectionClass} style={{ backgroundColor: theme.colors.bg }}>
          <div className={maxContentWidth}>
<h2 className={`text-2xl font-semibold mb-8 ${headingClass}`} data-gradient-text={gradientAttr ? "" : undefined} style={{ fontFamily: "var(--theme-display-font)", color: theme.colors.text }}>
                {labels.faq}
            </h2>
            <div className="space-y-6">
              {faqs.map((f, i) => (
                <div key={i} className="border-b pb-6" style={{ borderColor: theme.colors.cardBorder }}>
                  <h3 className="font-semibold mb-2" style={{ color: theme.colors.text }}>{f.q}</h3>
                  <p className="text-sm" style={{ color: theme.colors.textMuted }}>{f.a}</p>
                </div>
              ))}
            </div>
            {event.gettingThere && (
              <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: theme.colors.bgAlt, color: theme.colors.textMuted }}>
                <h3 className="font-semibold mb-2" style={{ color: theme.colors.text }}>Getting there</h3>
                <p className="text-sm">{event.gettingThere}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {isDemo && (
        <section className="py-16 px-6 text-center" style={{ backgroundColor: theme.colors.bgAlt }}>
          <p className="font-[family-name:var(--theme-body-font)] text-lg mb-6" style={{ color: theme.colors.text }}>
            Love this design?
          </p>
          <Link
            href={`/create?theme=${event.theme}`}
            className="inline-block px-8 py-4 font-medium tracking-wider uppercase transition-all duration-300"
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.bg,
              borderRadius: theme.buttonRadius,
            }}
          >
            Create your event with this design →
          </Link>
        </section>
      )}

      {showFooter && (
        <footer className="py-12 px-6 text-center" style={{ backgroundColor: theme.colors.bgAlt, color: theme.colors.textMuted, fontSize: "0.875rem" }}>
          <p>Powered by Popup</p>
        </footer>
      )}
    </div>
  );
}
