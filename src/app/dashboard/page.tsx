"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function DashboardPage() {
  const { user, loading, demoMode } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !demoMode) {
      router.push("/login");
    }
  }, [user, loading, demoMode, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="font-[family-name:var(--font-body)] text-[#8C8578]">Loading...</p>
      </div>
    );
  }

  if (!user && !demoMode) {
    return null;
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
              {user?.email ?? "Demo mode"}
            </span>
            <Link
              href="/create"
              className="px-5 py-2.5 bg-[#C4956A] text-white text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-colors"
            >
              Create Event +
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-light text-[#1A1714] mb-8">
          Your events
        </h1>
        <div className="border border-[#E8E2D9] p-12 text-center">
          <p className="font-[family-name:var(--font-body)] text-[#8C8578] mb-6">
            No events yet. Create your first one to get started.
          </p>
          <Link
            href="/create"
            className="inline-block px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-colors"
          >
            Create Your First Event
          </Link>
        </div>
      </main>
    </div>
  );
}
