import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

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
      .select("id, name")
      .eq("slug", slug)
      .eq("user_id", user.id)
      .single();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const { data: attendees } = await supabase
      .from("attendees")
      .select(`
        name,
        email,
        phone,
        payment_status,
        check_in_code,
        checked_in_at,
        ticket_tiers (name)
      `)
      .eq("event_id", event.id)
      .order("created_at", { ascending: false });

    const headers = ["Name", "Email", "Phone", "Ticket", "Payment", "Check-in Code", "Checked In"];
    const rows = (attendees || []).map((a) => {
      const t = (a as { ticket_tiers?: { name: string } | { name: string }[] }).ticket_tiers;
      const tierName = Array.isArray(t) ? t[0]?.name : t?.name;
      return [
        (a as { name: string }).name,
        (a as { email: string }).email,
        (a as { phone: string }).phone || "",
        tierName ?? "—",
        (a as { payment_status: string }).payment_status,
        (a as { check_in_code: string }).check_in_code,
        (a as { checked_in_at: string }).checked_in_at ? "Yes" : "No",
      ];
    });

    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${(event as { name: string }).name.replace(/[^a-z0-9]/gi, "-")}-guests.csv"`,
      },
    });
  } catch (e) {
    console.error("Export error:", e);
    return NextResponse.json({ error: "Failed to export" }, { status: 500 });
  }
}
