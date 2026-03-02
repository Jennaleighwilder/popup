import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { selectThemeForCategory } from "@/lib/themes";
import { getServiceRoleClient } from "@/lib/supabase";
import { getHeroImageForCategory, getVenueImageForCategory } from "@/image-governor";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateSlug(name: string): string {
  const base = slugify(name);
  return base || `event-${Date.now().toString(36)}`;
}

function templateEvent(params: {
  category: string;
  name?: string;
  city: string;
  dateStart: string;
  dateEnd?: string;
  time: string;
  venue?: string;
  capacity: number;
  vibe: string;
  extra?: string;
}) {
  const theme = selectThemeForCategory(params.category, params.vibe);
  const mapKey = params.category;

  const defaultNames: Record<string, string> = {
    fashion: "The Edit — Spring Sample Sale",
    food: "The Long Table",
    art: "First Friday Art Walk",
    wellness: "Morning Rituals",
    music: "The Listening Room",
    market: "The Makers Market",
  };

  const name = params.name?.trim() || defaultNames[mapKey] || "Your Event";
  const slug = generateSlug(name);
  const heroImage = getHeroImageForCategory(mapKey);
  const venueImage = getVenueImageForCategory(mapKey);

  const dateStr = params.dateEnd
    ? `${params.dateStart} – ${params.dateEnd}`
    : params.dateStart;

  const base = {
    slug,
    name,
    tagline: `${params.vibe} ${params.category} experience in ${params.city}`,
    category: mapKey,
    theme: theme.id,
    city: params.city,
    venue: params.venue || "Venue TBA",
    address: params.venue ? "Address to be confirmed" : "",
    date: dateStr,
    time: params.time,
    heroImage,
    venueImage,
  };

  switch (mapKey) {
    case "fashion":
      return {
        ...base,
        highlights: [
          { title: "200+ Designer Pieces", desc: "Curated selection at up to 70% off retail." },
          { title: "Complimentary Styling", desc: "Personal styling sessions with our experts." },
          { title: "Cocktails & DJ", desc: "Shop to a curated soundtrack." },
        ],
        hosts: [
          { name: "Maison Noir", role: "Featured Designer", bio: "Independent luxury from NYC.", image: "https://ui-avatars.com/api/?name=Maison+Noir&size=200&background=C4956A&color=ffffff" },
          { name: "Webb Gallery", role: "Featured Designer", bio: "Contemporary fashion curation.", image: "https://ui-avatars.com/api/?name=Webb+Gallery&size=200&background=8C8578&color=ffffff" },
        ],
        schedule: [],
        brands: ["Maison Noir", "Webb Gallery", "Park Studio"],
        shoppingRules: ["All sales final", "No try-ons", "Cash & card accepted"],
        scarcityMessage: "Limited quantities · First come, first served",
        tickets: [{ name: "Free RSVP", price: 0, desc: "General admission" }, { name: "VIP Early Access", price: 45, desc: "One hour early entry" }],
        faqs: [{ q: "What is the dress code?", a: "Smart casual." }, { q: "Are refunds available?", a: "All sales final." }],
      };
    case "food":
      return {
        ...base,
        capacity: params.capacity,
        highlights: [
          { title: "Five-Course Journey", desc: "A carefully crafted tasting menu." },
          { title: "Wine Pairing", desc: "Each course paired with a curated selection." },
          { title: "Intimate Setting", desc: `Limited to ${params.capacity} guests.` },
        ],
        hosts: [
          { name: "Chef Alexandra Chen", role: "Executive Chef", bio: "Former Michelin-starred chef.", image: "https://ui-avatars.com/api/?name=Alexandra+Chen&size=200&background=C4956A&color=ffffff" },
        ],
        schedule: [
          { time: "6:30 PM", title: "Welcome drinks" },
          { time: "7:00 PM", title: "First course" },
          { time: "7:45 PM", title: "Second course" },
          { time: "8:30 PM", title: "Main" },
          { time: "9:45 PM", title: "Dessert" },
        ],
        menu: [
          { course: "Seasonal crudo", pairing: "Champagne" },
          { course: "Handmade pasta", pairing: "Barolo" },
          { course: "Grilled ribeye", pairing: "Cabernet" },
          { course: "Chocolate soufflé", pairing: "Dessert wine" },
        ],
        whatsIncluded: ["Five-course menu", "Wine pairing", "Welcome cocktail"],
        whatsNotIncluded: ["Additional drinks at the bar"],
        dietaryNote: "Please note dietary requirements at booking.",
        tickets: [{ name: "Tasting Menu", price: 85, desc: "Five courses" }, { name: "With Wine Pairing", price: 125, desc: "Full experience" }],
        faqs: [{ q: "Dress code?", a: "Smart casual." }, { q: "Dietary needs?", a: "Note at booking." }],
      };
    case "art":
      return {
        ...base,
        highlights: [
          { title: "New Works", desc: "A collection of recent pieces." },
          { title: "Artist Statement", desc: "An intimate look at the creative process." },
          { title: "Opening Reception", desc: "Join us for an evening with the artist." },
        ],
        hosts: [
          { name: "Elena Rivera", role: "Artist", bio: "Exhibited at Tate Modern, MoMA PS1.", image: "https://ui-avatars.com/api/?name=Elena+Rivera&size=200&background=C4956A&color=ffffff" },
        ],
        schedule: [],
        artistBio: "Elena Rivera's work explores the boundaries between object and space.",
        featuredWorks: [{ title: "Untitled (Light Study)", desc: "Mixed media, 2024" }, { title: "Threshold", desc: "Installation, 2024" }],
        exhibitionDates: dateStr,
        relatedProgramming: [{ title: "Artist talk", when: "Saturday 3pm" }],
        tickets: [{ name: "Opening Reception", price: 0, desc: "Free admission" }, { name: "Patron's Preview", price: 150, desc: "Private viewing" }],
        faqs: [{ q: "Is the opening free?", a: "Yes." }, { q: "Gallery hours?", a: "Tue–Sat, 11am–6pm." }],
      };
    case "wellness":
      return {
        ...base,
        highlights: [
          { title: "Grounding Breathwork", desc: "We begin by settling into the space." },
          { title: "Gentle Movement", desc: "A slow vinyasa flow." },
          { title: "Cacao & Journaling", desc: "We close with intention-setting." },
        ],
        hosts: [
          { name: "Sophie Laurent", role: "Guide", bio: "Certified yoga and breathwork facilitator.", image: "https://ui-avatars.com/api/?name=Sophie+Laurent&size=200&background=C4956A&color=ffffff" },
        ],
        schedule: [],
        journey: [
          { step: "Arrival & settling", desc: "Find your place." },
          { step: "Grounding breathwork", desc: "15 minutes of breath." },
          { step: "Gentle vinyasa flow", desc: "45-minute practice." },
          { step: "Cacao ceremony", desc: "Set intentions." },
        ],
        whatToBring: ["Yoga mat", "Water bottle", "Journal"],
        whatsProvided: ["Herbal tea", "Light snacks", "Bolsters & blankets"],
        testimonials: [{ quote: "A morning that changed how I move through my week.", author: "— Past attendee" }],
        tickets: [{ name: "Drop-in", price: 45, desc: "Single session" }, { name: "Full Day", price: 120, desc: "All sessions + lunch" }],
        faqs: [{ q: "Beginners?", a: "Yes. All levels welcome." }, { q: "What to wear?", a: "Comfortable clothing." }],
      };
    case "market":
      return {
        ...base,
        highlights: [
          { title: "50+ Makers", desc: "Independent artisans in ceramics, jewelry, textiles." },
          { title: "Live Music", desc: "Curated soundtrack throughout the day." },
          { title: "Street Food", desc: "Local vendors and refreshments." },
        ],
        hosts: [],
        schedule: [],
        vendors: [
          { name: "Clay & Co", category: "Ceramics", image: "https://ui-avatars.com/api/?name=Clay&size=120&background=C4956A&color=ffffff" },
          { name: "Gold Thread", category: "Jewelry", image: "https://ui-avatars.com/api/?name=Gold+Thread&size=120&background=8C8578&color=ffffff" },
          { name: "Linen House", category: "Textiles", image: "https://ui-avatars.com/api/?name=Linen&size=120&background=5C7C50&color=ffffff" },
        ],
        whatsHappening: ["Live music", "Street food", "Workshops"],
        gettingThere: "Street parking. 5 min from transit. Bike racks on site.",
        vendorApplication: "Want to sell? Apply by the 1st. Email apply@market.com",
        tickets: [{ name: "Free Entry", price: 0, desc: "Suggested $5 donation" }],
        faqs: [{ q: "Parking?", a: "Street parking and nearby lots." }, { q: "Free?", a: "Free entry. $5 suggested donation." }],
      };
    case "music":
    default:
      return {
        ...base,
        highlights: [
          { title: "Curated Sound", desc: "An evening of carefully selected music." },
          { title: "Intimate Setting", desc: "Limited capacity." },
          { title: "Cocktails & Conversation", desc: "Welcome drinks and mingling." },
        ],
        hosts: [
          { name: "DJ Marcus Webb", role: "Resident", bio: "Curating sound for over a decade.", image: "https://ui-avatars.com/api/?name=Marcus+Webb&size=200&background=C4956A&color=ffffff" },
          { name: "Elena Rivera", role: "Host", bio: "Creating memorable nights.", image: "https://ui-avatars.com/api/?name=Elena+Rivera&size=200&background=8C8578&color=ffffff" },
        ],
        schedule: [
          { time: "9:00 PM", title: "Doors open" },
          { time: "9:30 PM", title: "Opening set" },
          { time: "11:00 PM", title: "Main set" },
        ],
        tickets: [{ name: "General Admission", price: 25, desc: "Full night access" }, { name: "VIP", price: 75, desc: "Reserved seating" }],
        faqs: [{ q: "Dress code?", a: "Smart casual." }, { q: "Age requirement?", a: "21+." }],
      };
  }
}

