import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Popup <onboarding@resend.dev>";

interface AttendeeInfo {
  name: string;
  email: string;
  check_in_code: string;
}

interface EventInfo {
  name: string;
  date: string;
  time: string;
  venue: string;
  address?: string;
  city?: string;
}

interface TierInfo {
  name: string;
  price: number;
}

export async function sendConfirmationEmail(
  attendee: AttendeeInfo,
  event: EventInfo,
  tier: TierInfo
): Promise<boolean> {
  if (!resend) return false;

  const priceStr = tier.price === 0 ? "Free" : `$${tier.price}`;
  const location = [event.venue, event.address, event.city].filter(Boolean).join(", ");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're in! — ${event.name}</title>
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#FAF7F2;color:#1A1714;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="width:40px;height:1px;background:#C4956A;margin-bottom:32px;"></div>
    <h1 style="font-size:28px;font-weight:300;margin:0 0 16px;letter-spacing:-0.02em;">You're in!</h1>
    <p style="font-size:16px;color:#8C8578;margin:0 0 32px;line-height:1.6;">Your ticket is confirmed. See you there.</p>
    
    <div style="border:1px solid #E8E2D9;background:#fff;padding:32px;margin-bottom:32px;">
      <h2 style="font-size:20px;font-weight:300;margin:0 0 8px;">${event.name}</h2>
      <p style="font-size:14px;color:#8C8578;margin:0 0 24px;">${event.date} · ${event.time}</p>
      <p style="font-size:14px;margin:0 0 8px;"><strong>Ticket:</strong> ${tier.name} (${priceStr})</p>
      <p style="font-size:14px;margin:0 0 24px;"><strong>Guest:</strong> ${attendee.name}</p>
      
      <div style="border-top:1px solid #E8E2D9;padding-top:24px;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8C8578;margin:0 0 8px;">Check-in code</p>
        <p style="font-size:24px;letter-spacing:0.2em;color:#C4956A;margin:0;font-family:monospace;">${attendee.check_in_code}</p>
        <p style="font-size:12px;color:#8C8578;margin:8px 0 0;">Show this code at the door</p>
      </div>
    </div>
    
    ${location ? `<p style="font-size:14px;color:#8C8578;">${location}</p>` : ""}
    
    <p style="font-size:12px;color:#8C8578;margin-top:32px;">Powered by Popup</p>
  </div>
</body>
</html>
`;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: attendee.email,
      subject: `You're in! — ${event.name}`,
      html,
    });
    return !error;
  } catch (e) {
    console.error("Resend error:", e);
    return false;
  }
}
