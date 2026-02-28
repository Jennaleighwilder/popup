import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getServiceRoleClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const { data: attendee, error: aErr } = await supabase
      .from("attendees")
      .select("id, name, email, check_in_code, payment_status, event_id, ticket_tier_id")
      .eq("id", id)
      .single();

    if (aErr || !attendee) {
      return NextResponse.json({ error: "Attendee not found" }, { status: 404 });
    }

    const a = attendee as { event_id: string; ticket_tier_id: string | null };
    const [eventRes, tierRes] = await Promise.all([
      supabase.from("events").select("slug, name, date_start, time, venue, address, city").eq("id", a.event_id).single(),
      a.ticket_tier_id
        ? supabase.from("ticket_tiers").select("name, price, description").eq("id", a.ticket_tier_id).single()
        : Promise.resolve({ data: null }),
    ]);

    const ev = eventRes.data as Record<string, unknown> | null;
    const tier = tierRes.data as Record<string, unknown> | null;

    return NextResponse.json({
      attendee: {
        id: (attendee as { id: string }).id,
        name: (attendee as { name: string }).name,
        email: (attendee as { email: string }).email,
        check_in_code: (attendee as { check_in_code: string }).check_in_code,
        payment_status: (attendee as { payment_status: string }).payment_status,
      },
      event: ev
        ? {
            slug: ev.slug,
            name: ev.name,
            date: ev.date_start,
            time: ev.time,
            venue: ev.venue,
            address: ev.address,
            city: ev.city,
          }
        : null,
      tier: tier
        ? { name: tier.name, price: tier.price, description: tier.description }
        : null,
    });
  } catch (e) {
    console.error("Confirmation fetch error:", e);
    return NextResponse.json(
      { error: "Failed to fetch confirmation" },
      { status: 500 }
    );
  }
}
