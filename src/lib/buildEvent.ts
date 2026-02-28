import { selectThemeForCategory } from "@/lib/themes";
import type { EventData } from "@/types/event";

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

const DEFAULT_NAMES: Record<string, string> = {
  fashion: "The Edit — Spring Sample Sale",
  food: "The Long Table",
  art: "First Friday Art Walk",
  wellness: "Morning Rituals",
  music: "The Listening Room",
  market: "The Makers Market",
};

const CATEGORY_LABELS: Record<string, string> = {
  fashion: "Fashion & Retail",
  food: "Food & Drink",
  art: "Art & Exhibition",
  wellness: "Wellness & Beauty",
  music: "Music & Nightlife",
  market: "Markets & Craft",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDateRange(start: string, end?: string): string {
  if (!start) return "";
  if (!end || end === start) {
    const d = new Date(start + "T12:00:00");
    return isNaN(d.getTime()) ? start : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  const s = new Date(start + "T12:00:00");
  const e = new Date(end + "T12:00:00");
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return `${start} – ${end}`;
  return `${s.toLocaleDateString("en-US", { month: "long", day: "numeric" })} – ${e.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;
}

export interface CreateFormData {
  name: string;
  aiName: boolean;
  tagline: string;
  city: string;
  dateStart: string;
  dateEnd: string;
  time: string;
  venue: string;
  address: string;
  capacity: number;
  vibe: string;
  extra: string;
}

function buildFashionEvent(formData: CreateFormData, base: Partial<EventData>): EventData {
  return {
    ...base,
    highlights: [
      { title: "200+ Designer Pieces", desc: "Curated selection from top brands at up to 70% off retail." },
      { title: "Complimentary Styling", desc: "Personal styling sessions with our in-house experts." },
      { title: "Cocktails & DJ", desc: "Shop to a curated soundtrack with welcome drinks." },
    ],
    hosts: [
      { name: "Maison Noir", role: "Featured Designer", bio: "Independent luxury from NYC.", image: "https://ui-avatars.com/api/?name=Maison+Noir&size=200&background=C4956A&color=ffffff" },
      { name: "Webb Gallery", role: "Featured Designer", bio: "Contemporary fashion curation.", image: "https://ui-avatars.com/api/?name=Webb+Gallery&size=200&background=8C8578&color=ffffff" },
    ],
    schedule: [],
    brands: ["Maison Noir", "Webb Gallery", "Park Studio", "Rivera Atelier"],
    shoppingRules: ["All sales final", "No try-ons", "Cash & card accepted", "No large bags or strollers"],
    scarcityMessage: "Limited quantities · First come, first served",
    tickets: [
      { name: "Free RSVP", price: 0, desc: "General admission" },
      { name: "VIP Early Access", price: 45, desc: "One hour early entry + gift bag" },
    ],
    faqs: [
      { q: "What is the dress code?", a: "Smart casual. Dress to impress." },
      { q: "Are refunds available?", a: "All sales final. No returns or exchanges." },
      { q: "What payment methods?", a: "Cash and all major cards accepted." },
    ],
  } as EventData;
}

function buildFoodEvent(formData: CreateFormData, base: Partial<EventData>): EventData {
  return {
    ...base,
    capacity: formData.capacity,
    highlights: [
      { title: "Five-Course Journey", desc: "A carefully crafted tasting menu through seasonal ingredients." },
      { title: "Wine Pairing", desc: "Each course paired with a curated selection." },
      { title: "Intimate Setting", desc: `Limited to ${formData.capacity} guests for an exclusive experience.` },
    ],
    hosts: [
      { name: "Chef Alexandra Chen", role: "Executive Chef, Maison Noir", bio: "Former Michelin-starred chef. Creating intimate culinary experiences.", image: "https://ui-avatars.com/api/?name=Alexandra+Chen&size=200&background=C4956A&color=ffffff" },
    ],
    schedule: [
      { time: "6:30 PM", title: "Welcome drinks & amuse-bouche" },
      { time: "7:00 PM", title: "First course · Seasonal crudo" },
      { time: "7:45 PM", title: "Second course · Handmade pasta" },
      { time: "8:30 PM", title: "Third course · Main" },
      { time: "9:15 PM", title: "Fourth course · Cheese" },
      { time: "9:45 PM", title: "Fifth course · Dessert" },
    ],
    menu: [
      { course: "Seasonal crudo", pairing: "Champagne" },
      { course: "Handmade pasta", pairing: "Barolo" },
      { course: "Grilled ribeye", pairing: "Cabernet" },
      { course: "Artisan cheese", pairing: "Port" },
      { course: "Chocolate soufflé", pairing: "Dessert wine" },
    ],
    whatsIncluded: ["Five-course tasting menu", "Wine pairing", "Welcome cocktail", "Amuse-bouche"],
    whatsNotIncluded: ["Additional drinks at the bar"],
    dietaryNote: "Please note any dietary requirements at booking.",
    tickets: [
      { name: "Tasting Menu", price: 85, desc: "Five courses" },
      { name: "With Wine Pairing", price: 125, desc: "Full experience" },
    ],
    faqs: [
      { q: "What is the dress code?", a: "Smart casual." },
      { q: "Can you accommodate dietary needs?", a: "Yes. Please note requirements at booking." },
      { q: "What is the cancellation policy?", a: "Full refund up to 48 hours before." },
    ],
  } as EventData;
}

function buildArtEvent(formData: CreateFormData, base: Partial<EventData>): EventData {
  const dateStr = base.date || "";
  return {
    ...base,
    highlights: [
      { title: "New Works", desc: "A collection of recent pieces exploring light and form." },
      { title: "Artist Statement", desc: "An intimate look at the creative process." },
      { title: "Opening Reception", desc: "Join us for an evening with the artist." },
    ],
    hosts: [
      { name: "Elena Rivera", role: "Artist", bio: "Working across sculpture and installation. Exhibited at Tate Modern, MoMA PS1.", image: "https://ui-avatars.com/api/?name=Elena+Rivera&size=200&background=C4956A&color=ffffff" },
    ],
    schedule: [],
    artistBio: "Elena Rivera's work explores the boundaries between object and space. Her installations have been featured in major institutions and biennials internationally.",
    featuredWorks: [
      { title: "Untitled (Light Study)", desc: "Mixed media, 2024" },
      { title: "Threshold", desc: "Installation, 2024" },
      { title: "Passage", desc: "Sculpture, 2023" },
    ],
    exhibitionDates: dateStr,
    relatedProgramming: [
      { title: "Artist talk", when: "Saturday 3pm" },
      { title: "Curator-led tour", when: "Sunday 1pm" },
    ],
    tickets: [
      { name: "Opening Reception", price: 0, desc: "Free admission" },
      { name: "Patron's Preview", price: 150, desc: "Private viewing + dinner with artist" },
    ],
    faqs: [
      { q: "Is the opening free?", a: "Yes. The opening reception is free and open to all." },
      { q: "What are gallery hours?", a: "Tuesday–Saturday, 11am–6pm." },
      { q: "Press inquiries?", a: "Contact gallery@example.com" },
    ],
  } as EventData;
}

function buildWellnessEvent(formData: CreateFormData, base: Partial<EventData>): EventData {
  return {
    ...base,
    highlights: [
      { title: "Grounding Breathwork", desc: "We begin by settling into the space." },
      { title: "Gentle Movement", desc: "A slow vinyasa flow to awaken the body." },
      { title: "Cacao & Journaling", desc: "We close with intention-setting and reflection." },
    ],
    hosts: [
      { name: "Sophie Laurent", role: "Guide", bio: "Certified yoga and breathwork facilitator. Creating spaces for deep rest and renewal.", image: "https://ui-avatars.com/api/?name=Sophie+Laurent&size=200&background=C4956A&color=ffffff" },
    ],
    schedule: [],
    journey: [
      { step: "Arrival & settling", desc: "We invite you to arrive, remove your shoes, and find your place." },
      { step: "Grounding breathwork", desc: "We begin with 15 minutes of breath to drop into the body." },
      { step: "Gentle vinyasa flow", desc: "A 45-minute practice suitable for all levels." },
      { step: "Cacao ceremony", desc: "We share ceremonial cacao and set intentions." },
      { step: "Journaling & closing", desc: "Quiet reflection before we part." },
    ],
    whatToBring: ["Yoga mat", "Water bottle", "Journal", "Open heart"],
    whatsProvided: ["Herbal tea", "Light snacks", "All materials", "Bolsters & blankets"],
    testimonials: [
      { quote: "A morning that changed how I move through my week.", author: "— Past attendee" },
    ],
    tickets: [
      { name: "Drop-in", price: 45, desc: "Single session" },
      { name: "Full Day", price: 120, desc: "All sessions + lunch" },
    ],
    faqs: [
      { q: "Is this suitable for beginners?", a: "Yes. All levels welcome." },
      { q: "What should I wear?", a: "Comfortable clothing you can move in." },
      { q: "Cancellation policy?", a: "Full refund up to 24 hours before." },
    ],
  } as EventData;
}

function buildMarketEvent(formData: CreateFormData, base: Partial<EventData>): EventData {
  return {
    ...base,
    highlights: [
      { title: "50+ Makers", desc: "Independent artisans in ceramics, jewelry, textiles, and more." },
      { title: "Live Music", desc: "Curated soundtrack throughout the day." },
      { title: "Street Food", desc: "Local vendors and refreshments." },
    ],
    hosts: [],
    schedule: [],
    vendors: [
      { name: "Clay & Co", category: "Ceramics", image: "https://ui-avatars.com/api/?name=Clay&size=120&background=C4956A&color=ffffff" },
      { name: "Gold Thread", category: "Jewelry", image: "https://ui-avatars.com/api/?name=Gold+Thread&size=120&background=8C8578&color=ffffff" },
      { name: "Linen House", category: "Textiles", image: "https://ui-avatars.com/api/?name=Linen&size=120&background=5C7C50&color=ffffff" },
      { name: "Print Press", category: "Prints", image: "https://ui-avatars.com/api/?name=Print+Press&size=120&background=1A1A1A&color=ffffff" },
    ],
    whatsHappening: ["Live music", "Street food", "Kids' activities", "Workshops"],
    gettingThere: "Street parking available. 5 min walk from nearest transit. Bike racks on site.",
    vendorApplication: "Want to sell? Apply by the 1st of the month. Email apply@market.com",
    tickets: [
      { name: "Free Entry", price: 0, desc: "Suggested $5 donation" },
    ],
    faqs: [
      { q: "Is there parking?", a: "Street parking and nearby lots." },
      { q: "Is it free?", a: "Free entry. $5 suggested donation." },
      { q: "How do I apply to sell?", a: "Email apply@market.com by the 1st." },
    ],
  } as EventData;
}

function buildMusicEvent(formData: CreateFormData, base: Partial<EventData>): EventData {
  return {
    ...base,
    highlights: [
      { title: "Curated Sound", desc: "An evening of carefully selected music." },
      { title: "Intimate Setting", desc: "Limited capacity for an immersive experience." },
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
      { time: "1:00 AM", title: "Closing" },
    ],
    tickets: [
      { name: "General Admission", price: 25, desc: "Full night access" },
      { name: "VIP", price: 75, desc: "Reserved seating + bottle service" },
    ],
    faqs: [
      { q: "What is the dress code?", a: "Smart casual." },
      { q: "Is there a coat check?", a: "Yes." },
      { q: "Age requirement?", a: "21+." },
    ],
  } as EventData;
}

export function buildEventFromForm(
  formData: CreateFormData,
  categoryId: string
): EventData {
  const mapKey = categoryId || "fashion";
  const theme = selectThemeForCategory(mapKey, formData.vibe.toLowerCase());
  const categoryLabel = CATEGORY_LABELS[mapKey] || "Event";

  const name = formData.aiName
    ? (formData.name?.trim() || DEFAULT_NAMES[mapKey] || "Your Event")
    : (formData.name?.trim() || DEFAULT_NAMES[mapKey] || "Your Event");

  const slug = slugify(name) || `event-${Date.now().toString(36)}`;
  const heroImage = CATEGORY_IMAGES[mapKey] || CATEGORY_IMAGES.fashion;
  const venueImage = VENUE_IMAGES[mapKey] || VENUE_IMAGES.fashion;

  const dateStr = formatDateRange(formData.dateStart, formData.dateEnd || undefined);
  const tagline =
    formData.tagline?.trim() ||
    `A ${formData.vibe.toLowerCase()} ${categoryLabel.toLowerCase()} experience in ${formData.city}`;
  const address = formData.address?.trim() || "";

  const base: Partial<EventData> = {
    slug,
    name,
    tagline,
    category: mapKey,
    theme: theme.id,
    city: formData.city,
    venue: formData.venue?.trim() || "Venue TBA",
    address,
    date: dateStr,
    time: formData.time,
    heroImage,
    venueImage,
    highlights: [],
    hosts: [],
    schedule: [],
    tickets: [],
    faqs: [],
  };

  switch (mapKey) {
    case "fashion":
      return buildFashionEvent(formData, base);
    case "food":
      return buildFoodEvent(formData, base);
    case "art":
      return buildArtEvent(formData, base);
    case "wellness":
      return buildWellnessEvent(formData, base);
    case "market":
      return buildMarketEvent(formData, base);
    case "music":
    default:
      return buildMusicEvent(formData, base);
  }
}
