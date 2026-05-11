import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        { error: "Account is inactive" },
        { status: 403 }
      );
    }

    // Create session with refresh token
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.NEXTAUTH_SECRET || "secret",
      { expiresIn: "30d" }
    );

    const session = await prisma.session.create({
      data: {
        user_id: user.id,
        refresh_token: refreshToken,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        ip_address: request.headers.get("x-forwarded-for") || "",
        user_agent: request.headers.get("user-agent") || "",
      },
    });

    // Create access token (short-lived)
    const accessToken = jwt.sign(
      { userId: user.id, sessionId: session.id },
      process.env.NEXTAUTH_SECRET || "secret",
      { expiresIn: "15m" }
    );

    return NextResponse.json(
      {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
