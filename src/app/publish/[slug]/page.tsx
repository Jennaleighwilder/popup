"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function PublishPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
      <div className="w-10 h-px bg-[#C4956A] mb-8" />
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-[#1A1714] mb-4 text-center">
        Publish your event
      </h1>
      <p className="font-[family-name:var(--font-body)] text-[#8C8578] mb-12 text-center max-w-md">
        The $9.99 publish flow is coming in Phase 7. For now, view your event.
      </p>
      <Link
        href={`/e/${slug}`}
        className="px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-colors"
      >
        View Event
      </Link>
      <Link href="/dashboard" className="mt-6 font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]">
        ← Dashboard
      </Link>
    </div>
  );
}
