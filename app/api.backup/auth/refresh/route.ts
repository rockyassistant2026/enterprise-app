import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 400 }
      );
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.NEXTAUTH_SECRET || "secret"
      ) as { userId: string };
    } catch {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Check if session exists
    const session = await prisma.session.findUnique({
      where: { refresh_token: refreshToken },
    });

    if (!session || session.expires_at < new Date()) {
      return NextResponse.json(
        { error: "Session expired" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || !user.is_active) {
      return NextResponse.json(
        { error: "User not found or inactive" },
        { status: 403 }
      );
    }

    // Create new access token
    const accessToken = jwt.sign(
      { userId: user.id, sessionId: session.id },
      process.env.NEXTAUTH_SECRET || "secret",
      { expiresIn: "15m" }
    );

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
