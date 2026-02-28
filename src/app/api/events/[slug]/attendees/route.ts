import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getServiceRoleClient } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: event } = await supabase
      .from("events")
      .select("id")
      .eq("slug", slug)
      .eq("user_id", user.id)
      .single();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const { data: attendees, error } = await supabase
      .from("attendees")
      .select(`
        id,
        name,
        email,
        phone,
        payment_status,
        check_in_code,
        checked_in_at,
        created_at,
        ticket_tiers (name, price)
      `)
      .eq("event_id", event.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const result = (attendees || []).map((a) => {
      const t = (a as { ticket_tiers?: { name: string; price: number } | { name: string; price: number }[] }).ticket_tiers;
      const tierName = Array.isArray(t) ? t[0]?.name : t?.name;
      return {
        id: (a as { id: string }).id,
        name: (a as { name: string }).name,
        email: (a as { email: string }).email,
        phone: (a as { phone: string }).phone,
        payment_status: (a as { payment_status: string }).payment_status,
        check_in_code: (a as { check_in_code: string }).check_in_code,
        checked_in_at: (a as { checked_in_at: string }).checked_in_at,
        created_at: (a as { created_at: string }).created_at,
        tier_name: tierName ?? "—",
      };
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error("Get attendees error:", e);
    return NextResponse.json({ error: "Failed to fetch attendees" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { attendee_id, checked_in } = body;

    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: event } = await supabase
      .from("events")
      .select("id")
      .eq("slug", slug)
      .eq("user_id", user.id)
      .single();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const { error: updateError } = await supabase
      .from("attendees")
      .update({
        checked_in_at: checked_in ? new Date().toISOString() : null,
      })
      .eq("id", attendee_id)
      .eq("event_id", event.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Update attendee error:", e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
