import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const submissionWindows = new Map<string, number[]>();

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

  return NextResponse.json({
    message: "Thanks. Your message has been sent.",
  });
}
