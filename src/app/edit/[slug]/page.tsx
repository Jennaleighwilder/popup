"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Calendar,
  Ticket,
  Palette,
  Settings,
  ExternalLink,
} from "lucide-react";
import { EventPreview } from "@/components/EventPreview";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import { getDraftEvent, saveDraftEvent } from "@/lib/eventStorage";
import type { EventData } from "@/types/event";

const TABS = [
  { id: "content", label: "Content", Icon: FileText },
  { id: "hosts", label: "Hosts", Icon: Users },
  { id: "program", label: "Program", Icon: Calendar },
  { id: "tickets", label: "Tickets", Icon: Ticket },
  { id: "design", label: "Design", Icon: Palette },
  { id: "settings", label: "Settings", Icon: Settings },
];

const THEME_IDS = ["atelier", "harvest", "gallery", "botanica", "soiree", "brutalist", "zen", "maximalist", "neon", "vintage"] as const;

function useDebouncedSave(
  event: EventData | null,
  slug: string,
  delayMs: number
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevRef = useRef<string>("");

  useEffect(() => {
    if (!event || event.slug !== slug) return;
    const json = JSON.stringify(event);
    if (json === prevRef.current) return;
    prevRef.current = json;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      saveDraftEvent(event);
      timerRef.current = null;
    }, delayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [event, slug, delayMs]);
}

