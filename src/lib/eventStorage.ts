import type { EventData } from "@/types/event";

const STORAGE_PREFIX = "popup-draft-";

export function saveDraftEvent(event: EventData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + event.slug, JSON.stringify(event));
  } catch (e) {
    console.warn("Failed to save draft to localStorage", e);
  }
}

export function getDraftEvent(slug: string): EventData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + slug);
    if (!raw) return null;
    return JSON.parse(raw) as EventData;
  } catch (e) {
    console.warn("Failed to load draft from localStorage", e);
    return null;
  }
}
