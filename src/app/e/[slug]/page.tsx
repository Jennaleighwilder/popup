"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { EventPreview } from "@/components/EventPreview";
import { themes } from "@/lib/themes";
import type { ThemeId } from "@/lib/themes";
import { getDemoEvent, isDemoEvent } from "@/lib/demoEvents";
import type { EventData } from "@/types/event";

const VALID_THEME_IDS: ThemeId[] = ["atelier", "harvest", "gallery", "botanica", "soiree", "brutalist", "zen", "maximalist", "neon", "vintage"];

export default function EventPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  return <EventPageInner key={slug} slug={slug} searchParams={searchParams} />;
}

function EventPageInner({ slug, searchParams }: { slug: string; searchParams: URLSearchParams }) {
  const themeOverride = searchParams.get("theme");
  const effectiveThemeId = (themeOverride && VALID_THEME_IDS.includes(themeOverride as ThemeId) ? themeOverride : null) as ThemeId | null;
  const initialDemo = getDemoEvent(slug);
  const [event, setEvent] = useState<EventData | null>(initialDemo ?? null);
  const [loading, setLoading] = useState(!initialDemo);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getDemoEvent(slug)) return;
    fetch(`/api/events/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Event not found");
        return r.json();
      })
      .then((data) => {
        const ev: EventData = {
          slug: data.slug,
          name: data.name,
          tagline: data.tagline,
          category: data.category,
          theme: data.theme || "atelier",
          city: data.city,
          venue: data.venue,
          address: data.address,
          date: data.date,
          time: data.time,
          heroImage: data.heroImage || data.hero_image,
          venueImage: data.venueImage || data.venue_image || data.heroImage || data.hero_image,
          highlights: data.highlights ?? [],
          hosts: data.hosts ?? [],
          schedule: data.schedule ?? [],
          tickets: data.tickets ?? [],
          faqs: data.faqs ?? [],
          vendors: data.vendors,
          menu: data.menu,
          journey: data.journey,
          whatsHappening: data.whatsHappening,
          gettingThere: data.gettingThere,
        };
        setEvent(ev);
      })
      .catch(() => setError("Event not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--background)" }}>
        <div className="w-10 h-px animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light mb-4" style={{ color: "var(--foreground)" }}>Event not found</h1>
        <Link href="/" className="px-6 py-3 font-medium tracking-wider uppercase text-white" style={{ backgroundColor: "var(--accent)" }}>
          Back home
        </Link>
      </div>
    );
  }

  const theme = themes[(effectiveThemeId || event.theme || "atelier") as keyof typeof themes] || themes.atelier;

  return (
    <ThemeProvider theme={theme}>
      <EventPreview
        event={event}
        showFooter={true}
        isDemo={isDemoEvent(slug)}
        themeOverride={effectiveThemeId}
      />
    </ThemeProvider>
  );
}
