"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt, Wine, Palette, Leaf, Music2, Store, Check, Link2, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { EventPreview } from "@/components/EventPreview";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import { buildEventFromForm } from "@/lib/buildEvent";
import { saveDraftEvent } from "@/lib/eventStorage";
import type { EventData } from "@/types/event";

const CATEGORIES = [
  { id: "fashion", label: "Fashion & Retail", subtitle: "Pop-ups, sample sales, trunk shows", Icon: Shirt },
  { id: "food", label: "Food & Drink", subtitle: "Supper clubs, tastings, chef's tables", Icon: Wine },
  { id: "art", label: "Art & Exhibition", subtitle: "Gallery openings, art walks, installations", Icon: Palette },
  { id: "wellness", label: "Wellness & Beauty", subtitle: "Retreats, workshops, spa events", Icon: Leaf },
  { id: "music", label: "Music & Nightlife", subtitle: "Listening parties, DJ nights, concerts", Icon: Music2 },
  { id: "market", label: "Markets & Craft", subtitle: "Artisan markets, vintage fairs, makers", Icon: Store },
];

const VIBES = ["Curated", "Luxe", "Casual", "Underground", "Festive"];

const GENERATING_STAGES = [
  { id: "story", label: "Writing your story" },
  { id: "aesthetic", label: "Choosing your aesthetic" },
  { id: "hosts", label: "Curating your hosts" },
  { id: "program", label: "Building your program" },
  { id: "tickets", label: "Setting up tickets" },
  { id: "ready", label: "Your event is ready" },
];

const VALID_CATEGORIES = ["fashion", "food", "art", "wellness", "music", "market"];
const THEME_TO_CATEGORY: Record<string, string> = {
  atelier: "fashion", harvest: "food", gallery: "art", botanica: "wellness",
  soiree: "music", brutalist: "music", zen: "wellness", maximalist: "music", neon: "music", vintage: "market",
};

