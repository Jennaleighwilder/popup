"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, Check, Circle } from "lucide-react";

interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  payment_status: string;
  check_in_code: string;
  checked_in_at: string | null;
  created_at: string;
  tier_name: string;
}

export default function GuestsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(true);
  const [capacity, setCapacity] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/events/${slug}/attendees`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setAttendees(Array.isArray(data) ? data : []);
      })
      .catch(() => setAttendees([]))
      .finally(() => setLoading(false));

    fetch(`/api/events/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((ev) => {
        if (ev) {
          setEventName(ev.name || "Event");
          setCapacity(ev.capacity ?? null);
        }
      })
      .catch(() => {});
  }, [slug]);

  const toggleCheckIn = async (attendeeId: string, currentlyChecked: boolean) => {
    try {
      const res = await fetch(`/api/events/${slug}/attendees`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendee_id: attendeeId, checked_in: !currentlyChecked }),
      });
      if (res.ok) {
        setAttendees((prev) =>
          prev.map((a) =>
            a.id === attendeeId
              ? { ...a, checked_in_at: currentlyChecked ? null : new Date().toISOString() }
              : a
          )
        );
      }
    } catch {}
  };

  const checkedCount = attendees.filter((a) => a.checked_in_at).length;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <nav className="border-b border-[#E8E2D9] px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href={`/edit/${slug}`}
            className="flex items-center gap-2 font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to editor
          </Link>
          <Link href="/dashboard" className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-light text-[#1A1714] mb-8">
              Guest list
            </h1>
            <p className="font-[family-name:var(--font-body)] text-[#8C8578]">
              {eventName || slug}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 border border-[#E8E2D9] bg-white">
              <span className="font-[family-name:var(--font-mono)] text-sm text-[#8C8578]">
                {attendees.length}
                {capacity != null ? ` of ${capacity}` : ""} tickets sold
              </span>
            </div>
            <div className="px-4 py-2 border border-[#E8E2D9] bg-white">
              <span className="font-[family-name:var(--font-mono)] text-sm text-[#8C8578]">
                {checkedCount} checked in
              </span>
            </div>
            <a
              href={`/api/events/${slug}/attendees/export`}
              className="flex items-center gap-2 px-4 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV
            </a>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
              title="Coming soon"
            >
              <Mail className="w-4 h-4" /> Email all
            </button>
          </div>
        </div>

        {loading ? (
          <div className="border border-[#E8E2D9] bg-white p-12">
            <div className="animate-pulse h-8 bg-[#E8E2D9] w-48 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-[#E8E2D9]" />
              ))}
            </div>
          </div>
        ) : attendees.length === 0 ? (
          <div className="border border-[#E8E2D9] bg-white p-16 text-center">
            <p className="font-[family-name:var(--font-body)] text-[#8C8578] mb-4">
              No guests yet. Share your event to start selling tickets.
            </p>
            <Link
              href={`/e/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-[#C4956A] font-[family-name:var(--font-body)] text-sm text-[#C4956A] hover:bg-[#C4956A] hover:text-white transition-colors"
            >
              View event page
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-[#E8E2D9] bg-white overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8E2D9]">
                    <th className="text-left px-6 py-4 font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-6 py-4 font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider">
                      Ticket
                    </th>
                    <th className="text-left px-6 py-4 font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="text-left px-6 py-4 font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="text-left px-6 py-4 font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider">
                      Code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((a) => (
                    <tr key={a.id} className="border-b border-[#E8E2D9] last:border-0 hover:bg-[#FAF7F2]/50">
                      <td className="px-6 py-4 font-[family-name:var(--font-body)] text-[#1A1714]">
                        {a.name}
                      </td>
                      <td className="px-6 py-4 font-[family-name:var(--font-body)] text-[#1A1714]">
                        {a.email}
                      </td>
                      <td className="px-6 py-4 font-[family-name:var(--font-body)] text-sm text-[#8C8578]">
                        {a.tier_name}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs uppercase ${
                          a.payment_status === "paid" ? "text-[#5C7C50]" :
                          a.payment_status === "free" ? "text-[#8C8578]" :
                          "text-[#C4956A]"
                        }`}>
                          {a.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleCheckIn(a.id, !!a.checked_in_at)}
                          className="flex items-center gap-2 font-[family-name:var(--font-body)] text-sm hover:underline"
                          title={a.checked_in_at ? "Mark as not checked in" : "Mark as checked in"}
                        >
                          {a.checked_in_at ? (
                            <>
                              <Check className="w-4 h-4 text-[#5C7C50]" />
                              <span className="text-[#5C7C50]">Checked in</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-4 h-4 text-[#8C8578]" />
                              <span className="text-[#8C8578]">Check in</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-[family-name:var(--font-mono)] text-sm text-[#8C8578]">
                        {a.check_in_code}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
