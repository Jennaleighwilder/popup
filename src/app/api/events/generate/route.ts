import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { selectThemeForCategory } from "@/lib/themes";
import { getServiceRoleClient } from "@/lib/supabase";

const CATEGORY_IMAGES: Record<string, string> = {
  fashion: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop",
  food: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop",
  art: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1920&h=1080&fit=crop",
  wellness: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920&h=1080&fit=crop",
  music: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop",
  market: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop",
};

const VENUE_IMAGES: Record<string, string> = {
  fashion: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=800&fit=crop",
  food: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=800&fit=crop",
  art: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&h=800&fit=crop",
  wellness: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&h=800&fit=crop",
  music: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop",
  market: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=800&fit=crop",
};

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
  const heroImage = CATEGORY_IMAGES[mapKey] || CATEGORY_IMAGES.fashion;
  const venueImage = VENUE_IMAGES[mapKey] || VENUE_IMAGES.fashion;

  const dateStr = params.dateEnd
    ? `${params.dateStart} – ${params.dateEnd}`
    : params.dateStart;

  return {
    slug,
    name,
    tagline: `${params.vibe} ${params.category} experience in ${params.city}`,
    category: params.category.toLowerCase(),
    theme: theme.id,
    city: params.city,
    venue: params.venue || "Venue TBA",
    address: params.venue ? "Address to be confirmed" : "",
    date: dateStr,
    time: params.time,
    heroImage,
    venueImage,
    highlights: [
      { title: "Curated Experience", desc: `A carefully crafted ${params.vibe.toLowerCase()} experience for ${params.capacity} guests.` },
      { title: "Community", desc: "Connect with like-minded creators and attendees." },
      { title: "Memorable Moments", desc: "Designed to create lasting impressions." },
    ],
    hosts: [
      { name: "Host One", role: "Organizer", bio: "Passionate about bringing people together.", image: "https://ui-avatars.com/api/?name=Host+One&size=200&background=C4956A&color=ffffff" },
      { name: "Host Two", role: "Curator", bio: "Creating meaningful experiences.", image: "https://ui-avatars.com/api/?name=Host+Two&size=200&background=8C8578&color=ffffff" },
    ],
    schedule: [
      { time: "10:00 AM", title: "Doors Open & Welcome" },
      { time: "11:00 AM", title: "Main Program" },
      { time: "1:00 PM", title: "Break & Networking" },
      { time: "2:00 PM", title: "Afternoon Session" },
      { time: "4:00 PM", title: "Closing & Farewell" },
    ],
    tickets: [
      { name: "General Admission", price: 0, desc: "Full access to the event" },
      { name: "VIP", price: 49, desc: "Early access + exclusive perks" },
    ],
    faqs: [
      { q: "What is the dress code?", a: "Smart casual. Dress to impress." },
      { q: "Is parking available?", a: "Street parking and nearby options." },
      { q: "Can I get a refund?", a: "Full refunds up to 7 days before." },
    ],
  };
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
}) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const theme = selectThemeForCategory(params.category, params.vibe);
  const mapKey = params.category;

  const prompt = `You are an event copywriter for a luxury lifestyle event platform. Generate compelling event content as JSON.

Category: ${params.category}
City: ${params.city}
Date: ${params.dateStart}${params.dateEnd ? ` to ${params.dateEnd}` : ""}
Time: ${params.time}
Venue: ${params.venue || "TBA"}
Capacity: ${params.capacity}
Vibe: ${params.vibe}
${params.name ? `Event name (use or adapt): ${params.name}` : "Create a compelling event name"}
${params.extra ? `Extra instructions: ${params.extra}` : ""}

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

Create 3 highlights, 2-4 hosts, 4-6 schedule items, 2-3 ticket tiers, 3-5 FAQs. Make it feel editorial and luxurious.`;

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
  const heroImage = CATEGORY_IMAGES[mapKey] || CATEGORY_IMAGES.fashion;
  const venueImage = VENUE_IMAGES[mapKey] || VENUE_IMAGES.fashion;
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
    } = body;

    const categoryKey = (categoryId || category || "").toLowerCase().replace(/\s+/g, "_").replace(/&/g, "_");
    const mapKey = categoryKey.includes("fashion") ? "fashion" : categoryKey.includes("food") ? "food" : categoryKey.includes("art") ? "art" : categoryKey.includes("wellness") ? "wellness" : categoryKey.includes("music") ? "music" : "market";

    if ((!category && !categoryId) || !city || !dateStart || !time) {
      return NextResponse.json(
        { error: "Missing required fields: category, city, dateStart, time" },
        { status: 400 }
      );
    }

    let eventData;
    if (process.env.OPENAI_API_KEY) {
      eventData = await generateWithAI({
        category: mapKey,
        name,
        city,
        dateStart,
        dateEnd,
        time,
        venue,
        capacity,
        vibe,
        extra,
      });
    } else {
      eventData = templateEvent({
        category: mapKey,
        name,
        city,
        dateStart,
        dateEnd,
        time,
        venue,
        capacity,
        vibe,
        extra,
      });
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
