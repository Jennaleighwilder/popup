"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { EventPreview } from "@/components/EventPreview";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import type { EventData } from "@/types/event";

const CATEGORIES = [
  { id: "fashion", label: "Fashion & Retail", subtitle: "Pop-ups, sample sales, trunk shows", icon: "🧵" },
  { id: "food", label: "Food & Drink", subtitle: "Supper clubs, tastings, chef's tables", icon: "🍷" },
  { id: "art", label: "Art & Exhibition", subtitle: "Gallery openings, art walks, installations", icon: "🎨" },
  { id: "wellness", label: "Wellness & Beauty", subtitle: "Retreats, workshops, spa events", icon: "🌿" },
  { id: "music", label: "Music & Nightlife", subtitle: "Listening parties, DJ nights, concerts", icon: "🎵" },
  { id: "market", label: "Markets & Craft", subtitle: "Artisan markets, vintage fairs, makers", icon: "🛍️" },
];

const VIBES = ["Curated", "Luxe", "Casual", "Underground", "Festive"];

const GENERATING_STAGES = [
  { id: "story", label: "Writing your story...", icon: "✨" },
  { id: "aesthetic", label: "Choosing your aesthetic...", icon: "🎨" },
  { id: "hosts", label: "Curating your hosts...", icon: "👤" },
  { id: "program", label: "Building your program...", icon: "📋" },
  { id: "tickets", label: "Setting up tickets...", icon: "🎟️" },
  { id: "ready", label: "Your event is ready", icon: "✅" },
];