async function generateWithAI(params: {
  category: string;
  name?: string;
  city: string;
  dateStart: string;
  dateEnd?: string;
  time: string;
  venue?: string;
  capacity: number;
  vibe: string;
  extra?: string;
  scrapedData?: Record<string, unknown>;
}) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const theme = selectThemeForCategory(params.category, params.vibe);
  const mapKey = params.category;
  const scraped = params.scrapedData;

  const scrapedSection = scraped
    ? `

IMPORTANT: The following was scraped from the event's existing webpage. Use and adapt this real content—prioritize it over generic placeholders. Preserve names, dates, venues, descriptions, and any specific details. Make it feel editorial and luxurious while staying true to the source:
${JSON.stringify(scraped, null, 2)}
`
    : "";

  const prompt = `You are an event copywriter for a luxury lifestyle event platform. Generate compelling event content as JSON.
${scrapedSection}

Category: ${params.category}
City: ${params.city}
Date: ${params.dateStart}${params.dateEnd ? ` to ${params.dateEnd}` : ""}
Time: ${params.time}
Venue: ${params.venue || "TBA"}
Capacity: ${params.capacity}
Vibe: ${params.vibe}
${params.name ? `Event name (use or adapt): ${params.name}` : "Create a compelling event name"}
${params.extra && !scraped ? `Extra instructions: ${params.extra}` : ""}

Return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "name": "string",
  "tagline": "string",
  "highlights": [{"title": "string", "desc": "string"}, ...],
  "hosts": [{"name": "string", "role": "string", "bio": "string"}, ...],
  "schedule": [{"time": "string", "title": "string"}, ...],
  "tickets": [{"name": "string", "price": number, "desc": "string"}, ...],
  "faqs": [{"q": "string", "a": "string"}, ...]
}

Create 3 highlights, 2-4 hosts, 4-6 schedule items, 2-3 ticket tiers, 3-5 FAQs. When scraped data is provided, use it as the primary source and refine it for our editorial style.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("No response from AI");

  let parsed;
  try {
    const cleaned = content.replace(/^```json\s?|\s?```$/g, "");
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Invalid AI response format");
  }

  const name = parsed.name || params.name || "Your Event";
  const slug = generateSlug(name);
  const heroImage = getHeroImageForCategory(mapKey);
  const venueImage = getVenueImageForCategory(mapKey);
  const dateStr = params.dateEnd ? `${params.dateStart} – ${params.dateEnd}` : params.dateStart;

  const hostsWithImages = (parsed.hosts || []).map((h: { name: string; role: string; bio: string }, i: number) => ({
    ...h,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(h.name)}&size=200&background=${["C4956A", "8C8578", "5C7C50", "1A1A1A"][i % 4]}&color=ffffff`,
  }));

  return {
    slug,
    name,
    tagline: parsed.tagline || "",
    category: params.category.toLowerCase(),
    theme: theme.id,
    city: params.city,
    venue: params.venue || "Venue TBA",
    address: "",
    date: dateStr,
    time: params.time,
    heroImage,
    venueImage,
    highlights: parsed.highlights || [],
    hosts: hostsWithImages,
    schedule: parsed.schedule || [],
    tickets: parsed.tickets || [],
    faqs: parsed.faqs || [],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      category,
      categoryId,
      name,
      city,
      dateStart,
      dateEnd,
      time,
      venue,
      capacity = 100,
      vibe = "curated",
      extra,
      scrapedData,
    } = body;

    const hasScraped = scrapedData && typeof scrapedData === "object";
    const scrapedCategory = hasScraped && scrapedData.category ? String(scrapedData.category).toLowerCase() : "";
    const categoryKey = (categoryId || category || scrapedCategory || "").toLowerCase().replace(/\s+/g, "_").replace(/&/g, "_");
    const mapKey = categoryKey.includes("fashion") ? "fashion" : categoryKey.includes("food") ? "food" : categoryKey.includes("art") ? "art" : categoryKey.includes("wellness") ? "wellness" : categoryKey.includes("music") ? "music" : "market";

    const resolvedCity = city || scrapedData?.city || "";
    const resolvedDate = dateStart || scrapedData?.dateStart || scrapedData?.date || "";
    const resolvedTime = time || scrapedData?.time || "";

    if (!resolvedCity || !resolvedDate || !resolvedTime) {
      return NextResponse.json(
        { error: "Missing required fields: city, date, and time (provide directly or via scraped URL)" },
        { status: 400 }
      );
    }

    const mergedParams = {
      category: mapKey,
      name: name || scrapedData?.name,
      city: resolvedCity,
      dateStart: resolvedDate,
      dateEnd: dateEnd || scrapedData?.dateEnd,
      time: resolvedTime,
      venue: venue || scrapedData?.venue,
      capacity: capacity ?? scrapedData?.capacity ?? 100,
      vibe,
      extra,
      scrapedData: hasScraped ? scrapedData : undefined,
    };

    let eventData;
    if (process.env.OPENAI_API_KEY) {
      eventData = await generateWithAI(mergedParams);
    } else {
      eventData = templateEvent(mergedParams);
    }

    const supabase = getServiceRoleClient();
    const userId = body.userId ?? null;

    if (supabase && userId) {
      const { error } = await supabase.from("events").insert({
        user_id: userId,
        slug: eventData.slug,
        name: eventData.name,
        tagline: eventData.tagline,
        category: mapKey,
        theme: eventData.theme,
        status: "draft",
        content: eventData,
        hero_image: eventData.heroImage,
        venue: eventData.venue,
        address: eventData.address,
        city: eventData.city,
        date_start: eventData.date,
        time: eventData.time,
        capacity: capacity,
      });

      if (error) {
        console.error("Supabase insert error:", error);
      }
    }

    return NextResponse.json(eventData);
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
