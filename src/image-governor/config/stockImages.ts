// ============================================================================
// IMAGE GOVERNOR — CURATED STOCK IMAGE POOLS
// ============================================================================
// Single source of truth for hero/venue images per category.
// All apps (Popup, Jukebox, Launchpad) use this instead of scattered Unsplash URLs.
// ============================================================================

const CATEGORY_HERO: Record<string, string[]> = {
  fashion: [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop",
  ],
  food: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop",
  ],
  art: [
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&h=1080&fit=crop",
  ],
  wellness: [
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&h=1080&fit=crop",
  ],
  music: [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=1080&fit=crop",
  ],
  market: [
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop",
  ],
  tech: [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop",
  ],
  literary: [
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&h=1080&fit=crop",
  ],
  conference: [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&h=1080&fit=crop",
  ],
};

const CATEGORY_VENUE: Record<string, string[]> = {
  fashion: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=800&fit=crop"],
  food: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=800&fit=crop"],
  art: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&h=800&fit=crop"],
  wellness: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&h=800&fit=crop"],
  music: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop"],
  market: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=800&fit=crop"],
  tech: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=800&fit=crop"],
  literary: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=800&fit=crop"],
  conference: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=800&fit=crop"],
};

function normalizeCategory(cat: string): string {
  const k = (cat || "music").toLowerCase().replace(/\s+/g, "_").replace(/&/g, "_");
  if (k.includes("fashion")) return "fashion";
  if (k.includes("food")) return "food";
  if (k.includes("art")) return "art";
  if (k.includes("wellness")) return "wellness";
  if (k.includes("music")) return "music";
  if (k.includes("market")) return "market";
  if (k.includes("tech")) return "tech";
  if (k.includes("literary")) return "literary";
  if (k.includes("conference")) return "conference";
  return "music";
}

export function getHeroImageForCategory(category: string): string {
  const key = normalizeCategory(category);
  const pool = CATEGORY_HERO[key] ?? CATEGORY_HERO.music;
  return pool[0] ?? CATEGORY_HERO.music[0];
}

export function getRandomHeroForCategory(category: string): string {
  const key = normalizeCategory(category);
  const pool = CATEGORY_HERO[key] ?? CATEGORY_HERO.music;
  return pool[Math.floor(Math.random() * pool.length)] ?? pool[0];
}

export function getVenueImageForCategory(category: string): string {
  const key = normalizeCategory(category);
  const pool = CATEGORY_VENUE[key] ?? CATEGORY_VENUE.music;
  return pool[0] ?? CATEGORY_VENUE.music[0];
}

export function getHeroPoolForCategory(category: string): string[] {
  const key = normalizeCategory(category);
  return CATEGORY_HERO[key] ?? CATEGORY_HERO.music;
}
