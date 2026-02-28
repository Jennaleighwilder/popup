"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, Check, Share2, Calendar } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";

interface ConfirmationData {
  attendee: { name: string; email: string; check_in_code: string; payment_status: string };
  event: { slug: string; name: string; date: string; time: string; venue: string; address: string; city: string } | null;
  tier: { name: string; price: number; description: string } | null;
}

export default function ConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const attendeeId = searchParams.get("attendee_id");

  const [data, setData] = useState<ConfirmationData | null>(null);
  const [loading, setLoading] = useState(!!attendeeId);
  const [copied, setCopied] = useState(false);
  const [event, setEvent] = useState<{ theme?: string } | null>(null);

  useEffect(() => {
    if (!attendeeId) return;
    fetch(`/api/attendees/${attendeeId}/confirmation`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setData(d);
        if (d?.event?.slug) {
          return fetch(`/api/events/${d.event.slug}`).then((r) => (r.ok ? r.json() : null));
        }
        return null;
      })
      .then((ev) => setEvent(ev))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [attendeeId]);

  const theme = themes[(event?.theme || "atelier") as keyof typeof themes] || themes.atelier;

  const handleCopyCode = async () => {
    if (!data?.attendee?.check_in_code) return;
    try {
      await navigator.clipboard.writeText(data.attendee.check_in_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleAddToCalendar = () => {
    if (!data?.event) return;
    const ev = data.event;
    const title = encodeURIComponent(ev.name);
    const start = ev.date && ev.time ? `${ev.date}T${ev.time.replace(/\s/g, "").replace(/(\d)([AP]M)/i, "$1:00 $2")}` : ev.date || "";
    const location = [ev.venue, ev.address, ev.city].filter(Boolean).join(", ");
    const details = encodeURIComponent(`${ev.name}\n${ev.venue}\n${ev.address || ""}\n\nCheck-in code: ${data.attendee.check_in_code}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${start}&details=${details}&location=${encodeURIComponent(location)}`;
    window.open(url, "_blank");
  };

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/e/${slug}` : "";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.colors.bg }}>
        <div className="w-10 h-px animate-pulse" style={{ backgroundColor: theme.colors.accent }} />
      </div>
    );
  }

  if (!data || !attendeeId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: theme.colors.bg }}>
        <h1 className="text-2xl font-light mb-4" style={{ fontFamily: "var(--theme-display-font)" }}>Confirmation not found</h1>
        <Link href="/" className="px-6 py-3 font-medium tracking-wider uppercase" style={{ backgroundColor: theme.colors.accent, color: "white" }}>
          Back home
        </Link>
      </div>
    );
  }

  const { attendee, event: ev, tier } = data;
  const th = themes.atelier;

  return (
    <ThemeProvider theme={th}>
      <div className="min-h-screen py-16 px-6" style={{ backgroundColor: th.colors.bg, fontFamily: "var(--theme-body-font)" }}>
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-px mx-auto mb-8" style={{ backgroundColor: th.colors.accent }} />
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "var(--theme-display-font)" }}>
              You&apos;re in!
            </h1>
            <p className="text-lg mb-12" style={{ color: th.colors.textMuted }}>
              Your ticket is confirmed. See you there.
            </p>

            <div className="p-8 border mb-8 text-left" style={{ borderColor: th.colors.cardBorder, backgroundColor: th.colors.card }}>
              <h2 className="text-xl font-light mb-2" style={{ fontFamily: "var(--theme-display-font)" }}>
                {ev?.name}
              </h2>
              <p className="text-sm mb-4" style={{ color: th.colors.textMuted }}>
                {ev?.date} · {ev?.time} · {ev?.venue}
              </p>
              <p className="text-sm mb-2">
                <span style={{ color: th.colors.textMuted }}>Ticket:</span> {tier?.name}
              </p>
              <p className="text-sm mb-6">
                <span style={{ color: th.colors.textMuted }}>Guest:</span> {attendee.name}
              </p>

              <div className="pt-6 border-t" style={{ borderColor: th.colors.cardBorder }}>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "var(--theme-mono-font)", color: th.colors.textMuted }}>
                  Check-in code
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-mono tracking-[0.3em]" style={{ fontFamily: "var(--theme-mono-font)", color: th.colors.accent }}>
                    {attendee.check_in_code}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 px-3 py-2 border text-sm hover:border-[#C4956A] transition-colors"
                    style={{ borderColor: th.colors.cardBorder }}
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-xs mt-2" style={{ color: th.colors.textMuted }}>
                  Show this code at the door
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <button
                onClick={handleAddToCalendar}
                className="flex items-center gap-2 px-6 py-3 border font-medium tracking-wider uppercase transition-colors hover:border-[#C4956A]"
                style={{ borderColor: th.colors.cardBorder }}
              >
                <Calendar className="w-4 h-4" />
                Add to Calendar
              </button>
              {typeof navigator !== "undefined" && navigator.share && (
                <button
                  onClick={() => navigator.share({ title: ev?.name, url: shareUrl, text: `Join me at ${ev?.name}!` })}
                  className="flex items-center gap-2 px-6 py-3 border font-medium tracking-wider uppercase transition-colors hover:border-[#C4956A]"
                  style={{ borderColor: th.colors.cardBorder }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              )}
            </div>

            <Link
              href={`/e/${slug}`}
              className="inline-block px-8 py-4 font-medium tracking-wider uppercase"
              style={{ backgroundColor: th.colors.accent, color: "white" }}
            >
              View event
            </Link>
          </motion.div>
        </div>
      </div>
    </ThemeProvider>
  );
}
