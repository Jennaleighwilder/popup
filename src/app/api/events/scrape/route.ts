import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const MAX_CONTENT_LENGTH = 15000;
const FETCH_TIMEOUT_MS = 10000;

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function extractTextFromHtml(html: string): string {
  const withoutScripts = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  const withoutStyles = withoutScripts.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  const withoutNoscript = withoutStyles.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, "");
  const text = withoutNoscript
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
  return text.slice(0, MAX_CONTENT_LENGTH);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url: sourceUrl } = body;

    if (!sourceUrl || typeof sourceUrl !== "string") {
      return NextResponse.json({ error: "Missing or invalid url" }, { status: 400 });
    }

    const trimmed = sourceUrl.trim();
    if (!isValidUrl(trimmed)) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const res = await fetch(trimmed, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PopupEventScraper/1.0; +https://popup-tawny-nu.vercel.app)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch page: ${res.status} ${res.statusText}` },
        { status: 422 }
      );
    }

    const html = await res.text();
    const text = extractTextFromHtml(html);

    if (!text || text.length < 50) {
      return NextResponse.json(
        { error: "Could not extract meaningful content from the page" },
        { status: 422 }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Scraping requires OPENAI_API_KEY to be configured" },
        { status: 503 }
      );
    }

    const prompt = `You are extracting event information from a scraped webpage. Extract structured data from the following page content.

Page content:
---
${text}
---

Return ONLY valid JSON with this exact structure (no markdown, no code blocks). Use null for any field you cannot find. For dates, prefer ISO format (YYYY-MM-DD) when possible. For times, use formats like "7:00 PM" or "10:00 AM - 6:00 PM".
{
  "name": "string or null",
  "tagline": "string or null",
  "description": "string or null",
  "city": "string or null",
  "venue": "string or null",
  "address": "string or null",
  "dateStart": "YYYY-MM-DD or null",
  "dateEnd": "YYYY-MM-DD or null",
  "time": "string or null",
  "category": "one of: fashion, food, art, wellness, music, market - or null if unclear",
  "highlights": [{"title": "string", "desc": "string"}, ...] or null,
  "hosts": [{"name": "string", "role": "string", "bio": "string"}, ...] or null,
  "schedule": [{"time": "string", "title": "string"}, ...] or null,
  "tickets": [{"name": "string", "price": number, "desc": "string"}, ...] or null,
  "faqs": [{"q": "string", "a": "string"}, ...] or null,
  "capacity": number or null,
  "extra": "string - any other notable details to pass to the generator"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
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

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timed out. The page may be slow or blocking requests." },
          { status: 408 }
        );
      }
      console.error("Scrape error:", error);
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Scraping failed" },
      { status: 500 }
    );
  }
}
