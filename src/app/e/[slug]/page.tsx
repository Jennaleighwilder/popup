"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { EventPreview } from "@/components/EventPreview";
import { themes } from "@/lib/themes";
import { getDemoEvent } from "@/lib/demoEvents";
import type { EventData } from "@/types/event";

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const demo = getDemoEvent(slug);
    if (demo) {
      setEvent(demo);
      setLoading(false);
      return;
    }
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
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="w-10 h-px animate-pulse bg-[#C4956A]" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#FAF7F2]">
        <h1 className="text-2xl font-light mb-4 text-[#1A1714]">Event not found</h1>
        <Link href="/" className="px-6 py-3 font-medium tracking-wider uppercase bg-[#C4956A] text-white hover:bg-[#A67B52]">
          Back home
        </Link>
      </div>
    );
  }

  const theme = themes[(event.theme || "atelier") as keyof typeof themes] || themes.atelier;

  return (
    <ThemeProvider theme={theme}>
      <EventPreview event={event} showFooter={true} />
    </ThemeProvider>
  );
}
