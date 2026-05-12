// Cloudflare Pages doesn't fully support NextAuth dynamic routes
// This is a placeholder - use explicit endpoints instead

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Use specific auth endpoints" }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ error: "Use specific auth endpoints" }, { status: 404 });
}
