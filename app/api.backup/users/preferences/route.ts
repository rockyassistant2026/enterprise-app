import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/middleware/auth";
import { prisma } from "@/lib/prisma";

// GET /api/users/preferences
export async function GET(request: NextRequest) {
  try {
    const authPayload = await verifyToken(request);

    if (!authPayload) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const preferences = await prisma.preferences.findUnique({
      where: { user_id: authPayload.userId },
    });

    if (!preferences) {
      return NextResponse.json(
        { error: "Preferences not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ preferences }, { status: 200 });
  } catch (error) {
    console.error("Get preferences error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/users/preferences
export async function PUT(request: NextRequest) {
  try {
    const authPayload = await verifyToken(request);

    if (!authPayload) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { theme, language, email_notifications, push_notifications } =
      await request.json();

    const updatedPreferences = await prisma.preferences.update({
      where: { user_id: authPayload.userId },
      data: {
        ...(theme !== undefined && { theme }),
        ...(language !== undefined && { language }),
        ...(email_notifications !== undefined && { email_notifications }),
        ...(push_notifications !== undefined && { push_notifications }),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ preferences: updatedPreferences }, { status: 200 });
  } catch (error) {
    console.error("Update preferences error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
