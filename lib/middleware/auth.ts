import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  userId: string;
  sessionId: string;
  iat: number;
  exp: number;
}

export async function verifyToken(
  request: NextRequest
): Promise<AuthPayload | null> {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.slice(7);
    const payload = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "secret"
    ) as AuthPayload;

    return payload;
  } catch (error) {
    return null;
  }
}

export function withAuth(handler: Function) {
  return async (request: NextRequest, context: any) => {
    const authPayload = await verifyToken(request);

    if (!authPayload) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid or missing token" },
        { status: 401 }
      );
    }

    // Add auth payload to request context
    (request as any).user = authPayload;
    return handler(request, context);
  };
}

export function withRole(roles: string[]) {
  return (handler: Function) => {
    return async (request: NextRequest, context: any) => {
      const authPayload = await verifyToken(request);

      if (!authPayload) {
        return NextResponse.json(
          { error: "Unauthorized - Invalid or missing token" },
          { status: 401 }
        );
      }

      // Get user from database to check role
      const { prisma } = await import("@/lib/prisma");
      const user = await prisma.user.findUnique({
        where: { id: authPayload.userId },
      });

      if (!user || !roles.includes(user.role)) {
        return NextResponse.json(
          { error: "Forbidden - Insufficient permissions" },
          { status: 403 }
        );
      }

      (request as any).user = { ...authPayload, role: user.role };
      return handler(request, context);
    };
  };
}
