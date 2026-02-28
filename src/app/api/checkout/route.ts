import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceRoleClient } from "@/lib/supabase";
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail";

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

function generateCheckInCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const { slug, tierIndex, name, email, phone } = (await request.json()) as {
      slug: string;
      tierIndex: number;
      name: string;
      email: string;
      phone?: string;
    };

    if (!slug || tierIndex == null || !name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Missing slug, tier, name, or email" },
        { status: 400 }
      );
    }

    const supabase = getServiceRoleClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const { data: eventRow, error: eventErr } = await supabase
      .from("events")
      .select("id, name, hero_image, status, content")
      .eq("slug", slug)
      .single();

    if (eventErr || !eventRow) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (eventRow.status !== "published") {
      return NextResponse.json(
        { error: "Event is not published" },
        { status: 400 }
      );
    }

    const content = (eventRow.content as { tickets?: { name: string; price: number; desc: string }[] }) || {};
    const tickets = content.tickets || [];
    const tier = tickets[tierIndex];
    if (!tier) {
      return NextResponse.json({ error: "Invalid ticket tier" }, { status: 400 });
    }

    const priceCents = Math.round(tier.price * 100);
    const isFree = priceCents <= 0;
    const checkInCode = generateCheckInCode();

    // Get or create ticket_tier
    const { data: tiers } = await supabase
      .from("ticket_tiers")
      .select("id")
      .eq("event_id", eventRow.id);

    let tierId: string | null = null;
    if (tiers && tiers.length > tierIndex) {
      tierId = tiers[tierIndex].id;
    } else {
      const { data: newTier } = await supabase
        .from("ticket_tiers")
        .insert({
          event_id: eventRow.id,
          name: tier.name,
          price: tier.price,
          description: tier.desc,
        })
        .select("id")
        .single();
      tierId = newTier?.id ?? null;
    }

    const { data: attendee, error: attendeeErr } = await supabase
      .from("attendees")
      .insert({
        event_id: eventRow.id,
        ticket_tier_id: tierId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        payment_status: isFree ? "free" : "pending",
        check_in_code: checkInCode,
      })
      .select("id")
      .single();

    if (attendeeErr || !attendee) {
      return NextResponse.json(
        { error: attendeeErr?.message || "Failed to create attendee" },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl();
    const successUrl = `${baseUrl}/e/${slug}/confirmation?attendee_id=${attendee.id}`;

    if (isFree) {
      const eventData = eventRow as { name?: string; date_start?: string; time?: string; venue?: string; address?: string; city?: string };
      sendConfirmationEmail(
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          check_in_code: checkInCode,
        },
        {
          name: eventData.name || "Event",
          date: eventData.date_start || "TBA",
          time: eventData.time || "",
          venue: eventData.venue || "TBA",
          address: eventData.address,
          city: eventData.city,
        },
        { name: tier.name, price: tier.price }
      ).catch(() => {});

      return NextResponse.json({
        success: true,
        attendee_id: attendee.id,
        check_in_code: checkInCode,
        redirect_url: successUrl,
      });
    }

    if (!stripe) {
      return NextResponse.json(
        { error: "Payments not configured" },
        { status: 503 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${(eventRow as { name?: string }).name || "Event"} — ${tier.name}`,
              description: tier.desc,
              images: (content as { heroImage?: string }).heroImage
                ? [(content as { heroImage: string }).heroImage]
                : (eventRow as { hero_image?: string }).hero_image
                  ? [(eventRow as { hero_image: string }).hero_image]
                  : undefined,
            },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl + "&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: `${baseUrl}/e/${slug}#tickets`,
      metadata: {
        type: "ticket",
        event_slug: slug,
        attendee_id: attendee.id,
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      attendee_id: attendee.id,
    });
  } catch (e) {
    console.error("Checkout error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
