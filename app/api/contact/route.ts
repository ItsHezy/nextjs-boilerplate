import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const submissionWindows = new Map<string, number[]>();
const DEFAULT_CONTACT_NOTIFICATION_EMAIL = "hezy.rne@gmail.com";
const DEFAULT_CONTACT_FROM_EMAIL = "Eric S. <onboarding@resend.dev>";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

function getClientAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return realIp?.trim() || "unknown";
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  const existing = submissionWindows.get(identifier) ?? [];
  const recent = existing.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    submissionWindows.set(identifier, recent);
    return true;
  }

  recent.push(now);
  submissionWindows.set(identifier, recent);
  return false;
}

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendContactNotificationEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return { attempted: false as const, sent: false as const };
  }

  const to =
    process.env.CONTACT_NOTIFICATION_EMAIL ??
    DEFAULT_CONTACT_NOTIFICATION_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? DEFAULT_CONTACT_FROM_EMAIL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ericdev.de";

  const text = [
    "New inquiry from Eric S. portfolio",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
    "",
    `Reply to: ${email}`,
    `Sent from: ${siteUrl}`,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
      <h2 style="margin:0 0 16px">New inquiry from Eric S. portfolio</h2>
      <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:20px 0 8px"><strong>Message:</strong></p>
      <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:12px;padding:16px;background:#f9fafb">${escapeHtml(
        message,
      )}</div>
      <p style="margin:20px 0 0"><strong>Reply to:</strong> ${escapeHtml(email)}</p>
      <p style="margin:8px 0 0"><strong>Sent from:</strong> ${escapeHtml(siteUrl)}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New inquiry from ${name}`,
      reply_to: email,
      text,
      html,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Resend contact notification failed:", details);
    return { attempted: true as const, sent: false as const };
  }

  return { attempted: true as const, sent: true as const };
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing Supabase contact form environment variables.");
    return jsonError("The contact form is not configured yet.", 500);
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const name = normalizeField(payload.name);
  const email = normalizeField(payload.email).toLowerCase();
  const message = normalizeField(payload.message);
  const companyWebsite = normalizeField(payload.companyWebsite);

  if (companyWebsite) {
    return NextResponse.json({
      message: "Thanks. Your message has been recorded.",
    });
  }

  if (name.length < 2 || name.length > 80) {
    return jsonError("Please enter a valid name.", 400);
  }

  if (!isValidEmail(email) || email.length > 254) {
    return jsonError("Please enter a valid email address.", 400);
  }

  if (message.length < 20 || message.length > 4000) {
    return jsonError(
      "Please enter a short message with at least 20 characters.",
      400,
    );
  }

  const clientAddress = getClientAddress(request);
  if (isRateLimited(clientAddress)) {
    return jsonError(
      "You have sent too many messages recently. Please try again in a little while.",
      429,
    );
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify([
      {
        name,
        email,
        message,
      },
    ]),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Supabase contact insert failed:", details);
    return jsonError(
      "Something went wrong while sending your message. Please try again or email me directly.",
      500,
    );
  }

  const emailResult = await sendContactNotificationEmail({
    name,
    email,
    message,
  });

  if (emailResult.attempted && !emailResult.sent) {
    console.warn(
      "Contact message saved to Supabase, but the notification email was not delivered.",
    );
  }

  return NextResponse.json({
    message: "Thanks. Your message has been sent.",
  });
}
