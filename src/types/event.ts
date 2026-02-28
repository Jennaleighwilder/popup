export interface EventData {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  theme: string;
  city: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  heroImage: string;
  venueImage: string;
  highlights: { title: string; desc: string }[];
  hosts: { name: string; role: string; bio: string; image: string }[];
  schedule: { time: string; title: string }[];
  tickets: { name: string; price: number; desc: string }[];
  faqs: { q: string; a: string }[];
}
