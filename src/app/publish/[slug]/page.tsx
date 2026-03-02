"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import { EventPreview } from "@/components/EventPreview";
import { getDraftEvent } from "@/lib/eventStorage";
import { useAuth } from "@/components/AuthProvider";
import type { EventData } from "@/types/event";

export default function PublishPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { user } = useAuth();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const draft = getDraftEvent(slug);
    if (draft) {
      setEvent(draft);
      setLoading(false);
      return;
    }
    fetch(`/api/events/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setEvent(data);
      })
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const handlePublish = async () => {
    if (!event) return;
    setPublishing(true);
    setError("");
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          event,
          userId: user?.id ?? null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create checkout");
      if (data.url) window.location.href = data.url;
      else throw new Error("No checkout URL");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setPublishing(false);
    }
  };

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
        <div className="w-10 h-px bg-[#C4956A] mb-8" />
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-light text-[#1A1714] mb-4">
          Event not found
        </h1>
        <Link href="/create" className="px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase">
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

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${baseUrl}/e/${slug}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-10 h-px bg-[#C4956A] mb-12" />
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-[#1A1714] mb-4 tracking-tight">
            Your event is ready to go live
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[#8C8578] text-lg mb-12 max-w-xl">
            Publish for $9.99 and your event will be live at a shareable URL. You can start selling tickets right away.
          </p>

          <div className="mb-12 p-6 border border-[#E8E2D9] bg-white">
            <p className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
              Shareable URL
            </p>
            <p className="font-[family-name:var(--font-body)] text-[#1A1714] break-all">
              {shareUrl}
            </p>
          </div>

          {error && (
            <p className="font-[family-name:var(--font-body)] text-red-600 text-sm mb-6">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="px-10 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {publishing ? "Redirecting…" : "Publish for $9.99"}
            </button>
            <Link
              href={`/edit/${slug}`}
              className="px-10 py-4 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
            >
              Back to editor
            </Link>
            <Link href="/" className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]">
              ← Home
            </Link>
          </div>
        </motion.div>

        <div className="mt-20 pt-16 border-t border-[#E8E2D9]">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-6">
            Preview
          </p>
          <div className="border border-[#E8E2D9] overflow-hidden">
            <ThemeProvider theme={themes[event.theme as keyof typeof themes] || themes.atelier}>
              <div className="max-h-[60vh] overflow-y-auto">
                <EventPreview event={event} showFooter={false} />
              </div>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
