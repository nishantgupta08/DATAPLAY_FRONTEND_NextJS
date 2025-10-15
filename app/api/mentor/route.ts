// app/api/counselling/route.ts
import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

// 🔧 FILL THESE IN from your Google Form
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/1q0kv_FHvwxZ9LEnG7PK1n2MgPx2JHH8SfSYI8o7QBYo/formResponse";
// Map your fields to their entry IDs (e.g. entry.123456789)
const FIELD = {
  name: "entry.1111111111",
  email: "entry.2222222222",
  phone: "entry.3333333333",
  notes: "entry.4444444444", // optional
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;

    // Basic validation
    const errors: Record<string, string> = {};
    if (!body.name?.trim()) errors.name = "Name is required";
    if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) errors.email = "Valid email is required";
    if (!body.phone || !/^\+?[0-9\s\-()]{7,}$/.test(body.phone)) errors.phone = "Valid phone is required";
    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Build the Google Form payload
    const form = new URLSearchParams();
    form.set(FIELD.name, body.name!.trim());
    form.set(FIELD.email, body.email!.trim());
    form.set(FIELD.phone, body.phone!.trim());
    if (body.notes) form.set(FIELD.notes, body.notes);

    // Submit to Google Form (server-side avoids browser CORS)
    const res = await fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: form.toString(),
      // Google Form returns a 200 with an HTML page; we don't need to parse it
    });

    if (!res.ok) {
      // Google sometimes returns 0/opaque in odd cases—treat non-OK as an error
      return NextResponse.json({ ok: false, error: "Google Form submission failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error submitting to Google Form:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}