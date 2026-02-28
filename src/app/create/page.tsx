"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function CreatePage() {
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
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
      <div className="w-10 h-px bg-[#C4956A] mb-8" />
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-[#1A1714] mb-4 text-center">
        Create your event
      </h1>
      <p className="font-[family-name:var(--font-body)] text-[#8C8578] mb-12 text-center max-w-md">
        The AI-powered create flow is coming in Phase 5. For now, explore the demo event.
      </p>
      <Link
        href="/e/the-edit-spring-sample-sale"
        className="px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-colors"
      >
        View Demo Event
      </Link>
      <Link
        href="/dashboard"
        className="mt-6 font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714] transition-colors"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
