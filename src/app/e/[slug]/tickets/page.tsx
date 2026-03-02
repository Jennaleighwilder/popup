"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { isDemoEvent, getDemoEvent } from "@/lib/demoEvents";
import { themes } from "@/lib/themes";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function EventTicketsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const tierParam = searchParams.get("tier");
  const rawTierIndex = tierParam ? parseInt(tierParam, 10) : 0;
  const tierIndex = Number.isFinite(rawTierIndex) && rawTierIndex >= 0 ? rawTierIndex : 0;

  const [event, setEvent] = useState<{ name?: string; slug?: string; theme?: string; tickets?: { name: string; price: number; desc: string }[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const demo = getDemoEvent(slug);
    if (demo) {
      setEvent({
        name: demo.name,
        slug: demo.slug,
        theme: demo.theme,
        tickets: demo.tickets,
      });
      setLoading(false);
      return;
    }
    fetch(`/api/events/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setEvent({
            name: data.name,
            slug: data.slug,
            theme: data.theme || "atelier",
            tickets: data.tickets ?? data.content?.tickets ?? [],
          });
        } else {
          setEvent(null);
        }
      })
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const isDemo = isDemoEvent(slug);
  const theme = themes[(event?.theme || "atelier") as keyof typeof themes] || themes.atelier;
  const tier = event?.tickets?.[tierIndex];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event?.slug || !form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: event.slug,
          tierIndex,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone?.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else if (data.url) {
        window.location.href = data.url;
      } else {
        setError("No redirect URL received.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ backgroundColor: theme.colors.bg }}>
          <Link href="/" className="text-sm uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
            ← Home
          </Link>
          <div className="w-10 h-px animate-pulse" style={{ backgroundColor: theme.colors.accent }} />
        </div>
      </ThemeProvider>
    );
  }

  if (!event || !tier) {
    return (
      <ThemeProvider theme={theme}>
        <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: theme.colors.bg }}>
          <Link href="/" className="mb-6 text-sm uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>← Home</Link>
          <h1 className="text-2xl font-light mb-4" style={{ fontFamily: "var(--theme-display-font)" }}>Ticket not found</h1>
          <Link href={`/e/${slug}`} className="px-6 py-3 font-medium tracking-wider uppercase" style={{ backgroundColor: theme.colors.accent, color: "white" }}>
            Back to event
          </Link>
        </div>
      </ThemeProvider>
    );
  }

  if (isDemo) {
    return (
      <ThemeProvider theme={theme}>
        <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: theme.colors.bg }}>
          <Link href="/" className="mb-6 text-sm uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>← Home</Link>
          <h1 className="text-2xl font-light mb-4 text-center" style={{ fontFamily: "var(--theme-display-font)" }}>
            This is a demo event
          </h1>
          <p className="text-center mb-8 max-w-md" style={{ color: theme.colors.textMuted }}>
            Create your own event to enable ticket sales and checkout.
          </p>
          <Link
            href={`/create?theme=${event.theme}`}
            className="px-8 py-4 font-medium tracking-wider uppercase"
            style={{ backgroundColor: theme.colors.accent, color: "white", borderRadius: `${theme.buttonRadius}px` }}
          >
            Create your event →
          </Link>
          <Link href={`/e/${slug}`} className="mt-6 text-sm uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
            Back to event
          </Link>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen py-16 px-6" style={{ backgroundColor: theme.colors.bg, fontFamily: "var(--theme-body-font)" }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <Link href={`/e/${slug}#tickets`} className="text-sm uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
              ← Back to event
            </Link>
            <Link href="/" className="text-sm uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
              ← Home
            </Link>
          </div>
          <h1 className="text-2xl font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>{event.name}</h1>
          <p className="text-lg mb-8" style={{ color: theme.colors.accent, fontFamily: "var(--theme-mono-font)" }}>
            {tier.name} — {tier.price === 0 ? "Free" : `$${tier.price}`}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm uppercase tracking-wider mb-2" style={{ color: theme.colors.textMuted }}>
                Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 border"
                style={{ borderColor: theme.colors.cardBorder, backgroundColor: theme.colors.card }}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm uppercase tracking-wider mb-2" style={{ color: theme.colors.textMuted }}>
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 border"
                style={{ borderColor: theme.colors.cardBorder, backgroundColor: theme.colors.card }}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm uppercase tracking-wider mb-2" style={{ color: theme.colors.textMuted }}>
                Phone (optional)
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-3 border"
                style={{ borderColor: theme.colors.cardBorder, backgroundColor: theme.colors.card }}
              />
            </div>
            {error && <p className="text-sm" style={{ color: theme.colors.accent }}>{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 font-medium tracking-wider uppercase disabled:opacity-60"
              style={{ backgroundColor: theme.colors.accent, color: "white", borderRadius: `${theme.buttonRadius}px` }}
            >
              {submitting ? "Processing…" : tier.price === 0 ? "Confirm" : "Continue to payment"}
            </button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}
