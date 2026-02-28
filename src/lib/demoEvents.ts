import type { EventData } from "@/types/event";
import type { ThemeId } from "@/lib/themes";

/** Map each theme to its demo event slug — theme cards open these demos */
export const THEME_TO_DEMO_SLUG: Record<ThemeId, string> = {
  atelier: "the-edit-sample-sale",
  harvest: "the-long-table",
  gallery: "first-friday-art-walk",
  botanica: "morning-rituals",
  soiree: "the-listening-room",
  brutalist: "raw-space",
  zen: "tea-ceremony",
  maximalist: "the-carnival",
  neon: "warehouse-rave",
  vintage: "brooklyn-flea-vintage",
};

export const DEMO_EVENT_SLUGS = Object.values(THEME_TO_DEMO_SLUG);

export const DEMO_EVENTS: Record<string, EventData> = {
  "the-edit-sample-sale": {
    slug: "the-edit-sample-sale",
    name: "The Edit — Spring Sample Sale",
    tagline: "200+ designer pieces. Up to 70% off. One weekend only.",
    category: "fashion",
    theme: "atelier",
    city: "New York",
    venue: "The Loft on Spring",
    date: "March 15–17, 2026",
    time: "10 AM – 7 PM",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=800&fit=crop",
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
    tickets: [
      { name: "Free RSVP", price: 0, desc: "General admission" },
      { name: "VIP Early Access", price: 45, desc: "One hour early entry + gift bag" },
    ],
    faqs: [
      { q: "What is the dress code?", a: "Smart casual. Dress to impress." },
      { q: "Are refunds available?", a: "All sales final. No returns or exchanges." },
    ],
  },
  "the-long-table": {
    slug: "the-long-table",
    name: "The Long Table",
    tagline: "Five courses. Wine pairing. Intimate setting.",
    category: "food",
    theme: "harvest",
    city: "Brooklyn",
    venue: "The Farmhouse",
    date: "April 12, 2026",
    time: "6:30 PM",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=800&fit=crop",
    highlights: [
      { title: "Five-Course Journey", desc: "A carefully crafted tasting menu through seasonal ingredients." },
      { title: "Wine Pairing", desc: "Each course paired with a curated selection." },
      { title: "Intimate Setting", desc: "Limited to 24 guests for an exclusive experience." },
    ],
    hosts: [
      { name: "Chef Alexandra Chen", role: "Executive Chef", bio: "Former Michelin-starred chef. Creating intimate culinary experiences.", image: "https://ui-avatars.com/api/?name=Alexandra+Chen&size=200&background=8B4513&color=ffffff" },
    ],
    schedule: [
      { time: "6:30 PM", title: "Welcome drinks & amuse-bouche" },
      { time: "7:00 PM", title: "First course · Seasonal crudo" },
      { time: "7:45 PM", title: "Second course · Handmade pasta" },
      { time: "8:30 PM", title: "Third course · Main" },
      { time: "9:45 PM", title: "Dessert" },
    ],
    tickets: [
      { name: "Tasting Menu", price: 85, desc: "Five courses" },
      { name: "With Wine Pairing", price: 125, desc: "Full experience" },
    ],
    faqs: [
      { q: "What is the dress code?", a: "Smart casual." },
      { q: "Can you accommodate dietary needs?", a: "Yes. Please note at booking." },
    ],
  },
  "first-friday-art-walk": {
    slug: "first-friday-art-walk",
    name: "First Friday Art Walk",
    tagline: "New works. Artist talk. Opening reception.",
    category: "art",
    theme: "gallery",
    city: "Los Angeles",
    venue: "Rivera Gallery",
    date: "May 2, 2026",
    time: "6–9 PM",
    heroImage: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&h=800&fit=crop",
    highlights: [
      { title: "New Works", desc: "A collection of recent pieces exploring light and form." },
      { title: "Artist Statement", desc: "An intimate look at the creative process." },
      { title: "Opening Reception", desc: "Join us for an evening with the artist." },
    ],
    hosts: [
      { name: "Elena Rivera", role: "Artist", bio: "Working across sculpture and installation. Exhibited at Tate Modern, MoMA PS1.", image: "https://ui-avatars.com/api/?name=Elena+Rivera&size=200&background=111111&color=ffffff" },
    ],
    schedule: [],
    tickets: [
      { name: "Opening Reception", price: 0, desc: "Free admission" },
      { name: "Patron's Preview", price: 150, desc: "Private viewing + dinner with artist" },
    ],
    faqs: [
      { q: "Is the opening free?", a: "Yes. Free and open to all." },
      { q: "Gallery hours?", a: "Tuesday–Saturday, 11am–6pm." },
    ],
  },
  "morning-rituals": {
    slug: "morning-rituals",
    name: "Morning Rituals",
    tagline: "Grounding breathwork. Gentle flow. Cacao & journaling.",
    category: "wellness",
    theme: "botanica",
    city: "Topanga",
    venue: "The Meadow Studio",
    date: "June 8, 2026",
    time: "8–11 AM",
    heroImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&h=800&fit=crop",
    highlights: [
      { title: "Grounding Breathwork", desc: "We begin by settling into the space." },
      { title: "Gentle Movement", desc: "A slow vinyasa flow to awaken the body." },
      { title: "Cacao & Journaling", desc: "We close with intention-setting and reflection." },
    ],
    hosts: [
      { name: "Sophie Laurent", role: "Guide", bio: "Certified yoga and breathwork facilitator. Creating spaces for deep rest.", image: "https://ui-avatars.com/api/?name=Sophie+Laurent&size=200&background=5C7C50&color=ffffff" },
    ],
    schedule: [],
    journey: [
      { step: "Arrival & settling", desc: "Remove your shoes and find your place." },
      { step: "Grounding breathwork", desc: "15 minutes of breath to drop into the body." },
      { step: "Gentle vinyasa flow", desc: "45-minute practice for all levels." },
      { step: "Cacao ceremony", desc: "Share ceremonial cacao and set intentions." },
    ],
    tickets: [
      { name: "Drop-in", price: 45, desc: "Single session" },
      { name: "Full Day", price: 120, desc: "All sessions + lunch" },
    ],
    faqs: [
      { q: "Suitable for beginners?", a: "Yes. All levels welcome." },
      { q: "What to wear?", a: "Comfortable clothing you can move in." },
    ],
  },
  "the-listening-room": {
    slug: "the-listening-room",
    name: "The Listening Room",
    tagline: "Curated sound. Intimate setting. Cocktails & conversation.",
    category: "music",
    theme: "soiree",
    city: "London",
    venue: "The Velvet Room",
    date: "July 19, 2026",
    time: "9 PM – 1 AM",
    heroImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop",
    highlights: [
      { title: "Curated Sound", desc: "An evening of carefully selected music." },
      { title: "Intimate Setting", desc: "Limited capacity for an immersive experience." },
      { title: "Cocktails & Conversation", desc: "Welcome drinks and mingling." },
    ],
    hosts: [
      { name: "DJ Marcus Webb", role: "Resident", bio: "Curating sound for over a decade.", image: "https://ui-avatars.com/api/?name=Marcus+Webb&size=200&background=D4AF37&color=0D0D0D" },
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
      { q: "Dress code?", a: "Smart casual." },
      { q: "Age requirement?", a: "21+." },
    ],
  },
  "raw-space": {
    slug: "raw-space",
    name: "RAW SPACE",
    tagline: "NO DECOR. NO PRETENSE. JUST SOUND.",
    category: "music",
    theme: "brutalist",
    city: "Berlin",
    venue: "TBA",
    date: "August 2, 2026",
    time: "11 PM – 6 AM",
    heroImage: "https://images.unsplash.com/photo-1513584684374-8b748c0e6c4a?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1513584684374-8b748c0e6c4a?w=1920&h=800&fit=crop",
    highlights: [
      { title: "RAW SOUND", desc: "Industrial techno. No frills." },
      { title: "CONCRETE", desc: "Unfinished space. Exposed everything." },
      { title: "ANONYMOUS", desc: "Location sent night-of." },
    ],
    hosts: [
      { name: "Void", role: "Resident", bio: "Berlin. Industrial.", image: "https://ui-avatars.com/api/?name=Void&size=200&background=000000&color=FF3B00" },
    ],
    schedule: [
      { time: "11 PM", title: "Doors" },
      { time: "12 AM", title: "Void" },
      { time: "4 AM", title: "B2B" },
      { time: "6 AM", title: "Out" },
    ],
    tickets: [
      { name: "Entry", price: 12, desc: "Cash at door" },
    ],
    faqs: [
      { q: "Where is it?", a: "Address sent 2 hours before." },
      { q: "Age?", a: "18+." },
    ],
  },
  "tea-ceremony": {
    slug: "tea-ceremony",
    name: "Tea Ceremony",
    tagline: "Slow. Intentional. Silence.",
    category: "wellness",
    theme: "zen",
    city: "Kyoto",
    venue: "The Garden House",
    date: "September 14, 2026",
    time: "2–4 PM",
    heroImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&h=800&fit=crop",
    highlights: [
      { title: "Traditional Matcha", desc: "Prepared in silence." },
      { title: "Wabi-Sabi", desc: "Imperfect beauty. Vast space." },
      { title: "Presence", desc: "No phones. No rush." },
    ],
    hosts: [
      { name: "Sensei Mori", role: "Tea Master", bio: "40 years. Kyoto.", image: "https://ui-avatars.com/api/?name=Sensei+Mori&size=200&background=8B7355&color=F5F2EC" },
    ],
    schedule: [],
    tickets: [
      { name: "Ceremony", price: 85, desc: "One seating. 8 guests." },
    ],
    faqs: [
      { q: "What to wear?", a: "Comfortable. Modest." },
      { q: "Silence?", a: "Yes. For the duration." },
    ],
  },
  "the-carnival": {
    slug: "the-carnival",
    name: "The Carnival",
    tagline: "Rich. Layered. Joyful chaos. Costumes encouraged.",
    category: "music",
    theme: "maximalist",
    city: "New Orleans",
    venue: "The Grand Ballroom",
    date: "October 31, 2026",
    time: "8 PM – 2 AM",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=1920&h=800&fit=crop",
    highlights: [
      { title: "Live Brass Band", desc: "Second line. Parade. Mardi Gras energy." },
      { title: "Costume Contest", desc: "Prizes for best dressed." },
      { title: "Open Bar", desc: "Sazeracs. Hurricanes. Beads." },
    ],
    hosts: [
      { name: "The Krewe", role: "Hosts", bio: "New Orleans finest.", image: "https://ui-avatars.com/api/?name=The+Krewe&size=200&background=E63946&color=ffffff" },
    ],
    schedule: [
      { time: "8 PM", title: "Doors" },
      { time: "9 PM", title: "Brass band" },
      { time: "10 PM", title: "Costume contest" },
      { time: "11 PM", title: "DJ" },
    ],
    tickets: [
      { name: "General", price: 45, desc: "Full access" },
      { name: "VIP", price: 120, desc: "Reserved table + bottle" },
    ],
    faqs: [
      { q: "Costume required?", a: "Encouraged, not required." },
      { q: "Age?", a: "21+." },
    ],
  },
  "warehouse-rave": {
    slug: "warehouse-rave",
    name: "WAREHOUSE 404",
    tagline: "SYSTEM ONLINE. LOCATION DISCLOSED AT 9PM.",
    category: "music",
    theme: "neon",
    city: "Berlin",
    venue: "Disclosed 2 hours before event",
    date: "July 5, 2026",
    time: "10:00 PM – 6:00 AM",
    heroImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop",
    highlights: [
      { title: "Techno & Ambient", desc: "KRSN brings driving techno. Yumi Nakamura closes with ambient and IDM." },
      { title: "Sunrise Session", desc: "B2B until 6 AM, then sunrise on the roof." },
      { title: "Secret Location", desc: "Address sent to ticket holders 2 hours before doors." },
    ],
    hosts: [
      { name: "KRSN", role: "Techno", bio: "Berlin-based. Driving, hypnotic sets.", image: "https://ui-avatars.com/api/?name=KRSN&size=200&background=00FF88&color=0A0A0F" },
      { name: "Yumi Nakamura", role: "Ambient / IDM", bio: "Tokyo → Berlin. Textural, immersive.", image: "https://ui-avatars.com/api/?name=Yumi+Nakamura&size=200&background=FF00AA&color=0A0A0F" },
    ],
    schedule: [
      { time: "10 PM", title: "Doors" },
      { time: "11 PM", title: "KRSN" },
      { time: "2 AM", title: "Yumi Nakamura" },
      { time: "4 AM", title: "B2B" },
      { time: "6 AM", title: "Sunrise" },
    ],
    tickets: [
      { name: "Entry", price: 15, desc: "General admission" },
      { name: "Priority + Drink", price: 25, desc: "Skip the line + 1 drink" },
    ],
    faqs: [
      { q: "When do I get the address?", a: "2 hours before doors. Check your email and SMS." },
      { q: "Age requirement?", a: "18+." },
    ],
  },
  "brooklyn-flea-vintage": {
    slug: "brooklyn-flea-vintage",
    name: "Brooklyn Flea: Summer Vintage",
    tagline: "Vintage finds, rare records, and cold lemonade since 2008",
    category: "market",
    theme: "vintage",
    city: "Brooklyn",
    venue: "DUMBO Archway (Water St under Manhattan Bridge)",
    date: "Every Saturday, June–September 2026",
    time: "10 AM – 5 PM",
    heroImage: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=1920&h=1080&fit=crop",
    highlights: [
      { title: "Vintage & Antiques", desc: "Curated vendors with furniture, clothing, and collectibles." },
      { title: "Rare Records", desc: "Vinyl hunters' paradise. Jazz, soul, rock, and more." },
      { title: "Cold Lemonade", desc: "Since 2008. The original Brooklyn Flea refreshment." },
    ],
    hosts: [],
    schedule: [],
    vendors: [
      { name: "Retro Revival", category: "Vintage Clothing", image: "https://ui-avatars.com/api/?name=Retro+Revival&size=120&background=8B0000&color=F4ECD8" },
      { name: "The Vinyl Vault", category: "Records", image: "https://ui-avatars.com/api/?name=Vinyl+Vault&size=120&background=1B4D3E&color=F4ECD8" },
      { name: "Old World Antiques", category: "Furniture & Decor", image: "https://ui-avatars.com/api/?name=Old+World&size=120&background=C9B896&color=2C1810" },
      { name: "Paper & Ink", category: "Prints & Ephemera", image: "https://ui-avatars.com/api/?name=Paper+Ink&size=120&background=7A6652&color=F4ECD8" },
      { name: "Brass & Glass", category: "Lighting & Hardware", image: "https://ui-avatars.com/api/?name=Brass+Glass&size=120&background=1B4D3E&color=F4ECD8" },
      { name: "Thread & Thimble", category: "Textiles", image: "https://ui-avatars.com/api/?name=Thread+Thimble&size=120&background=8B0000&color=F4ECD8" },
    ],
    whatsHappening: ["Live music", "Food vendors", "Lemonade stand", "Kids welcome"],
    gettingThere: "F train to York St. Walk under the Manhattan Bridge to Water St. Bike racks on Water St.",
    tickets: [
      { name: "Free Entry", price: 0, desc: "Open to all" },
    ],
    faqs: [
      { q: "Is it free?", a: "Yes. Free entry. Bring cash for vendors." },
      { q: "Rain or shine?", a: "Rain or shine. Covered archway area." },
    ],
  },
};

export function getDemoEvent(slug: string): EventData | null {
  return DEMO_EVENTS[slug] ?? null;
}

export function isDemoEvent(slug: string): boolean {
  return slug in DEMO_EVENTS;
}

export function getDemoSlugForTheme(themeId: ThemeId): string {
  return THEME_TO_DEMO_SLUG[themeId] ?? "the-edit-sample-sale";
}
