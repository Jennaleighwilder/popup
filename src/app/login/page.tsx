"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signInWithGoogle } from "@/lib/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/create";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const { error } = await signInWithGoogle(nextPath);
    if (error) {
      setError(error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#2D2420] flex flex-col justify-center px-6 py-24">
      <div className="max-w-md mx-auto w-full">
        <div className="w-10 h-px bg-[#8B2500] mb-8" />
        <h1
          className="font-[family-name:var(--font-display)] text-4xl font-light text-[#F5EDE4] mb-2"
        >
          Welcome back
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[#A89070] mb-12">
          Sign in to manage your events
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-sm text-[#C7402D] font-[family-name:var(--font-body)]">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="email"
              className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#A89070] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] placeholder-[#8C8578]/60 focus:outline-none focus:border-[#C4A574] transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#A89070] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] placeholder-[#8C8578]/60 focus:outline-none focus:border-[#C4A574] transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-[#8B2500] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#6B1D00] disabled:opacity-50 transition-all duration-300"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#5C4033]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#2D2420] px-4 font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#A89070]">
              or
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full px-8 py-4 border-2 border-[#5C4033] font-[family-name:var(--font-body)] text-sm tracking-wider uppercase text-[#F5EDE4] bg-transparent hover:border-[#C4A574] hover:text-[#C4A574] transition-all duration-300"
        >
          Sign in with Google
        </button>

        <p className="mt-12 text-center font-[family-name:var(--font-body)] text-sm text-[#A89070]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#C4A574] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2D2420] flex items-center justify-center" />}>
      <LoginForm />
    </Suspense>
  );
}
