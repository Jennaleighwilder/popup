export interface EventData {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  theme: string;
  city: string;
  venue: string;
  address?: string;
  date: string;
  time: string;
  heroImage: string;
  venueImage: string;
  highlights: { title: string; desc: string }[];
  hosts: { name: string; role: string; bio: string; image: string }[];
  schedule: { time: string; title: string }[];
  tickets: { name: string; price: number; desc: string }[];
  faqs: { q: string; a: string }[];
  brands?: string[];
  menu?: { course: string; pairing?: string }[];
  artistBio?: string;
  featuredWorks?: { title: string; desc?: string }[];
  exhibitionDates?: string;
  relatedProgramming?: { title: string; when?: string }[];
  journey?: { step: string; desc: string }[];
  whatToBring?: string[];
  whatsProvided?: string[];
  testimonials?: { quote: string; author?: string }[];
  vendors?: { name: string; category: string; image?: string }[];
  whatsHappening?: string[];
  gettingThere?: string;
  vendorApplication?: string;
}

export const CATEGORY_LABELS: Record<string, { people: string; schedule: string; tickets: string; faq: string; about: string }> = {
  fashion: { people: "Featured Brands", schedule: "What to Expect", tickets: "Get Access", faq: "FAQ", about: "About the Sale" },
  food: { people: "Your Chef", schedule: "The Menu", tickets: "Reserve Your Seat", faq: "Good to Know", about: "The Experience" },
  art: { people: "The Artist", schedule: "Exhibition Dates", tickets: "Visit", faq: "Visitor Info", about: "About the Show" },
  wellness: { people: "Your Guide", schedule: "The Journey", tickets: "Register", faq: "What to Expect", about: "The Invitation" },
  music: { people: "Your Hosts", schedule: "The Program", tickets: "Get Tickets", faq: "FAQ", about: "The Experience" },
  market: { people: "Featured Vendors", schedule: "What's Happening", tickets: "Free Entry", faq: "Getting There", about: "About the Market" },
};
