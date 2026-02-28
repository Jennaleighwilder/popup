"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/dashboard";

    const supabase = createClient();
    if (!supabase) {
      router.replace("/login?error=config");
      return;
    }

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          router.replace("/login?error=auth");
        } else {
          router.replace(next);
        }
      });
    } else {
      router.replace("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <p className="font-[family-name:var(--font-body)] text-[#8C8578]">Completing sign in...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="font-[family-name:var(--font-body)] text-[#8C8578]">Completing sign in...</p>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