export default function CreatePage() {
  const { user, loading, demoMode } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const themeFromUrl = searchParams.get("theme");
  const categoryFromTheme = themeFromUrl ? THEME_TO_CATEGORY[themeFromUrl] : null;
  const initialCategory = (categoryFromUrl && VALID_CATEGORIES.includes(categoryFromUrl) ? categoryFromUrl : null)
    || (categoryFromTheme && VALID_CATEGORIES.includes(categoryFromTheme) ? categoryFromTheme : null);
  const [step, setStep] = useState(initialCategory ? 2 : 1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [formData, setFormData] = useState({
    name: "",
    aiName: true,
    tagline: "",
    city: "New York",
    dateStart: "",
    dateEnd: "",
    time: "7:00 PM",
    venue: "",
    address: "",
    capacity: 100,
    vibe: "Curated",
    extra: "",
  });
  const [generatingStage, setGeneratingStage] = useState(0);
  const [generatedEvent, setGeneratedEvent] = useState<EventData | null>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sourceUrl, setSourceUrl] = useState("");
  const [scrapedData, setScrapedData] = useState<Record<string, unknown> | null>(null);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState("");

  useEffect(() => {
    if (!loading && !user && !demoMode) router.push("/login?next=/create");
  }, [user, loading, demoMode, router]);

  useEffect(() => {
    if (step === 2 && !formData.dateStart) {
      const today = new Date().toISOString().slice(0, 10);
      setFormData((f) => ({ ...f, dateStart: today }));
    }
  }, [step, formData.dateStart]);

  const handleScrape = async () => {
    const url = sourceUrl.trim();
    if (!url) {
      setScrapeError("Please enter an event URL.");
      return;
    }
    setScrapeError("");
    setIsScraping(true);
    try {
      const res = await fetch("/api/events/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) {
        setScrapeError(json.error || "Failed to scrape URL");
        return;
      }
      const data = json.data;
      setScrapedData(data);
      setFormData((f) => ({
        ...f,
        name: (data.name && typeof data.name === "string") ? data.name : f.name,
        aiName: !data.name,
        tagline: (data.tagline && typeof data.tagline === "string") ? data.tagline : f.tagline,
        city: (data.city && typeof data.city === "string") ? data.city : f.city,
        dateStart: typeof data.dateStart === "string" ? data.dateStart.slice(0, 10) : f.dateStart,
        dateEnd: typeof data.dateEnd === "string" ? data.dateEnd.slice(0, 10) : f.dateEnd,
        time: (data.time && typeof data.time === "string") ? data.time : f.time,
        venue: (data.venue && typeof data.venue === "string") ? data.venue : f.venue,
        address: (data.address && typeof data.address === "string") ? data.address : f.address,
        capacity: typeof data.capacity === "number" ? data.capacity : f.capacity,
        extra: (data.extra && typeof data.extra === "string") ? data.extra : f.extra,
      }));
      if (data.category && VALID_CATEGORIES.includes(data.category)) {
        setSelectedCategory(data.category);
      }
    } catch {
      setScrapeError("Something went wrong. Please try again.");
    } finally {
      setIsScraping(false);
    }
  };

  const handleGenerate = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isGenerating) return;
    const rawCat = selectedCategory || (typeof scrapedData?.category === "string" ? scrapedData.category : null);
    const cat = rawCat && VALID_CATEGORIES.includes(rawCat) ? rawCat : "fashion";
    const city = (formData.city || scrapedData?.city || "").toString().trim();
    const rawDate = formData.dateStart || scrapedData?.dateStart || scrapedData?.date;
    const date = typeof rawDate === "string" && rawDate.length >= 10
      ? rawDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10);
    const time = (formData.time || scrapedData?.time || "").toString().trim() || "7:00 PM";
    if (!city) {
      setError("Please enter a city (or import from a URL first).");
      return;
    }
    setError("");
    setIsGenerating(true);
    setStep(3);
    setGeneratingStage(0);

    const filledForm = { ...formData, city, dateStart: date, time };
    const stageInterval = setInterval(() => {
      setGeneratingStage((s) => Math.min(s + 1, GENERATING_STAGES.length - 1));
    }, 400);

    const useGenerateApi = scrapedData && Object.keys(scrapedData).length > 0;
    let failed = false;

    try {
      if (useGenerateApi) {
        const res = await fetch("/api/events/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: cat,
            categoryId: cat,
            name: filledForm.name,
            city,
            dateStart: date,
            dateEnd: filledForm.dateEnd || undefined,
            time,
            venue: filledForm.venue,
            capacity: filledForm.capacity,
            vibe: filledForm.vibe,
            extra: filledForm.extra,
            scrapedData,
            userId: user?.id ?? null,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Generation failed");
        }
        setGeneratedEvent(json as EventData);
      } else {
        const event = buildEventFromForm(filledForm, cat, themeFromUrl || undefined);
        setGeneratedEvent(event);
      }
    } catch (err) {
      failed = true;
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(2);
    } finally {
      clearInterval(stageInterval);
      setGeneratingStage(GENERATING_STAGES.length - 1);
      setIsGenerating(false);
      if (!failed) setStep(4);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2D2420] flex items-center justify-center">
        <p className="font-[family-name:var(--font-body)] text-[#8C8578]">Loading...</p>
      </div>
    );
  }

  if (!user && !demoMode) {
    return (
      <div className="min-h-screen bg-[#2D2420] flex items-center justify-center">
        <p className="font-[family-name:var(--font-body)] text-[#8C8578]">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2D2420] overflow-x-hidden">
      <div className="fixed top-6 left-6 z-40">
        <Link href="/" className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#F5EDE4] transition-colors">
          ← Home
        </Link>
      </div>
      <div className="fixed top-6 right-6 z-40 font-[family-name:var(--font-mono)] text-xs text-[#8C8578] tracking-widest uppercase">
        {step} / 4
      </div>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col justify-center px-6 py-24"
          >
            <div className="w-10 h-px bg-[#8B2500] mb-8" />
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-[#F5EDE4] mb-4 tracking-tight">
              What will you create?
            </h1>
            <p className="font-[family-name:var(--font-body)] text-[#8C8578] text-sm tracking-widest uppercase mb-16">
              Select a category
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
              {CATEGORIES.map((cat) => {
                const Icon = cat.Icon;
                return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setStep(2);
                  }}
                  className="group p-8 text-left bg-white border border-[#5C4033] hover:border-[#C4A574] transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-6 h-6 text-[#C4A574] mb-6 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1.25} />
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-light text-[#1A1714]">
                    {cat.label}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] mt-2">
                    {cat.subtitle}
                  </p>
                </motion.button>
                );
              })}
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
              <button type="button" onClick={() => setStep(1)} className="text-[#8C8578] hover:text-[#F5EDE4] text-sm mb-8 transition-colors">
                ← Back
              </button>
              <div className="w-10 h-px bg-[#8B2500] mb-8" />
              <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-[#F5EDE4] mb-4 tracking-tight">
                The details
              </h1>
              <p className="font-[family-name:var(--font-body)] text-[#8C8578] text-sm tracking-widest uppercase mb-12">
                Tell us about your event
              </p>

              {error && <p className="text-[#C7402D] text-sm mb-6">{error}</p>}

              <div className="mb-8 p-4 bg-[#1A1714] border border-[#5C4033]">
                <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">
                  <Link2 className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                  Import from existing event URL
                </label>
                <p className="text-[#8C8578] text-xs mb-3">
                  Paste a link to an event page and we&apos;ll scrape the details to pre-fill your design.
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={sourceUrl}
                    onChange={(e) => {
                      setSourceUrl(e.target.value);
                      setScrapeError("");
                    }}
                    placeholder="https://..."
                    className="flex-1 px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-sm text-[#1A1714] focus:outline-none focus:border-[#C4A574] placeholder:text-[#8C8578]/60"
                  />
                  <button
                    type="button"
                    onClick={handleScrape}
                    disabled={isScraping}
                    className="px-6 py-3 bg-[#8B2500] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#6B1D00] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    {isScraping ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      "Import"
                    )}
                  </button>
                </div>
                {scrapeError && <p className="text-[#C7402D] text-xs mt-2">{scrapeError}</p>}
                {scrapedData && (
                  <p className="text-[#5C7C50] text-xs mt-2">✓ Event details imported. Review below and create.</p>
                )}
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData((f) => ({ ...f, aiName: !f.aiName }))}
                    className={`w-12 h-6 rounded-full transition-colors ${formData.aiName ? "bg-[#8B2500]" : "bg-[#5C4033]"}`}
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full bg-white shadow"
                      animate={{ x: formData.aiName ? 26 : 2 }}
                    />
                  </button>
                  <span className="font-[family-name:var(--font-body)] text-sm tracking-wide">Curated naming</span>
                </div>

                {!formData.aiName && (
                  <div>
                    <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Event name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4A574]"
                      placeholder="My Amazing Event"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Tagline (optional)</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData((f) => ({ ...f, tagline: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4A574]"
                    placeholder="Three days of designer fashion at up to 70% off"
                  />
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData((f) => ({ ...f, city: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4A574]"
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
                      className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4A574]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">End date (optional)</label>
                    <input
                      type="date"
                      value={formData.dateEnd}
                      onChange={(e) => setFormData((f) => ({ ...f, dateEnd: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4A574]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData((f) => ({ ...f, time: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4A574]"
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
                    className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4A574]"
                    placeholder="The Loft on Spring"
                  />
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Address (optional)</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData((f) => ({ ...f, address: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4A574]"
                    placeholder="161 Spring Street, SoHo"
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
                    className="w-full accent-[#C4A574]"
                  />
                </div>

                <div>
                  <label className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#8C8578] mb-2">Vibe</label>
                  <div className="flex flex-wrap gap-2">
                    {VIBES.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setFormData((f) => ({ ...f, vibe: v }))}
                        className={`px-4 py-2 text-sm font-[family-name:var(--font-body)] transition-colors ${
                          formData.vibe === v ? "bg-[#8B2500] text-white" : "bg-white border border-[#5C4033] text-[#1A1714] hover:border-[#C4A574]"
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
                    className="w-full px-4 py-3 bg-white border border-[#5C4033] font-[family-name:var(--font-body)] text-[#1A1714] focus:outline-none focus:border-[#C4A574] min-h-[100px]"
                    placeholder="Additional notes for your event..."
                  />
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleGenerate(e);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  disabled={isGenerating}
                  className="w-full px-8 py-4 bg-[#8B2500] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#6B1D00] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                  style={{ touchAction: "manipulation" }}
                >
                  {isGenerating ? "Creating..." : "Create my event →"}
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
            <div className="w-10 h-px bg-[#8B2500] mb-12" />
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-[#1A1714] mb-16 tracking-tight">
              Creating your event
            </h1>
            <div className="space-y-8 max-w-sm w-full">
              {GENERATING_STAGES.map((stage, i) => (
                <div
                  key={stage.id}
                  className={`flex items-center gap-6 transition-all duration-300 ${i <= generatingStage ? "opacity-100" : "opacity-30"}`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 border transition-colors ${i < generatingStage ? "border-[#C4A574] bg-[#8B2500]" : "border-[#5C4033]"}`}>
                    {i < generatingStage ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-[#5C4033]" />
                    )}
                  </div>
                  <span className="font-[family-name:var(--font-body)] text-[#1A1714] tracking-wide">{stage.label}</span>
                </div>
              ))}
            </div>
            <div className="w-full max-w-sm h-px bg-[#5C4033] mt-16 overflow-hidden">
              <motion.div
                className="h-full bg-[#8B2500]"
                initial={{ width: "0%" }}
                animate={{ width: `${((generatingStage + 1) / GENERATING_STAGES.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen"
          >
            {generatedEvent ? (
              <>
                <div className="fixed top-0 left-0 right-0 z-50 bg-[#2D2420]/95 backdrop-blur-sm border-b border-[#5C4033] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#F5EDE4]">
                      ← Dashboard
                    </Link>
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[#8C8578]">Preview</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/edit/${generatedEvent.slug}`}
                      onClick={() => saveDraftEvent(generatedEvent)}
                      className="px-4 py-2 border border-[#5C4033] font-[family-name:var(--font-body)] text-sm hover:border-[#C4A574] transition-colors"
                    >
                      Edit
                    </Link>
                    <span className="px-4 py-2 border border-[#5C4033] font-[family-name:var(--font-body)] text-sm text-[#8C8578]">
                      Change Theme
                    </span>
                    <Link
                      href={`/publish/${generatedEvent.slug}`}
                      className="px-6 py-2 bg-[#8B2500] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#6B1D00] transition-colors"
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
              </>
            ) : (
              <div className="min-h-screen flex flex-col items-center justify-center px-6">
                <Link href="/" className="mb-8 font-[family-name:var(--font-body)] text-sm text-[#8C8578] hover:text-[#F5EDE4]">
                  ← Home
                </Link>
                <div className="w-10 h-px bg-[#8B2500] mb-8" />
                <h1 className="font-[family-name:var(--font-display)] text-2xl font-light text-[#F5EDE4] mb-4">Something went wrong</h1>
                <p className="font-[family-name:var(--font-body)] text-[#8C8578] text-sm mb-8">Your event could not be generated. Please try again.</p>
                <button
                  type="button"
                  onClick={() => { setStep(2); setGeneratedEvent(null); setError(""); }}
                  className="px-8 py-4 bg-[#8B2500] text-white font-[family-name:var(--font-body)] text-sm tracking-wider uppercase hover:bg-[#6B1D00]"
                >
                  Try again
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
