import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getServiceRoleClient } from "@/lib/supabase";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

function getBaseUrl(): string {
  const u = process.env.NEXT_PUBLIC_APP_URL;
  const v = process.env.VERCEL_URL;
  if (u) return u.startsWith("http") ? u : `https://${u}`;
  if (v) return `https://${v}`;
  return "http://localhost:3000";
}

export async function POST() {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const baseUrl = getBaseUrl();
    const returnUrl = `${baseUrl}/dashboard`;
    const refreshUrl = `${baseUrl}/dashboard`;

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_connect_id")
      .eq("id", user.id)
      .single();

    let accountId = (profile as { stripe_connect_id?: string })?.stripe_connect_id;

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "US",
        email: user.email ?? undefined,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      accountId = account.id;

      const serviceSupabase = getServiceRoleClient();
      if (serviceSupabase) {
        await serviceSupabase
          .from("profiles")
          .upsert(
            {
              id: user.id,
              stripe_connect_id: accountId,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );
      }
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (e) {
    console.error("Stripe Connect error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create connect link" },
      { status: 500 }
    );
  }
}
