"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signInWithGoogle } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#E2D4C0] flex flex-col justify-center px-6 py-24">
      <div className="max-w-md mx-auto w-full">
        <div className="w-10 h-px bg-[#C4956A] mb-8" />
        <h1
          className="font-[family-name:var(--font-display)] text-4xl font-light text-[#1A1714] mb-2"
        >
          Welcome back
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[#6B5A47] mb-12">
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
              className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#6B5A47] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] text-[#1A1714] placeholder-[#8C8578]/60 focus:outline-none focus:border-[#C4956A] transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#6B5A47] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] text-[#1A1714] placeholder-[#8C8578]/60 focus:outline-none focus:border-[#C4956A] transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] disabled:opacity-50 transition-all duration-300"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8E2D9]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#E2D4C0] px-4 font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#6B5A47]">
              or
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full px-8 py-4 border-2 border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm tracking-wider uppercase text-[#1A1714] hover:border-[#C4956A] hover:text-[#C4956A] transition-all duration-300"
        >
          Sign in with Google
        </button>

        <p className="mt-12 text-center font-[family-name:var(--font-body)] text-sm text-[#6B5A47]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#C4956A] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
