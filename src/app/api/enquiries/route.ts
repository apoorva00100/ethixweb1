import { createHash } from "node:crypto";
import { and, count, eq, gt } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, schema } from "@/db";
import { apiError } from "@/lib/api";
import { enquirySchema } from "@/lib/validation";

const MAX_BODY_BYTES = 10_000;
const MIN_FILL_MS = 3_000; // humans take longer than this to fill the form
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 }; // per hashed IP
const DEDUPE_WINDOW_MS = 24 * 60 * 60 * 1000;

function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT;
  if (!salt && process.env.NODE_ENV === "production") throw new Error("IP_HASH_SALT is not set");
  return createHash("sha256").update(`${salt ?? "dev-salt"}:${ip}`).digest("hex");
}

function clientIp(request: Request) {
  const fwd = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || request.headers.get("x-real-ip") || null;
}

// Bots get the same success response as people so they learn nothing from it.
const silentOk = () => NextResponse.json({ ok: true }, { status: 201 });

export async function POST(request: Request) {
  // 1. Parse, with a size cap
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return apiError(413, "payload_too_large", "Request is too large.");
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return apiError(400, "invalid_json", "Request body must be valid JSON.");
  }

  // 2. Validate (same schema as the client)
  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    return apiError(422, "validation_failed", "Please fix the highlighted fields.", {
      fields: z.flattenError(parsed.error).fieldErrors as Record<string, string[]>,
    });
  }
  const data = parsed.data;

  // 3. Spam traps: honeypot filled, or form submitted too fast / stale
  const elapsed = data.startedAt ? Date.now() - data.startedAt : Number.NaN;
  if (data.website || !(elapsed >= MIN_FILL_MS && elapsed <= MAX_FORM_AGE_MS)) {
    console.warn("[enquiries] dropped as likely spam");
    return silentOk();
  }

  try {
    const database = db();
    const ip = clientIp(request);
    const ipHash = ip ? hashIp(ip) : null;

    // 4. Rate limit per hashed IP, counted in Postgres (no extra service needed)
    if (ipHash) {
      const since = new Date(Date.now() - RATE_LIMIT.windowMs);
      const [{ value }] = await database
        .select({ value: count() })
        .from(schema.leads)
        .where(and(eq(schema.leads.ipHash, ipHash), gt(schema.leads.createdAt, since)));
      if (value >= RATE_LIMIT.max) {
        return apiError(429, "rate_limited", "Too many enquiries from your network. Please try again in a few minutes.", {
          headers: { "Retry-After": String(RATE_LIMIT.windowMs / 1000) },
        });
      }
    }

    // 5. Duplicate guard: same email and message within 24h is treated as already received
    const [dupe] = await database
      .select({ id: schema.leads.id })
      .from(schema.leads)
      .where(
        and(
          eq(schema.leads.email, data.email),
          eq(schema.leads.message, data.message),
          gt(schema.leads.createdAt, new Date(Date.now() - DEDUPE_WINDOW_MS)),
        ),
      )
      .limit(1);
    if (dupe) return silentOk();

    // 6. Store
    const source = request.headers.get("referer");
    await database.insert(schema.leads).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      city: data.city,
      service: data.service,
      budget: data.budget,
      message: data.message,
      ipHash,
      userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
      source: source ? new URL(source).pathname : null,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    // Log the detail server-side; never leak it to the client.
    console.error("[enquiries] failed to save lead", err);
    return apiError(500, "server_error", "Something went wrong on our side. Please try again shortly, or email us directly.");
  }
}
