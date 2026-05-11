import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/middleware/auth";
import { prisma } from "@/lib/prisma";

// GET /api/users/profile
export async function GET(request: NextRequest) {
  try {
    const authPayload = await verifyToken(request);

    if (!authPayload) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: authPayload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar_url: true,
        role: true,
        is_active: true,
        created_at: true,
        preferences: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/users/profile
export async function PUT(request: NextRequest) {
  try {
    const authPayload = await verifyToken(request);

    if (!authPayload) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, avatar_url } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: authPayload.userId },
      data: {
        name: name !== undefined ? name : undefined,
        avatar_url: avatar_url !== undefined ? avatar_url : undefined,
        updated_at: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar_url: true,
        role: true,
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
