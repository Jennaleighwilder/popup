"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const hasImplicitTokens = hash.includes("access_token=");
    const nextFromUrl = searchParams.get("next");
    const nextFromStorage =
      typeof window !== "undefined" ? sessionStorage.getItem("auth_next") : null;
    const next = nextFromUrl ?? nextFromStorage ?? "/create";
    if (typeof window !== "undefined" && nextFromStorage) {
      sessionStorage.removeItem("auth_next");
    }

    const supabase = createClient();
    if (!supabase) {
      router.replace("/login?error=config");
      return;
    }

    // Implicit flow: tokens in URL hash, client parses automatically
    if (hasImplicitTokens) {
      const sub = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          sub.data.subscription.unsubscribe();
          window.location.href = next.startsWith("/") ? next : `/${next}`;
        }
      });
      // Fallback: if no event fires, check session after parse
      const t = setTimeout(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) window.location.href = next.startsWith("/") ? next : `/${next}`;
        });
      }, 500);
      return () => clearTimeout(t);
    }

    // PKCE flow (fallback)
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          const errParam = encodeURIComponent(error.message);
          router.replace(`/login?error=auth&details=${errParam}`);
        } else {
          window.location.href = next.startsWith("/") ? next : `/${next}`;
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
