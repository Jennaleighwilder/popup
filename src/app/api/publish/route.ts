import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceRoleClient } from "@/lib/supabase";
import type { EventData } from "@/types/event";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const PUBLISH_PRICE_CENTS = 999; // $9.99
function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  const v = process.env.VERCEL_URL;
  const u = process.env.NEXT_PUBLIC_APP_URL;
  if (u) return u.startsWith("http") ? u : `https://${u}`;
  if (v) return `https://${v}`;
  return "http://localhost:3000";
}

export async function POST(request: NextRequest) {
  try {
    const { slug, event, userId } = (await request.json()) as {
      slug: string;
      event?: EventData;
      userId?: string;
    };

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 503 }
      );
    }

    const baseUrl = getBaseUrl();
    const supabase = getServiceRoleClient();
    let eventId: string | null = null;

    // Upsert event to DB if we have Supabase and event data
    if (supabase && event) {
      const { highlights, hosts, schedule, tickets, faqs, ...rest } = event;
      const content = {
        highlights,
        hosts,
        schedule,
        tickets,
        faqs,
        ...rest,
      };
      const { data: existing } = await supabase
        .from("events")
        .select("id")
        .eq("slug", slug)
        .single();

      if (existing) {
        // Update
        const { data: updated } = await supabase
          .from("events")
          .update({
            name: event.name,
            tagline: event.tagline,
            category: event.category,
            theme: event.theme,
            content,
            hero_image: event.heroImage,
            venue: event.venue,
            address: event.address,
            city: event.city,
            time: event.time,
            updated_at: new Date().toISOString(),
          })
          .eq("slug", slug)
          .select("id")
          .single();
        eventId = updated?.id ?? existing.id;
      } else if (userId && userId.length > 10) {
        // Create - need valid user_id for FK
        const { data: inserted } = await supabase
          .from("events")
          .insert({
            user_id: userId,
            slug,
            name: event.name,
            tagline: event.tagline,
            category: event.category,
            theme: event.theme,
            status: "draft",
            content,
            hero_image: event.heroImage,
            venue: event.venue,
            address: event.address,
            city: event.city,
            time: event.time,
            date_start: new Date().toISOString().slice(0, 10),
          })
          .select("id")
          .single();
        eventId = inserted?.id ?? null;
      }
    } else if (supabase) {
      const { data: existing } = await supabase
        .from("events")
        .select("id")
        .eq("slug", slug)
        .single();
      eventId = existing?.id ?? null;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Publish your event",
              description: "Go live and start selling tickets",
              images: event?.heroImage ? [event.heroImage] : undefined,
            },
            unit_amount: PUBLISH_PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/publish/${slug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/publish/${slug}`,
      metadata: {
        event_slug: slug,
        event_id: eventId || "",
        type: "publish",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Publish API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create checkout" },
      { status: 500 }
    );
  }
}