export default function CreatePage() {
  const { user, loading, demoMode } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    aiName: true,
    city: "",
    dateStart: "",
    dateEnd: "",
    time: "",
    venue: "",
    capacity: 100,
    vibe: "Curated",
    extra: "",
  });
  const [generatingStage, setGeneratingStage] = useState(0);
  const [generatedEvent, setGeneratedEvent] = useState<EventData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user && !demoMode) router.push("/login");
  }, [user, loading, demoMode, router]);

  const handleGenerate = async () => {
    setError("");
    setStep(3);
    setGeneratingStage(0);

    const stageInterval = setInterval(() => {
      setGeneratingStage((s) => Math.min(s + 1, GENERATING_STAGES.length - 1));
    }, 2500);

    try {
      const categoryLabel = CATEGORIES.find((c) => c.id === selectedCategory)?.label || selectedCategory || "Event";
      const res = await fetch("/api/events/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: categoryLabel,
          categoryId: selectedCategory,
          name: formData.aiName ? undefined : formData.name,
          city: formData.city,
          dateStart: formData.dateStart,
          dateEnd: formData.dateEnd || undefined,
          time: formData.time,
          venue: formData.venue || undefined,
          capacity: formData.capacity,
          vibe: formData.vibe.toLowerCase(),
          extra: formData.extra || undefined,
          userId: user?.id,
        }),
      });

      clearInterval(stageInterval);
      setGeneratingStage(GENERATING_STAGES.length - 1);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setGeneratedEvent(data);
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(2);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="font-[family-name:var(--font-body)] text-[#8C8578]">Loading...</p>
      </div>
    );
  }

  if (!user && !demoMode) return null;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col justify-center px-6 py-24"
          >
            <div className="w-10 h-px bg-[#C4956A] mb-8" />
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-[#1A1714] mb-4">
              What are you creating?
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-4xl">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setStep(2);
                  }}
                  className="p-8 text-left bg-white border-2 border-[#E8E2D9] hover:border-[#C4956A] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-3xl mb-4 block">{cat.icon}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-light text-[#1A1714]">
                    {cat.label}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] mt-2">
                    {cat.subtitle}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col justify-center px-6 py-24"
          >
            <div className="max-w-xl mx-auto w-full">
              <button onClick={() => setStep(1)} className="text-[#8C8578] hover:text-[#1A1714] text-sm mb-8 transition-colors">
                ← Back
              </button>
              <div className="w-10 h-px bg-[#C4956A] mb-8" />
              <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-[#1A1714] mb-12">
                Tell us about your event
              </h1>

              {error && <p className="text-[#C7402D] text-sm mb-6">{error}</p>}

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setFormData((f) => ({ ...f, aiName: !f.aiName }))}
                    className={`w-12 h-6 rounded-full transition-colors ${formData.aiName ? "bg-[#C4956A]" : "bg-[#E8E2D9]"}`}
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full bg-white shadow"
                      animate={{ x: formData.aiName ? 26 : 2 }}
                    />
                  </button>
                  <span className="font-[family-name:var(--font-body)] text-sm">Let AI name it</span>
                </div>

                {!formData.aiName && (
                  <div>
                    <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Event name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] focus:outline-none focus:border-[#C4956A]"
                      placeholder="My Amazing Event"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData((f) => ({ ...f, city: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] focus:outline-none focus:border-[#C4956A]"
                    placeholder="New York"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Start date</label>
                    <input
                      type="date"
                      value={formData.dateStart}
                      onChange={(e) => setFormData((f) => ({ ...f, dateStart: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] focus:outline-none focus:border-[#C4956A]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">End date (optional)</label>
                    <input
                      type="date"
                      value={formData.dateEnd}
                      onChange={(e) => setFormData((f) => ({ ...f, dateEnd: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] focus:outline-none focus:border-[#C4956A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData((f) => ({ ...f, time: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] focus:outline-none focus:border-[#C4956A]"
                    placeholder="10:00 AM - 7:00 PM"
                    required
                  />
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Venue (optional)</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData((f) => ({ ...f, venue: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] focus:outline-none focus:border-[#C4956A]"
                    placeholder="We'll suggest one"
                  />
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Capacity: {formData.capacity}</label>
                  <input
                    type="range"
                    min={20}
                    max={5000}
                    step={10}
                    value={formData.capacity}
                    onChange={(e) => setFormData((f) => ({ ...f, capacity: parseInt(e.target.value) }))}
                    className="w-full accent-[#C4956A]"
                  />
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Vibe</label>
                  <div className="flex flex-wrap gap-2">
                    {VIBES.map((v) => (
                      <button
                        key={v}
                        onClick={() => setFormData((f) => ({ ...f, vibe: v }))}
                        className={`px-4 py-2 text-sm font-[family-name:var(--font-body)] transition-colors ${
                          formData.vibe === v ? "bg-[#C4956A] text-white" : "bg-white border border-[#E8E2D9] text-[#1A1714] hover:border-[#C4956A]"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Anything else?</label>
                  <textarea
                    value={formData.extra}
                    onChange={(e) => setFormData((f) => ({ ...f, extra: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-[#E8E2D9] font-[family-name:var(--font-body)] focus:outline-none focus:border-[#C4956A] min-h-[100px]"
                    placeholder="Special instructions for the AI..."
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!formData.city || !formData.dateStart || !formData.time}
                  className="w-full px-8 py-4 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Create my event →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col justify-center items-center px-6 py-24"
          >
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-light text-[#1A1714] mb-12">
              Creating your event...
            </h1>
            <div className="space-y-6 max-w-md w-full">
              {GENERATING_STAGES.map((stage, i) => (
                <div
                  key={stage.id}
                  className={`flex items-center gap-4 transition-opacity ${i <= generatingStage ? "opacity-100" : "opacity-40"}`}
                >
                  <span className="text-2xl">{stage.icon}</span>
                  <span className="font-[family-name:var(--font-body)] text-[#1A1714]">{stage.label}</span>
                  {i < generatingStage && <span className="text-[#5C7C50] ml-auto">✓</span>}
                </div>
              ))}
            </div>
            <div className="w-full max-w-md h-1 bg-[#E8E2D9] mt-12 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-[#C4956A]"
                initial={{ width: "0%" }}
                animate={{ width: `${((generatingStage + 1) / GENERATING_STAGES.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        {step === 4 && generatedEvent && (
          <motion.div
            key="step4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E8E2D9] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link href="/dashboard" className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#1A1714]">
                  ← Dashboard
                </Link>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578]">Preview</span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/edit/${generatedEvent.slug}`}
                  className="px-4 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm hover:border-[#C4956A] transition-colors"
                >
                  Edit
                </Link>
                <span className="px-4 py-2 border border-[#E8E2D9] font-[family-name:var(--font-body)] text-sm text-[#8C8578]">
                  Change Theme
                </span>
                <Link
                  href={`/publish/${generatedEvent.slug}`}
                  className="px-6 py-2 bg-[#C4956A] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#A67B52] transition-colors"
                >
                  Publish →
                </Link>
              </div>
            </div>
            <div className="pt-16">
              <ThemeProvider theme={themes[generatedEvent.theme as keyof typeof themes] || themes.atelier}>
                <EventPreview event={generatedEvent} showFooter={true} />
              </ThemeProvider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
