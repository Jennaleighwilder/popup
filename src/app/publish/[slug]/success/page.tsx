"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Check, Share2 } from "lucide-react";

export default function PublishSuccessPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const shareUrl = `${baseUrl}/e/${slug}`;

  useEffect(() => {
    const id = setTimeout(() => setBaseUrl(window.location.origin), 0);
    return () => clearTimeout(id);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Popup Event",
          url: shareUrl,
          text: `Check out my event: ${shareUrl}`,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center"
      >
        <div className="w-10 h-px bg-[#C4956A] mx-auto mb-8" />
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-[#1A1714] mb-4 tracking-tight">
          You&apos;re live!
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[#8C8578] mb-12">
          Your event is published and ready to share. Start selling tickets.
        </p>

        <div className="p-6 border border-[#E8E2D9] bg-white mb-8">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578] uppercase tracking-wider mb-2">
            Shareable URL
          </p>
          <p className="font-[family-name:var(--font-body)] text-[#1A1714] break-all mb-4">
            {shareUrl}

          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy URL"}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={`/edit/${slug}`}
            className="px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-colors"
          >
            Manage Event
          </Link>
          <a
            href={`/e/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
          >
            View Event
          </a>
        </div>

        <Link href="/dashboard" className="mt-12 inline-block font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]">
          ← Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
