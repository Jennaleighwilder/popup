import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceRoleClient } from "@/lib/supabase";
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 503 }
    );
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const slug = session.metadata?.event_slug;
    const type = session.metadata?.type;

    if (type === "publish" && slug) {
      const supabase = getServiceRoleClient();
      if (supabase) {
        await supabase
          .from("events")
          .update({
            status: "published",
            published_at: new Date().toISOString(),
            payment_id: session.id,
            updated_at: new Date().toISOString(),
          })
          .eq("slug", slug);
      }
    }

    if (type === "ticket" && slug) {
      const supabase = getServiceRoleClient();
      const attendeeId = session.metadata?.attendee_id;
      if (supabase && attendeeId) {
        await supabase
          .from("attendees")
          .update({
            payment_status: "paid",
            stripe_payment_id: (session.payment_intent as string) || session.id,
          })
          .eq("id", attendeeId);

        const { data: att } = await supabase
          .from("attendees")
          .select("name, email, check_in_code, event_id, ticket_tier_id")
          .eq("id", attendeeId)
          .single();

        if (att) {
          const a = att as { event_id: string; ticket_tier_id: string | null };
          const [evRes, tierRes] = await Promise.all([
            supabase.from("events").select("name, date_start, time, venue, address, city").eq("id", a.event_id).single(),
            a.ticket_tier_id
              ? supabase.from("ticket_tiers").select("name, price").eq("id", a.ticket_tier_id).single()
              : Promise.resolve({ data: null }),
          ]);
          const ev = evRes.data as { name?: string; date_start?: string; time?: string; venue?: string; address?: string; city?: string } | null;
          const tier = tierRes.data as { name?: string; price?: number } | null;
          if (ev && tier) {
            sendConfirmationEmail(
              {
                name: (att as { name: string }).name,
                email: (att as { email: string }).email,
                check_in_code: (att as { check_in_code: string }).check_in_code,
              },
              {
                name: ev.name || "Event",
                date: ev.date_start || "TBA",
                time: ev.time || "",
                venue: ev.venue || "TBA",
                address: ev.address,
                city: ev.city,
              },
              { name: tier.name || "Ticket", price: tier.price ?? 0 }
            ).catch(() => {});
          }
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
