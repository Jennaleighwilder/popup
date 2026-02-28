import type { EventData } from "@/types/event";
import type { ThemeId } from "@/lib/themes";

/** Map theme IDs to demo slugs — theme cards link to these demos */
export const THEME_TO_DEMO_SLUG: Record<ThemeId, string> = {
  atelier: "the-edit-spring-sample-sale",
  harvest: "the-long-table",
  gallery: "first-friday-art-walk",
  botanica: "morning-rituals",
  soiree: "golden-hour-sessions",
  brutalist: "golden-hour-sessions",
  zen: "morning-rituals",
  maximalist: "golden-hour-sessions",
  neon: "golden-hour-sessions",
  vintage: "the-makers-market",
};

export const DEMO_EVENT_SLUGS = [
  "the-edit-spring-sample-sale",
  "the-long-table",
  "first-friday-art-walk",
  "morning-rituals",
  "the-makers-market",
  "golden-hour-sessions",
];

export const DEMO_EVENTS: Record<string, EventData> = {
  "the-edit-spring-sample-sale": {
    slug: "the-edit-spring-sample-sale",
    name: "The Edit — Spring Sample Sale",
    tagline: "Three days of designer fashion at up to 70% off",
    category: "fashion",
    theme: "atelier",
    city: "New York",
    venue: "The Loft on Spring",
    address: "161 Spring Street, SoHo",
    date: "May 15-17, 2026",
    time: "10:00 AM - 7:00 PM",
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=800&fit=crop",
    highlights: [
      { title: "Curated Designers", desc: "40+ independent designers from NYC, LA, and London" },
      { title: "Personal Styling", desc: "Book a 30-minute session with our in-house stylists" },
      { title: "Cocktails & Music", desc: "Live DJ sets and a complimentary prosecco bar" },
    ],
    hosts: [
      { name: "Maison Noir", role: "Featured Designer", bio: "Independent luxury from NYC.", image: "https://ui-avatars.com/api/?name=Maison+Noir&size=200&background=C4956A&color=ffffff" },
      { name: "Webb Gallery", role: "Featured Designer", bio: "Curator and collector of contemporary fashion.", image: "https://ui-avatars.com/api/?name=Webb+Gallery&size=200&background=8C8578&color=ffffff" },
    ],
    schedule: [],
    brands: ["Maison Noir", "Webb Gallery", "Park Studio", "Rivera Atelier", "Zimmermann", "Tom Ford"],
    shoppingRules: ["All sales final", "No try-ons", "Cash & card accepted", "No large bags or strollers"],
    scarcityMessage: "Limited quantities · First come, first served",
    tickets: [
      { name: "General Admission", price: 0, desc: "Access to all three days" },
      { name: "VIP Preview", price: 45, desc: "Early access + styling session + gift bag" },
      { name: "Collector's Pass", price: 95, desc: "All VIP perks + private designer dinner" },
    ],
    faqs: [
      { q: "What is the dress code?", a: "Smart casual. We encourage expressing your personal style." },
      { q: "Is parking available?", a: "Street parking and nearby garages. We recommend rideshare." },
      { q: "Can I bring a guest?", a: "General Admission includes one guest. VIP tiers include two." },
      { q: "Are refunds available?", a: "All sales final. No returns or exchanges." },
      { q: "Will there be food?", a: "Light bites and prosecco. Lunch break has nearby options." },
    ],
  },

  "the-long-table": {
    slug: "the-long-table",
    name: "The Long Table",
    tagline: "A five-course journey through the south of France",
    category: "food",
    theme: "harvest",
    city: "London",
    venue: "The Vaults",
    address: "Leake Street, Waterloo",
    date: "June 8, 2026",
    time: "7:00 PM",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=800&fit=crop",
    capacity: 32,
    highlights: [
      { title: "Five Courses", desc: "A curated tasting menu inspired by Provence and the Côte d'Azur" },
      { title: "Wine Pairing", desc: "Sommelier-selected wines with each course" },
      { title: "Intimate Setting", desc: "32 guests at one long table in an unexpected space" },
    ],
    hosts: [
      {
        name: "Margaux Beaumont",
        role: "Head Chef",
        bio: "Former head chef at Le Cinq, Paris. Two Michelin stars. Now bringing intimate supper clubs to London's most unexpected spaces.",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&crop=face",
      },
    ],
    schedule: [],
    menu: [
      { course: "Amuse-bouche — Goat cheese mousse, lavender honey, toasted walnut", pairing: "Crémant de Loire" },
      { course: "Starter — Roasted beet carpaccio, burrata, aged balsamic, micro herbs", pairing: "Sancerre 2023" },
      { course: "Fish — Pan-seared sea bass, fennel purée, saffron beurre blanc", pairing: "Chablis Premier Cru" },
      { course: "Main — Slow-braised lamb shoulder, ratatouille, rosemary jus", pairing: "Châteauneuf-du-Pape 2019" },
      { course: "Dessert — Dark chocolate fondant, crème anglaise, salted caramel", pairing: "Muscat de Beaumes-de-Venise" },
    ],
    whatsIncluded: ["Five-course tasting menu", "Wine pairing with each course", "Welcome cocktail", "Amuse-bouche", "After-dinner digestif"],
    whatsNotIncluded: ["Additional drinks from the bar"],
    dietaryNote: "Please share dietary requirements when booking. We accommodate vegetarian, vegan, and gluten-free with advance notice.",
    tickets: [
      { name: "Tasting Menu", price: 85, desc: "Five courses, welcome cocktail" },
      { name: "With Wine Pairing", price: 125, desc: "Five courses plus sommelier-selected wines" },
    ],
    faqs: [
      { q: "What is the dress code?", a: "Smart casual. No shorts or sportswear." },
      { q: "What is your cancellation policy?", a: "Full refund up to 72 hours before. After that, no refunds." },
      { q: "Can you accommodate allergies?", a: "Yes. Please note allergies when booking and we'll adjust the menu." },
      { q: "Is parking available?", a: "Street parking nearby. Waterloo station is a 5-minute walk." },
    ],
  },

  "first-friday-art-walk": {
    slug: "first-friday-art-walk",
    name: "First Friday Art Walk",
    tagline: "A night of new work across six River Arts District studios",
    category: "art",
    theme: "gallery",
    city: "Asheville",
    venue: "River Arts District",
    address: "Multiple studios along Riverside Drive",
    date: "June 6, 2026",
    time: "5:00 PM – 9:00 PM",
    heroImage: "https://images.unsplash.com/photo-1577720643272-265f09367456?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1577720643272-265f09367456?w=1920&h=800&fit=crop",
    highlights: [
      { title: "Six Studios", desc: "28 working artists opening their doors for one night" },
      { title: "New Work", desc: "Fresh pieces, live demonstrations, and conversation" },
      { title: "Free & Open", desc: "No ticket required. RSVP for the studio map." },
    ],
    hosts: [
      {
        name: "River Arts District Collective",
        role: "28 Artists, 6 Studios",
        bio: "28 working artists across six studios, opening their doors for one night of new work, live demonstrations, and conversation.",
        image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=400&fit=crop",
      },
    ],
    schedule: [],
    artistBio: "Every first Friday, the River Arts District transforms. Six studios along Riverside Drive open their doors. Painters, sculptors, ceramicists, and printmakers share new work, demonstrate their process, and welcome visitors into their creative spaces.",
    featuredWorks: [
      { title: "Convergence", medium: "Mixed media on canvas", dimensions: "48 × 60 in", artist: "Sarah Whitfield", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=500&fit=crop" },
      { title: "Appalachian Light", medium: "Oil on linen", dimensions: "36 × 48 in", artist: "Thomas Crow", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=500&fit=crop" },
      { title: "Vessel Series", medium: "Hand-thrown stoneware", dimensions: "Variable", artist: "Keiko Matsuda", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=500&fit=crop" },
    ],
    exhibitionDates: "Every first Friday · Studios open 5:00–9:00 PM · Free and open to all",
    relatedProgramming: [
      { title: "Live printmaking demo at Studio 4", when: "6:30 PM" },
      { title: "Artist talk: Sarah Whitfield on process", when: "7:30 PM" },
      { title: "Wine reception at the courtyard", when: "8:00 PM" },
    ],
    tickets: [
      { name: "Free Entry", price: 0, desc: "RSVP to receive the studio map and parking guide" },
    ],
    faqs: [
      { q: "Do I need a ticket?", a: "No. It's free. RSVP to get the studio map and parking info." },
      { q: "Where do I park?", a: "Street parking along Riverside Drive. A map is sent with RSVP." },
      { q: "Can I buy art?", a: "Yes. Many pieces are for sale. Speak directly with the artists." },
    ],
  },

  "morning-rituals": {
    slug: "morning-rituals",
    name: "Morning Rituals",
    tagline: "A morning of breathwork, movement, and intention in the desert",
    category: "wellness",
    theme: "botanica",
    city: "Joshua Tree",
    venue: "The Integratron",
    address: "2477 Belfield Blvd, Landers, CA",
    date: "June 22, 2026",
    time: "7:00 AM – 12:00 PM",
    heroImage: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&h=800&fit=crop",
    highlights: [
      { title: "Breathwork", desc: "Gentle pranayama to arrive fully in your body" },
      { title: "Movement", desc: "Slow vinyasa flow — all levels welcome" },
      { title: "Sound Bath", desc: "Crystal singing bowls tuned to the chakras" },
    ],
    hosts: [
      {
        name: "Aria Solstice",
        role: "Breathwork Facilitator & Yoga Teacher",
        bio: "Breathwork facilitator, yoga teacher (500-hr RYT), and sound healer. Former dancer turned wellness guide. Based between Joshua Tree and Bali.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
      },
    ],
    schedule: [],
    journey: [
      { step: "Arrival", desc: "We begin in stillness. As the desert sun rises, we gather in a circle for opening breathwork — a gentle pranayama practice to arrive fully in our bodies.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop" },
      { step: "Movement", desc: "We move into a slow, intentional vinyasa flow. This isn't a workout — it's a conversation with your body. All levels welcome.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop" },
      { step: "Sound Bath", desc: "A sound bath follows. Crystal singing bowls tuned to the chakras fill the space as you rest in savasana.", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=400&fit=crop" },
      { step: "Cacao & Intention", desc: "We close with a cacao ceremony and journaling. Hot ceremonial cacao, a writing prompt, and space to set an intention for the month ahead.", image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=400&fit=crop" },
      { step: "Breakfast", desc: "We share a light breakfast together — fresh fruit, granola, herbal tea — as the morning warmth settles in.", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&h=400&fit=crop" },
    ],
    whatToBring: ["Yoga mat", "Water bottle", "Journal", "Layers", "Sunscreen", "An open heart"],
    whatsProvided: ["Ceremonial cacao", "Light breakfast", "Blankets and props", "Sound healing instruments", "All materials for journaling"],
    landscapeImages: [
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&h=500&fit=crop",
    ],
    testimonials: [
      { quote: "I've done retreats all over the world, and this was the most grounding experience I've ever had.", author: "— Maya, Los Angeles", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
      { quote: "Aria creates a space where you feel safe to let go completely.", author: "— James, San Francisco", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
      { quote: "The desert at sunrise, the singing bowls, the cacao — it all came together in a way I'll never forget.", author: "— Elena, San Diego", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
      { quote: "Exactly what my nervous system needed. I left feeling reset.", author: "— David, Austin", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" },
      { quote: "The Integratron is magical. Aria made it even more so.", author: "— Priya, Portland", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face" },
    ],
    tickets: [
      { name: "Drop-in", price: 55, desc: "Full morning experience" },
      { name: "Early Bird", price: 45, desc: "Book 2+ weeks in advance" },
    ],
    faqs: [
      { q: "Do I need yoga experience?", a: "No. All levels welcome. The practice is gentle and adaptable." },
      { q: "What should I wear?", a: "Comfortable layers. Desert mornings are cool; it warms up by 10." },
      { q: "Is food provided?", a: "Yes. Light breakfast and ceremonial cacao are included." },
    ],
  },

  "the-makers-market": {
    slug: "the-makers-market",
    name: "The Makers Market",
    tagline: "60+ independent artisans, makers, and growers under one roof",
    category: "market",
    theme: "harvest",
    city: "Brooklyn",
    venue: "Brooklyn Navy Yard, Building 77",
    address: "141 Flushing Ave",
    date: "June 14-15, 2026",
    time: "10:00 AM – 6:00 PM",
    heroImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&h=800&fit=crop",
    highlights: [
      { title: "60+ Vendors", desc: "Ceramics, fashion, food, art, and more" },
      { title: "Live Demos", desc: "Knife-sharpening, printmaking, and craft workshops" },
      { title: "Free Entry", desc: "Open to all. No ticket required." },
    ],
    hosts: [],
    schedule: [],
    vendors: [
      { name: "Moon & Tide Ceramics", category: "Handmade stoneware", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200&h=200&fit=crop" },
      { name: "Wildflower Apothecary", category: "Botanical skincare", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=200&fit=crop" },
      { name: "Sato Knives", category: "Hand-forged kitchen knives", image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=200&h=200&fit=crop" },
      { name: "Thread & Bone", category: "Upcycled fashion", image: "https://images.unsplash.com/photo-1558171813-4c5c5c99a9a8?w=200&h=200&fit=crop" },
      { name: "Little Creek Farm", category: "Organic honey & preserves", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop" },
      { name: "Papel Press", category: "Letterpress prints & cards", image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&h=200&fit=crop" },
      { name: "Kindred Candles", category: "Soy candles & incense", image: "https://images.unsplash.com/photo-1602874801006-4e6e9c80b0c7?w=200&h=200&fit=crop" },
      { name: "Good Roots Bakery", category: "Sourdough & pastries", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop" },
    ],
    whatsHappening: [
      "Live music all day",
      "Food trucks (tacos, pizza, cold brew)",
      "Kids' craft station",
      "Knife-sharpening workshop at 2 PM",
      "Printmaking demo at 3 PM",
    ],
    gettingThere: "Subway: F to York St, B57 bus · Bike: Citi Bike dock at Building 77 · Car: Free parking on site",
    vendorApplication: "Applications for summer markets open March 1. Table fee: $150/day. Apply at hello@themakersmarket.com",
    tickets: [
      { name: "Free Entry", price: 0, desc: "Open to all. No ticket required." },
    ],
    faqs: [
      { q: "Is it free?", a: "Yes. Free entry for everyone." },
      { q: "Where do I park?", a: "Free parking on site at Building 77." },
      { q: "Are dogs allowed?", a: "Leashed dogs welcome in the outdoor areas." },
    ],
  },

  "golden-hour-sessions": {
    slug: "golden-hour-sessions",
    name: "Golden Hour Sessions",
    tagline: "Sunset vinyl sets on the rooftop. Every sound tells a story.",
    category: "music",
    theme: "soiree",
    city: "Los Angeles",
    venue: "The Freehand Rooftop",
    address: "416 W 8th St, DTLA",
    date: "June 28, 2026",
    time: "5:00 PM – 11:00 PM",
    heroImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=1080&fit=crop",
    venueImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=800&fit=crop",
    highlights: [
      { title: "Vinyl Only", desc: "Rare groove, Brazilian jazz, Balearic, and beyond. No laptops — just wax and warmth." },
      { title: "Sunset Views", desc: "DTLA skyline as the golden hour fades. The city becomes the backdrop." },
      { title: "Two DJs", desc: "DJ Soleil and Kenji Tanaka, plus a B2B closing set. Six hours of curated sound." },
      { title: "Intimate Crowd", desc: "Limited capacity. No overselling. Room to move, space to breathe." },
    ],
    hosts: [
      {
        name: "DJ Soleil",
        role: "Vinyl Selector",
        bio: "Vinyl-only selector. Genres: rare groove, Brazilian jazz, Balearic. Resident at Love International. Brings the warmth.",
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop&crop=face",
      },
      {
        name: "Kenji Tanaka",
        role: "Producer & DJ",
        bio: "Producer and DJ. Releases on Stones Throw and Brainfeeder. Known for dusty beats and warm basslines. The evening shift.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      },
    ],
    schedule: [
      { time: "5:00 PM", title: "Doors open, sunset cocktails" },
      { time: "5:30 PM", title: "DJ Soleil: Golden hour set (rare groove, bossa nova)" },
      { time: "7:30 PM", title: "Kenji Tanaka: Evening set (deep house, broken beat)" },
      { time: "9:30 PM", title: "B2B closing set" },
      { time: "11:00 PM", title: "Last call" },
    ],
    genreTags: ["Rare Groove", "Brazilian Jazz", "Balearic", "Deep House", "Bossa Nova", "Broken Beat"],
    testimonials: [
      { quote: "Best rooftop party in LA. The vinyl-only rule makes such a difference.", author: "— Marcus, Silver Lake", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
      { quote: "Kenji's set had the whole crowd floating. Already bought tickets for next month.", author: "— Sofia, Echo Park", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
      { quote: "Finally — a party that respects the craft. No phones, just music and sunset.", author: "— Derek, Downtown", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
    ],
    tickets: [
      { name: "General", price: 25, desc: "Rooftop access, one drink token" },
      { name: "Friends of the Sound", price: 45, desc: "Priority entry, two drink tokens, limited-edition print" },
    ],
    faqs: [
      { q: "Is it 21+?", a: "Yes. Valid ID required." },
      { q: "What's the dress code?", a: "Casual. Dress for a rooftop sunset." },
      { q: "Can I reserve a table?", a: "Tables available for Friends of the Sound ticket holders." },
      { q: "Is it really vinyl only?", a: "Yes. Both DJs spin exclusively on vinyl. No laptops, no CDJs." },
      { q: "What if it rains?", a: "The rooftop has covered areas. We go on rain or shine." },
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
  return THEME_TO_DEMO_SLUG[themeId] ?? "the-edit-spring-sample-sale";
}
