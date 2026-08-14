import { NextResponse } from "next/server";
import { profile } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MAX_BODY_BYTES = 8_000;
const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 2_000 },
};

/* Far tighter than the chat route's dozen a minute. Nobody writes three
   considered messages in ten minutes, and every one of these lands in a
   real inbox. */
const RATE_LIMIT_WINDOW_MS = 600_000;
const RATE_LIMIT_MAX_REQUESTS = 3;

/**
 * Best-effort per-IP throttle, same shape and same caveat as the chat
 * route: Vercel functions are ephemeral and can run several instances at
 * once, so this map is per-instance. Cloudflare's rule in front of the
 * site is the durable control.
 */
const requestLog = new Map<string, number[]>();

function clientIp(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestLog.set(ip, recent);

  if (requestLog.size > 5_000) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        requestLog.delete(key);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

/* Deliberately loose. Address validation by regex is a well-known way to
   reject real addresses; the reply going nowhere is the sender's problem
   to notice, whereas a rejected valid address is a lost message. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "message";

function readField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  try {
    const declaredLength = Number(req.headers.get("content-length") ?? 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "too_long" }, { status: 413 });
    }

    const body = await req.json();
    const name = readField(body?.name);
    const email = readField(body?.email);
    const message = readField(body?.message);
    const locale = body?.locale === "en" ? "en" : "tr";

    /* A field kept off-screen for people and irresistible to the bots that
       fill every input they find. Answering 200 rather than 400 means the
       bot records a success and does not come back to probe for the rule
       it tripped. */
    if (readField(body?.company)) {
      return NextResponse.json({ ok: true });
    }

    const invalid: Field[] = [];
    if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
      invalid.push("name");
    }
    if (email.length > LIMITS.email.max || !EMAIL.test(email)) {
      invalid.push("email");
    }
    if (
      message.length < LIMITS.message.min ||
      message.length > LIMITS.message.max
    ) {
      invalid.push("message");
    }
    if (invalid.length) {
      return NextResponse.json({ error: "invalid", fields: invalid }, { status: 400 });
    }

    // After validation, so a malformed request cannot burn the allowance.
    if (isRateLimited(clientIp(req))) {
      return NextResponse.json(
        { error: "rate_limited" },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      /* Says so plainly instead of pretending to have sent it. The form
         shows the address as a fallback on this branch, so a missing key
         degrades to what the page did before rather than to silence. */
      console.error("[contact] RESEND_API_KEY is not set");
      return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        /* onboarding@resend.dev needs no verified domain and may only
           deliver to the account holder — which is the only recipient
           this form has. Swap for an address on mertceren.com once the
           domain is verified in Resend, so replies thread properly. */
        from: "Portfolyo <onboarding@resend.dev>",
        to: [profile.email],
        /* The whole point: hitting Reply in the inbox answers the
           visitor, not Resend. */
        reply_to: email,
        subject: `Portfolyo · ${name}`,
        /* Plain text, never HTML. The body is a stranger's input and
           would otherwise be markup running inside a mail client. */
        text: [
          `İsim:  ${name}`,
          `E-posta: ${email}`,
          `Dil:   ${locale}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("[contact] resend rejected the send", res.status, await res.text());
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] unexpected failure", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
