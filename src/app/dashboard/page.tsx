"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Edit, ExternalLink, CreditCard, User, Copy } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

interface EventCard {
  id: string;
  slug: string;
  name: string;
  status: string;
  hero_image: string | null;
  date_start: string | null;
  published_at: string | null;
  created_at: string;
  ticket_count: number;
}

interface Profile {
  id: string;
  email: string;
  display_name: string;
  stripe_connect_id: string | null;
}

export default function DashboardPage() {
  const { user, loading, demoMode } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<EventCard[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user && !demoMode) {
      router.push("/login");
    }
  }, [user, loading, demoMode, router]);

  useEffect(() => {
    if (user && !demoMode) {
      Promise.all([
        fetch("/api/events/mine").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/profiles/me").then((r) => (r.ok ? r.json() : null)),
      ])
        .then(([evs, prof]) => {
          setEvents(Array.isArray(evs) ? evs : []);
          setProfile(prof);
        })
        .catch(() => setEvents([]))
        .finally(() => setLoadingEvents(false));
    } else if (demoMode) {
      setLoadingEvents(false);
    }
  }, [user, demoMode]);

  const handleConnectStripe = async () => {
    setConnectLoading(true);
    try {
      const res = await fetch("/api/stripe/connect", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "Failed to connect");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setConnectLoading(false);
    }
  };

  const formatDate = (d: string | null) => {
    if (!d) return "TBA";
    try {
      const date = new Date(d + "T12:00:00");
      return isNaN(date.getTime()) ? d : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return d;
    }
  };

  const handleDuplicate = async (slug: string) => {
    try {
      const res = await fetch(`/api/events/${slug}`);
      if (res.ok) {
        const ev = await res.json();
        const newSlug = `${ev.slug}-copy-${Date.now().toString(36)}`;
        const { saveDraftEvent } = await import("@/lib/eventStorage");
        saveDraftEvent({ ...ev, slug: newSlug });
        router.push(`/edit/${newSlug}`);
      }
    } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-10 h-px bg-[#C4956A] animate-pulse" />
      </div>
    );
  }

  if (!user && !demoMode) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="font-[family-name:var(--font-body)] text-[#8C8578]">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <nav className="border-b border-[#E8E2D9] px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-display)] text-2xl font-light text-[#1A1714]">
            Popup
          </Link>
          <div className="flex items-center gap-6">
            <span className="font-[family-name:var(--font-body)] text-sm text-[#8C8578]">
              {user?.email ?? profile?.email ?? "Demo mode"}
            </span>
            <Link
              href="/create"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#C4956A] text-white text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Event
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-light text-[#1A1714] mb-12">
          Your events
        </h1>

        {loadingEvents ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-[#E8E2D9] bg-white p-6 h-64 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="border border-[#E8E2D9] p-16 text-center bg-white">
            <p className="font-[family-name:var(--font-body)] text-[#8C8578] mb-8">
              No events yet. Create your first one to get started.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {events.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-[#E8E2D9] bg-white overflow-hidden group"
              >
                <div className="aspect-[4/3] relative bg-[#E8E2D9]">
                  {ev.hero_image ? (
                    <Image src={ev.hero_image} alt={ev.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase">No image</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs uppercase tracking-wider ${
                      ev.status === "published" ? "bg-[#5C7C50] text-white" :
                      ev.status === "completed" ? "bg-[#8C8578] text-white" :
                      "bg-[#E8E2D9] text-[#1A1714]"
                    }`}>
                      {ev.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-light text-[#1A1714] mb-2 line-clamp-2">
                    {ev.name}
                  </h2>
                  <p className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578] mb-4">
                    {formatDate(ev.date_start)} · {ev.ticket_count} tickets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/edit/${ev.slug}`}
                      className="flex items-center gap-1.5 px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <a
                      href={`/e/${ev.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View
                    </a>
                    <Link
                      href={`/edit/${ev.slug}/guests`}
                      className="flex items-center gap-1.5 px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
                    >
                      <User className="w-3.5 h-3.5" /> Guests
                    </Link>
                    <button
                      onClick={() => handleDuplicate(ev.slug)}
                      className="flex items-center gap-1.5 px-3 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" /> Duplicate
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!demoMode && user && (
          <section className="border-t border-[#E8E2D9] pt-16 mt-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-light text-[#1A1714] mb-6">
              Account
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-[#E8E2D9] bg-white">
                <h3 className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-4">
                  Profile
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[#1A1714]">
                  {profile?.display_name ?? user.email?.split("@")[0]}
                </p>
                <p className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] mt-1">
                  {user.email}
                </p>
              </div>
              <div className="p-6 border border-[#E8E2D9] bg-white">
                <h3 className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-4">
                  Stripe Connect
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[#1A1714] mb-4">
                  Connect Stripe to collect ticket payments directly. You keep 100% minus processing fees.
                </p>
                {profile?.stripe_connect_id ? (
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#5C7C50]">Connected</p>
                ) : (
                  <button
                    onClick={handleConnectStripe}
                    disabled={connectLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-[#635BFF] text-white font-[family-name:var(--font-body)] text-sm hover:bg-[#5046E5] transition-colors disabled:opacity-60"
                  >
                    <CreditCard className="w-4 h-4" />
                    {connectLoading ? "Redirecting…" : "Connect Stripe"}
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
