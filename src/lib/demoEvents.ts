import type { EventData } from "@/types/event";

export const DEMO_EVENT_SLUGS = ["warehouse-rave", "brooklyn-flea-vintage"] as const;

export const DEMO_EVENTS: Record<string, EventData> = {
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
      { q: "Is there a coat check?", a: "Yes. €2." },
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
      { title: "Rare Records", desc: "Vinyl hunters’ paradise. Jazz, soul, rock, and more." },
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
      { q: "How do I become a vendor?", a: "Apply at brooklynflea.com/vendors." },
    ],
  },
};

export function getDemoEvent(slug: string): EventData | null {
  return DEMO_EVENTS[slug] ?? null;
}

export function isDemoEvent(slug: string): boolean {
  return slug in DEMO_EVENTS;
}
