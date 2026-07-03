import { NextResponse } from "next/server";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

/**
 * Waitlist endpoint.
 *
 * Adds each signup to your email provider so you can message the list at launch.
 * It auto-detects the provider from environment variables (set these in
 * `.env.local` — see `.env.local.example`):
 *
 *   • MailerLite → MAILERLITE_API_KEY (+ optional MAILERLITE_GROUP_ID)   [free tier]
 *   • Brevo      → BREVO_API_KEY (+ optional BREVO_LIST_ID)              [free tier]
 *   • Mailchimp  → MAILCHIMP_API_KEY + MAILCHIMP_AUDIENCE_ID
 *   • ConvertKit → CONVERTKIT_API_KEY + CONVERTKIT_FORM_ID
 *
 * If none is configured, it falls back to a local JSON file (dev only) so the
 * form still works while you're building.
 */

export const runtime = "nodejs";

type Entry = {
  name: string;
  email: string;
  createdAt: string;
  source: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---- Mailchimp -----------------------------------------------------------
async function addToMailchimp(name: string, email: string) {
  const apiKey = process.env.MAILCHIMP_API_KEY!;
  const listId = process.env.MAILCHIMP_AUDIENCE_ID!;
  // The datacenter is the suffix of the API key, e.g. "…-us21" → "us21".
  const dc = apiKey.split("-").pop();
  // MD5 of the lowercased email = subscriber hash (lets us upsert idempotently).
  const hash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  const res = await fetch(
    `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${hash}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`anystring:${apiKey}`).toString("base64"),
      },
      body: JSON.stringify({
        email_address: email,
        // "subscribed" = added immediately. Use "pending" for double opt-in.
        status_if_new: "subscribed",
        merge_fields: { FNAME: name },
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail?.detail || "Mailchimp request failed");
  }
}

// ---- ConvertKit (Kit) ----------------------------------------------------
async function addToConvertKit(name: string, email: string) {
  const apiKey = process.env.CONVERTKIT_API_KEY!;
  const formId = process.env.CONVERTKIT_FORM_ID!;

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email, first_name: name }),
    }
  );

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail?.message || "ConvertKit request failed");
  }
}

// ---- MailerLite (free tier) ----------------------------------------------
async function addToMailerLite(name: string, email: string) {
  const apiKey = process.env.MAILERLITE_API_KEY!;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      fields: { name },
      ...(groupId ? { groups: [groupId] } : {}),
    }),
  });

  // 200/201 = created/updated. MailerLite returns 422 on validation issues.
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail?.message || "MailerLite request failed");
  }
}

// ---- Sender.net (free tier — highest free send volume) -------------------
async function addToSender(name: string, email: string) {
  const apiKey = process.env.SENDER_API_KEY!;
  const groupId = process.env.SENDER_GROUP_ID;

  const res = await fetch("https://api.sender.net/v2/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      firstname: name,
      ...(groupId ? { groups: [groupId] } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail?.message || "Sender.net request failed");
  }
}

// ---- Brevo (free tier) ---------------------------------------------------
async function addToBrevo(name: string, email: string) {
  const apiKey = process.env.BREVO_API_KEY!;
  const listId = process.env.BREVO_LIST_ID;

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: name },
      updateEnabled: true, // don't error if the contact already exists
      ...(listId ? { listIds: [Number(listId)] } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail?.message || "Brevo request failed");
  }
}

// ---- Local JSON fallback (development only) -------------------------------
async function saveLocally(entry: Entry) {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "waitlist.json");
  await fs.mkdir(dir, { recursive: true });

  let list: Entry[] = [];
  try {
    list = JSON.parse(await fs.readFile(file, "utf8")) as Entry[];
  } catch {
    list = [];
  }
  if (!list.some((e) => e.email.toLowerCase() === entry.email.toLowerCase())) {
    list.push(entry);
  }
  await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
}

type Provider =
  | "sender"
  | "mailerlite"
  | "brevo"
  | "mailchimp"
  | "convertkit"
  | "local";

function detectProvider(): Provider {
  if (process.env.SENDER_API_KEY) return "sender";
  if (process.env.MAILERLITE_API_KEY) return "mailerlite";
  if (process.env.BREVO_API_KEY) return "brevo";
  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID)
    return "mailchimp";
  if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID)
    return "convertkit";
  return "local";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email } = (body ?? {}) as { name?: string; email?: string };

  // ---- Validation ----
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const cleanName = name.trim().slice(0, 120);
  const cleanEmail = email.trim().toLowerCase().slice(0, 200);
  const provider = detectProvider();

  try {
    if (provider === "sender") {
      await addToSender(cleanName, cleanEmail);
    } else if (provider === "mailerlite") {
      await addToMailerLite(cleanName, cleanEmail);
    } else if (provider === "brevo") {
      await addToBrevo(cleanName, cleanEmail);
    } else if (provider === "mailchimp") {
      await addToMailchimp(cleanName, cleanEmail);
    } else if (provider === "convertkit") {
      await addToConvertKit(cleanName, cleanEmail);
    } else {
      await saveLocally({
        name: cleanName,
        email: cleanEmail,
        createdAt: new Date().toISOString(),
        source: "landing",
      });
    }

    return NextResponse.json(
      { ok: true, message: "You're on the list." },
      { status: 201 }
    );
  } catch (err) {
    // Log the real reason server-side; keep the user-facing message friendly.
    console.error("[waitlist] failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 502 }
    );
  }
}
