"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signInWithGoogle } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signUp(email, password);
    setLoading(false);
    if (result.error) {
      setError("message" in result.error ? result.error.message : "Something went wrong");
      return;
    }
    const { data } = result as { data: { user?: { identities?: unknown[] } } };
    if (data?.user && (!data.user.identities || data.user.identities.length === 0)) {
      setError("An account with this email already exists. Try signing in.");
      return;
    }
    setSuccess(true);
    router.refresh();
  };

  const handleGoogleSignUp = async () => {
    setError("");
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      return;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center px-6 py-24">
        <div className="max-w-md mx-auto w-full text-center">
          <div className="w-10 h-px bg-[#C4956A] mx-auto mb-8" />
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-[#1A1714] mb-4">
            Check your email
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[#8C8578] mb-12">
            We&apos;ve sent you a link to confirm your account. Click it to get started.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-all duration-300"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center px-6 py-24">
      <div className="max-w-md mx-auto w-full">
        <div className="w-10 h-px bg-[#C4956A] mb-8" />
        <h1
          className="font-[family-name:var(--font-display)] text-4xl font-light text-[#1A1714] mb-2"
        >
          Create your account
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[#8C8578] mb-12">
          Start creating beautiful event pages in minutes
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
              className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2"
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
              className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] text-[#1A1714] placeholder-[#8C8578]/60 focus:outline-none focus:border-[#C4956A] transition-colors"
              placeholder="At least 6 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] disabled:opacity-50 transition-all duration-300"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8E2D9]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#FAF7F2] px-4 font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578]">
              or
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full px-8 py-4 border-2 border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm tracking-wider uppercase text-[#1A1714] hover:border-[#C4956A] hover:text-[#C4956A] transition-all duration-300"
        >
          Sign up with Google
        </button>

        <p className="mt-12 text-center font-[family-name:var(--font-body)] text-sm text-[#8C8578]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#C4956A] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
