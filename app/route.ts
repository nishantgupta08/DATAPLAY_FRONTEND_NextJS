import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    // In a real app, forward to your CRM/Sheets/Email here.
    // For now, just echo back with a timestamp for quick testing.
    return NextResponse.json({ ok: true, received: payload, ts: new Date().toISOString() });
  } catch (e) {
    return new NextResponse("Invalid JSON", { status: 400 });
  }
}