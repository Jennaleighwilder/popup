import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = getServiceRoleClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const content = (data.content as Record<string, unknown>) || {};
    const dateStart = data.date_start as string | undefined;
    let dateStr = (content as { date?: string }).date;
    if (!dateStr && dateStart) {
      try {
        const d = new Date(dateStart + "T12:00:00");
        if (!isNaN(d.getTime())) {
          dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
        } else {
          dateStr = dateStart;
        }
      } catch {
        dateStr = dateStart;
      }
    }
    const event = {
      ...content,
      slug: data.slug,
      name: data.name,
      tagline: data.tagline,
      category: data.category,
      theme: data.theme,
      city: data.city,
      venue: data.venue,
      address: data.address,
      date: dateStr || dateStart,
      time: data.time,
      heroImage: data.hero_image,
      venueImage: (content as { venueImage?: string }).venueImage || data.hero_image,
    };

    return NextResponse.json(event);
  } catch (e) {
    console.error("Get event error:", e);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const supabase = getServiceRoleClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const content = body.content ?? body;
    const { name, tagline, theme, hero_image, venue, address, city, date_start, time } = body;

    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (content && typeof content === "object") update.content = content;
    if (name != null) update.name = name;
    if (tagline != null) update.tagline = tagline;
    if (theme != null) update.theme = theme;
    if (hero_image != null) update.hero_image = hero_image;
    if (venue != null) update.venue = venue;
    if (address != null) update.address = address;
    if (city != null) update.city = city;
    if (date_start != null) update.date_start = date_start;
    if (time != null) update.time = time;

    const { data, error } = await supabase
      .from("events")
      .update(update)
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const c = (data.content as Record<string, unknown>) || {};
    const event = { ...c, slug: data.slug, name: data.name, tagline: data.tagline, category: data.category, theme: data.theme, city: data.city, venue: data.venue, address: data.address, date: data.date_start, time: data.time, heroImage: data.hero_image, venueImage: (c as { venueImage?: string }).venueImage || data.hero_image };
    return NextResponse.json(event);
  } catch (e) {
    console.error("Update event error:", e);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}
