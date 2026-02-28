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

    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, email, stripe_connect_id")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      id: user.id,
      email: user.email,
      display_name: profile?.display_name ?? user.email?.split("@")[0],
      stripe_connect_id: profile?.stripe_connect_id ?? null,
    });
  } catch (e) {
    console.error("Get profile error:", e);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
