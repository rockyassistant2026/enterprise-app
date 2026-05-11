import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/middleware/auth";
import { prisma } from "@/lib/prisma";

// POST /api/auth/logout
export async function POST(request: NextRequest) {
  try {
    const authPayload = await verifyToken(request);

    if (!authPayload) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Revoke the session
    await prisma.session.update({
      where: { id: authPayload.sessionId },
      data: { expires_at: new Date() }, // Expire immediately
    });

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
