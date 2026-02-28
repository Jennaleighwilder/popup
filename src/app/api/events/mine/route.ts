import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: events, error } = await supabase
      .from("events")
      .select(`
        id,
        slug,
        name,
        status,
        hero_image,
        date_start,
        published_at,
        created_at
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const eventIds = (events || []).map((e) => e.id);
    const attendeeCounts: Record<string, number> = {};

    if (eventIds.length > 0) {
      const { data: counts } = await supabase
        .from("attendees")
        .select("event_id")
        .in("event_id", eventIds);

      if (counts) {
        counts.forEach((c: { event_id: string }) => {
          attendeeCounts[c.event_id] = (attendeeCounts[c.event_id] || 0) + 1;
        });
      }
    }

    const result = (events || []).map((e) => ({
      ...e,
      ticket_count: attendeeCounts[e.id] || 0,
    }));

    return NextResponse.json(result);
  } catch (e) {
    console.error("Get my events error:", e);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
