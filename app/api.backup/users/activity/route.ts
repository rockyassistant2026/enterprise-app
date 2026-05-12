import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/middleware/auth";
import { prisma } from "@/lib/prisma";

// POST /api/users/activity (Log activity)
export async function POST(request: NextRequest) {
  try {
    const authPayload = await verifyToken(request);

    if (!authPayload) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { event_type, event_data } = await request.json();

    if (!event_type) {
      return NextResponse.json(
        { error: "Event type is required" },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.create({
      data: {
        user_id: authPayload.userId,
        event_type,
        event_data: event_data || null,
      },
    });

    return NextResponse.json({ activity }, { status: 201 });
  } catch (error) {
    console.error("Log activity error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/users/activity (Get user's activity)
export async function GET(request: NextRequest) {
  try {
    const authPayload = await verifyToken(request);

    if (!authPayload) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where: { user_id: authPayload.userId },
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.activity.count({
        where: { user_id: authPayload.userId },
      }),
    ]);

    return NextResponse.json(
      {
        activities,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get activity error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