export default function EditPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [event, setEvent] = useState<EventData | null>(null);
  const [tab, setTab] = useState("content");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useDebouncedSave(event, slug, 2000);

  const loadEvent = useCallback(async () => {
    const draft = getDraftEvent(slug);
    if (draft) {
      setEvent(draft);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/events/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
      } else {
        setError("Event not found. Create one first.");
      }
    } catch {
      setError("Could not load event.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  const update = useCallback((patch: Partial<EventData>) => {
    setEvent((e) => (e ? { ...e, ...patch } : null));
  }, []);

  const updateField = useCallback(
    (key: keyof EventData, value: unknown) => {
      update({ [key]: value });
    },
    [update]
  );

  const updateHighlight = useCallback(
    (i: number, field: "title" | "desc", value: string) => {
      setEvent((e) => {
        if (!e) return null;
        const h = [...(e.highlights || [])];
        if (!h[i]) h[i] = { title: "", desc: "" };
        h[i] = { ...h[i], [field]: value };
        return { ...e, highlights: h };
      });
    },
    []
  );

  const updateHost = useCallback(
    (i: number, field: "name" | "role" | "bio", value: string) => {
      setEvent((e) => {
        if (!e) return null;
        const h = [...(e.hosts || [])];
        if (!h[i]) h[i] = { name: "", role: "", bio: "", image: "" };
        h[i] = { ...h[i], [field]: value };
        return { ...e, hosts: h };
      });
    },
    []
  );

  const updateScheduleItem = useCallback(
    (i: number, field: "time" | "title", value: string) => {
      setEvent((e) => {
        if (!e) return null;
        const s = [...(e.schedule || [])];
        if (!s[i]) s[i] = { time: "", title: "" };
        s[i] = { ...s[i], [field]: value };
        return { ...e, schedule: s };
      });
    },
    []
  );

  const updateTicket = useCallback(
    (i: number, field: "name" | "price" | "desc", value: string | number) => {
      setEvent((e) => {
        if (!e) return null;
        const t = [...(e.tickets || [])];
        if (!t[i]) t[i] = { name: "", price: 0, desc: "" };
        t[i] = { ...t[i], [field]: typeof value === "string" ? value : value };
        return { ...e, tickets: t };
      });
    },
    []
  );

  const updateFaq = useCallback(
    (i: number, field: "q" | "a", value: string) => {
      setEvent((e) => {
        if (!e) return null;
        const f = [...(e.faqs || [])];
        if (!f[i]) f[i] = { q: "", a: "" };
        f[i] = { ...f[i], [field]: value };
        return { ...e, faqs: f };
      });
    },
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-10 h-px bg-[#C4956A] animate-pulse" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
        <div className="w-10 h-px bg-[#C4956A] mb-8" />
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-light text-[#1A1714] mb-4">
          {error || "Event not found"}
        </h1>
        <Link
          href="/create"
          className="px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase"
        >
          Create Event
        </Link>
        <div className="mt-6 flex flex-col gap-2">
          <Link href="/dashboard" className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]">
            ← Dashboard
          </Link>
          <Link href="/" className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]">
            ← Home
          </Link>
        </div>
      </div>
    );
  }

  const highlights = event.highlights ?? [];
  const hosts = event.hosts ?? [];
  const schedule = event.schedule ?? [];
  const tickets = event.tickets ?? [];
  const faqs = event.faqs ?? [];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex">
      {/* Left: Live preview 60% */}
      <div className="w-[60%] min-h-screen overflow-auto border-r border-[#E8E2D9]">
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E8E2D9] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]">
              ← Home
            </Link>
            <span className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578]">
              Live preview
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`/e/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714] flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Open
            </a>
            <Link
              href={`/publish/${slug}`}
              className="px-4 py-2 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52]"
            >
              Publish →
            </Link>
          </div>
        </div>
        <ThemeProvider theme={themes[event.theme as keyof typeof themes] || themes.atelier}>
          <EventPreview event={event} showFooter={true} />
        </ThemeProvider>
      </div>

      {/* Right: Edit panel 40% */}
      <div className="w-[40%] min-h-screen bg-[#FAF7F2] flex flex-col">
        <div className="border-b border-[#E8E2D9] px-4 py-3 flex gap-1 overflow-x-auto">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 font-[family-name:var(--font-body)] text-sm whitespace-nowrap transition-colors ${
                tab === id
                  ? "bg-[#E8E2D9] text-[#1A1714]"
                  : "text-[#8C8578] hover:text-[#1A1714]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {tab === "content" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
                  Event name
                </label>
                <input
                  type="text"
                  value={event.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E2D9] bg-white font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4956A]"
                />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
                  Tagline
                </label>
                <textarea
                  value={event.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-[#E8E2D9] bg-white font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4956A] resize-none"
                />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
                  Hero image URL
                </label>
                <input
                  type="url"
                  value={event.heroImage}
                  onChange={(e) => updateField("heroImage", e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E2D9] bg-white font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4956A]"
                />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-3">
                  Highlights
                </label>
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="p-4 border border-[#E8E2D9] bg-white space-y-2">
                      <input
                        type="text"
                        placeholder="Title"
                        value={highlights[i]?.title ?? ""}
                        onChange={(e) => updateHighlight(i, "title", e.target.value)}
                        className="w-full px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714]"
                      />
                      <textarea
                        placeholder="Description"
                        value={highlights[i]?.desc ?? ""}
                        onChange={(e) => updateHighlight(i, "desc", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714] resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-3">
                  FAQs
                </label>
                <div className="space-y-4">
                  {faqs.slice(0, 5).map((f, i) => (
                    <div key={i} className="p-4 border border-[#E8E2D9] bg-white space-y-2">
                      <input
                        type="text"
                        placeholder="Question"
                        value={f.q}
                        onChange={(e) => updateFaq(i, "q", e.target.value)}
                        className="w-full px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714]"
                      />
                      <textarea
                        placeholder="Answer"
                        value={f.a}
                        onChange={(e) => updateFaq(i, "a", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714] resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "hosts" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-3">
                  Hosts
                </label>
                <div className="space-y-4">
                  {hosts.length === 0 ? (
                    <p className="font-[family-name:var(--font-body)] text-sm text-[#8C8578]">
                      No hosts. Add one below.
                    </p>
                  ) : (
                    hosts.map((h, i) => (
                      <div key={i} className="p-4 border border-[#E8E2D9] bg-white space-y-2">
                        <input
                          type="text"
                          placeholder="Name"
                          value={h.name}
                          onChange={(e) => updateHost(i, "name", e.target.value)}
                          className="w-full px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714]"
                        />
                        <input
                          type="text"
                          placeholder="Role"
                          value={h.role}
                          onChange={(e) => updateHost(i, "role", e.target.value)}
                          className="w-full px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714]"
                        />
                        <textarea
                          placeholder="Bio"
                          value={h.bio}
                          onChange={(e) => updateHost(i, "bio", e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714] resize-none"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "program" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-3">
                  Schedule
                </label>
                <div className="space-y-4">
                  {schedule.length === 0 ? (
                    <p className="font-[family-name:var(--font-body)] text-sm text-[#8C8578]">
                      No schedule items.
                    </p>
                  ) : (
                    schedule.map((s, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Time"
                          value={s.time}
                          onChange={(e) => updateScheduleItem(i, "time", e.target.value)}
                          className="w-24 px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714]"
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          value={s.title}
                          onChange={(e) => updateScheduleItem(i, "title", e.target.value)}
                          className="flex-1 px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714]"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "tickets" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-3">
                  Ticket tiers
                </label>
                <div className="space-y-4">
                  {tickets.map((t, i) => (
                    <div key={i} className="p-4 border border-[#E8E2D9] bg-white space-y-2">
                      <input
                        type="text"
                        placeholder="Tier name"
                        value={t.name}
                        onChange={(e) => updateTicket(i, "name", e.target.value)}
                        className="w-full px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714]"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Price"
                          value={t.price}
                          onChange={(e) =>
                            updateTicket(i, "price", parseInt(e.target.value, 10) || 0)
                          }
                          className="w-24 px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714]"
                        />
                        <input
                          type="text"
                          placeholder="Description"
                          value={t.desc}
                          onChange={(e) => updateTicket(i, "desc", e.target.value)}
                          className="flex-1 px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#1A1714]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "design" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {THEME_IDS.map((tid) => {
                    const t = themes[tid];
                    return (
                      <button
                        key={tid}
                        onClick={() => updateField("theme", tid)}
                        className={`p-4 border text-left font-[family-name:var(--font-body)] text-sm transition-colors ${
                          event.theme === tid
                            ? "border-[#C4956A] bg-[#FAF7F2]"
                            : "border-[#E8E2D9] hover:border-[#C4956A]"
                        }`}
                      >
                        <span
                          className="inline-block w-4 h-4 rounded-full mr-2 align-middle"
                          style={{ backgroundColor: t.colors.accent }}
                        />
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
                  Venue
                </label>
                <input
                  type="text"
                  value={event.venue}
                  onChange={(e) => updateField("venue", e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E2D9] bg-white font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4956A]"
                />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={event.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E2D9] bg-white font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4956A]"
                />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={event.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E2D9] bg-white font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4956A]"
                />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={event.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  placeholder="e.g. March 15, 2025"
                  className="w-full px-4 py-3 border border-[#E8E2D9] bg-white font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4956A]"
                />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
                  Time
                </label>
                <input
                  type="text"
                  value={event.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E2D9] bg-white font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4956A]"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
