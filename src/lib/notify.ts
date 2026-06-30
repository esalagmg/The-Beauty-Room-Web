import "server-only";

/**
 * Default "from" address. Works WITHOUT a domain via Resend's shared sender —
 * note: with the shared sender Resend only delivers to your own verified
 * account email. Set EMAIL_FROM to a verified branded address (e.g.
 * "The Beauty Room <bookings@thebeautyroombynilu.lk>") once your domain is
 * verified, to email real customers.
 */
const FROM = process.env.EMAIL_FROM || "The Beauty Room <onboarding@resend.dev>";

/**
 * Owner notifications. Phase 1 = free channels:
 *  • Email via Resend (if RESEND_API_KEY set)
 *  • Instant phone ping via a Telegram bot (if TELEGRAM_* set)
 * Both are best-effort and never block/break a booking.
 */

export interface OwnerBookingAlert {
  reference: string;
  customerName: string;
  phone: string;
  treatment: string;
  division: string;
  when: string;
  specialist?: string;
  notes?: string;
}

async function sendEmail(alert: OwnerBookingAlert) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_NOTIFY_EMAIL;
  if (!key || !to) return;

  const html = `
    <h2>New booking request — ${alert.reference}</h2>
    <p><strong>${alert.customerName}</strong> (${alert.phone})</p>
    <ul>
      <li><strong>Treatment:</strong> ${alert.treatment} (${alert.division})</li>
      <li><strong>When:</strong> ${alert.when}</li>
      <li><strong>Specialist:</strong> ${alert.specialist ?? "Any"}</li>
      ${alert.notes ? `<li><strong>Notes:</strong> ${alert.notes}</li>` : ""}
    </ul>
    <p>Open the admin panel to accept, reschedule or decline.</p>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        subject: `New booking — ${alert.customerName} · ${alert.when}`,
        html,
      }),
    });
  } catch {
    /* best-effort */
  }
}

async function sendTelegram(alert: OwnerBookingAlert) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text =
    `🌸 *New booking* (${alert.reference})\n` +
    `*${alert.customerName}* — ${alert.phone}\n` +
    `${alert.treatment} · ${alert.division}\n` +
    `🗓 ${alert.when}\n` +
    `Specialist: ${alert.specialist ?? "Any"}` +
    (alert.notes ? `\n📝 ${alert.notes}` : "");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });
  } catch {
    /* best-effort */
  }
}

export async function notifyOwnerNewBooking(alert: OwnerBookingAlert) {
  await Promise.allSettled([sendEmail(alert), sendTelegram(alert)]);
}

/** Lightweight owner ping for status changes (e.g. customer responses). */
export async function notifyOwnerMessage(subject: string, body: string) {
  const tasks: Promise<unknown>[] = [];

  const key = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_NOTIFY_EMAIL;
  if (key && to) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM,
          to: [to],
          subject,
          html: `<p>${body}</p>`,
        }),
      }).catch(() => undefined),
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    tasks.push(
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: `${subject}\n${body}` }),
      }).catch(() => undefined),
    );
  }

  await Promise.allSettled(tasks);
}

/* ── Customer confirmation email ─────────────────────────────────────────── */

export interface CustomerEmailInput {
  to: string;
  name: string;
  treatment: string;
  when: string;
  reference: string;
  kind: "requested" | "confirmed";
  whatsappHref?: string;
}

export async function sendCustomerEmail(i: CustomerEmailInput) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !i.to) return;

  const confirmed = i.kind === "confirmed";
  const heading = confirmed ? "You’re confirmed" : "Request received";
  const intro = confirmed
    ? `We’re delighted to confirm your appointment, ${i.name}. We can’t wait to welcome you.`
    : `Thank you, ${i.name}. We’ve received your booking request and will confirm shortly — usually within a few hours.`;

  const html = `
  <div style="background:#F7F3EC;padding:32px 0;font-family:Georgia,'Times New Roman',serif;color:#2B2824;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FDFCFA;border-radius:24px;overflow:hidden;border:1px solid #E7DAC6;">
          <tr><td style="background:#1A1815;padding:28px 32px;text-align:center;">
            <div style="font-style:italic;font-size:22px;color:#D9BE96;">The Beauty Room</div>
            <div style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;color:#9b8e79;text-transform:uppercase;margin-top:4px;">By Nilu</div>
          </td></tr>
          <tr><td style="padding:34px 36px;">
            <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8C6A41;">${heading}</div>
            <p style="font-size:17px;line-height:1.6;margin:14px 0 22px;color:#3A362F;">${intro}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3EC;border-radius:16px;">
              <tr><td style="padding:18px 22px;">
                ${row("Treatment", i.treatment)}
                ${row("When", i.when)}
                ${row("Reference", i.reference)}
              </td></tr>
            </table>
            ${
              i.whatsappHref
                ? `<div style="text-align:center;margin-top:26px;">
                     <a href="${i.whatsappHref}" style="display:inline-block;background:#2B2824;color:#F7F3EC;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:14px 28px;border-radius:999px;">Message us on WhatsApp</a>
                   </div>`
                : ""
            }
            <p style="font-family:Arial,sans-serif;font-size:11px;color:#A99A86;text-align:center;margin-top:26px;">The Beauty Room by Nilu · Ratnapura, Sri Lanka</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </div>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [i.to],
        subject: confirmed
          ? `Your appointment is confirmed · ${i.when}`
          : `We’ve received your booking request · ${i.reference}`,
        html,
      }),
    });
  } catch {
    /* best-effort */
  }
}

function row(label: string, value: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#A99A86;padding:6px 0;">${label}</td>
    <td align="right" style="font-size:15px;color:#2B2824;padding:6px 0;">${value}</td>
  </tr></table>`;
}
