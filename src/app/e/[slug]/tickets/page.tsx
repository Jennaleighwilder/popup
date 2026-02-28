"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import type { EventData } from "@/types/event";

export default function TicketsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const tierParam = searchParams.get("tier");
  const tierIndex = tierParam ? parseInt(tierParam, 10) : 0;

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetch(`/api/events/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setEvent(data))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const tickets = event?.tickets ?? [];
  const selectedTier = tickets[Math.max(0, Math.min(tierIndex, tickets.length - 1))];
  const theme = themes[event?.theme as keyof typeof themes] || themes.atelier;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier || !form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          tierIndex: Math.max(0, Math.min(tierIndex, tickets.length - 1)),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone?.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No redirect URL");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.colors.bg }}>
        <div className="w-10 h-px animate-pulse" style={{ backgroundColor: theme.colors.accent }} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: theme.colors.bg }}>
        <h1 className="text-2xl font-light mb-4" style={{ fontFamily: "var(--theme-display-font)" }}>Event not found</h1>
        <Link href="/" className="px-6 py-3 font-medium tracking-wider uppercase" style={{ backgroundColor: theme.colors.accent, color: "white" }}>
          Back home
        </Link>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen py-16 px-6" style={{ backgroundColor: theme.colors.bg, fontFamily: "var(--theme-body-font)" }}>
        <div className="max-w-lg mx-auto">
          <Link href={`/e/${slug}#tickets`} className="text-sm uppercase tracking-wider mb-8 inline-block" style={{ color: theme.colors.textMuted }}>
            ← Back to event
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>
              {event.name}
            </h1>
            <p className="text-sm uppercase mb-12" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>
              {event.date} · {event.venue}
            </p>

            <div className="mb-12 p-6 border" style={{ borderColor: theme.colors.cardBorder, backgroundColor: theme.colors.card }}>
              <h2 className="text-lg font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>
                {selectedTier?.name}
              </h2>
              <p className="text-2xl font-light mb-2" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.accent }}>
                {selectedTier?.price === 0 ? "Free" : `$${selectedTier?.price}`}
              </p>
              <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>
                {selectedTier?.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {tickets.map((t, i) => (
                  <Link
                    key={i}
                    href={`/e/${slug}/tickets?tier=${i}`}
                    className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                      i === tierIndex ? "border-2" : "border"
                    }`}
                    style={{
                      borderColor: theme.colors.accent,
                      color: i === tierIndex ? "white" : theme.colors.text,
                      backgroundColor: i === tierIndex ? theme.colors.accent : "transparent",
                    }}
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-2"
                  style={{ borderColor: theme.colors.cardBorder, backgroundColor: theme.colors.card }}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-2"
                  style={{ borderColor: theme.colors.cardBorder, backgroundColor: theme.colors.card }}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "var(--theme-mono-font)", color: theme.colors.textMuted }}>
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-2"
                  style={{ borderColor: theme.colors.cardBorder, backgroundColor: theme.colors.card }}
                />
              </div>

              {error && (
                <p className="text-sm" style={{ color: theme.colors.pop || "#c00" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 font-medium tracking-wider uppercase transition-colors disabled:opacity-60"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: "white",
                  borderRadius: `${theme.buttonRadius}px`,
                }}
              >
                {submitting ? "Processing…" : selectedTier?.price === 0 ? "Confirm" : "Pay & confirm"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </ThemeProvider>
  );
}
