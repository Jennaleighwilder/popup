"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import { EventPreview } from "@/components/EventPreview";
import { getDraftEvent } from "@/lib/eventStorage";
import type { EventData } from "@/types/event";

const DEMO_EVENT: EventData = {
  slug: "the-edit-spring-sample-sale",
  name: "The Edit — Spring Sample Sale",
  tagline: "Three days of designer fashion at up to 70% off",
  category: "fashion",
  theme: "atelier",
  city: "New York",
  venue: "The Loft on Spring",
  address: "161 Spring Street, SoHo",
  date: "May 15-17, 2026",
  time: "10:00 AM - 7:00 PM",
  heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop",
  venueImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=800&fit=crop",
  highlights: [
    { title: "Curated Designers", desc: "40+ independent designers from NYC, LA, and London" },
    { title: "Personal Styling", desc: "Book a 30-minute session with our in-house stylists" },
    { title: "Cocktails & Music", desc: "Live DJ sets and a complimentary prosecco bar" },
  ],
  hosts: [
    { name: "Maison Noir", role: "Featured Designer", bio: "Independent luxury from NYC.", image: "https://ui-avatars.com/api/?name=Maison+Noir&size=200&background=C4956A&color=ffffff" },
    { name: "Webb Gallery", role: "Featured Designer", bio: "Curator and collector of contemporary fashion.", image: "https://ui-avatars.com/api/?name=Webb+Gallery&size=200&background=8C8578&color=ffffff" },
  ],
  schedule: [],
  brands: ["Maison Noir", "Webb Gallery", "Park Studio", "Rivera Atelier", "Zimmermann", "Tom Ford"],
  shoppingRules: ["All sales final", "No try-ons", "Cash & card accepted", "No large bags or strollers"],
  scarcityMessage: "Limited quantities · First come, first served",
  tickets: [
    { name: "General Admission", price: 0, desc: "Access to all three days" },
    { name: "VIP Preview", price: 45, desc: "Early access + styling session + gift bag" },
    { name: "Collector's Pass", price: 95, desc: "All VIP perks + private designer dinner" },
  ],
  faqs: [
    { q: "What is the dress code?", a: "Smart casual. We encourage expressing your personal style." },
    { q: "Is parking available?", a: "Street parking and nearby garages. We recommend rideshare." },
    { q: "Can I bring a guest?", a: "General Admission includes one guest. VIP tiers include two." },
    { q: "Are refunds available?", a: "All sales final. No returns or exchanges." },
    { q: "Will there be food?", a: "Light bites and prosecco. Lunch break has nearby options." },
  ],
};

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setEvent(data);
          return;
        }
        const draft = getDraftEvent(slug);
        if (draft) {
          setEvent(draft);
          return;
        }
        if (slug === "the-edit-spring-sample-sale") {
          setEvent(DEMO_EVENT);
        }
      })
      .catch(() => {
        const draft = getDraftEvent(slug);
        if (draft) setEvent(draft);
        else if (slug === "the-edit-spring-sample-sale") setEvent(DEMO_EVENT);
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
