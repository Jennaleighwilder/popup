"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import { EventPreview } from "@/components/EventPreview";
import { getDraftEvent } from "@/lib/eventStorage";
import { DEMO_EVENTS } from "@/lib/demoEvents";
import type { EventData } from "@/types/event";

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check demo events first (no network call)
    const demoEvent = DEMO_EVENTS[slug];
    if (demoEvent) {
      setEvent(demoEvent);
      setLoading(false);
      return;
    }

    fetch(`/api/events/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setEvent(data);
          return;
        }
        const draft = getDraftEvent(slug);
        if (draft) setEvent(draft);
      })
      .catch(() => {
        const draft = getDraftEvent(slug);
        if (draft) setEvent(draft);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-10 h-px bg-[#C4956A] animate-pulse" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-light text-[#1A1714] mb-4">
          Event not found
        </h1>
        <a href="/" className="px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase">
          Back home
        </a>
      </div>
    );
  }

  const theme = themes[event.theme as keyof typeof themes] || themes.atelier;

  return (
    <ThemeProvider theme={theme}>
      <EventPreview event={event} showFooter={true} />
    </ThemeProvider>
  );
}
