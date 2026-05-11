import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface HealthCheck {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number;
  checks: {
    database: "ok" | "error";
    server: "ok" | "error";
    memoryUsage: string;
  };
  version: string;
}

export async function GET(): Promise<NextResponse<HealthCheck>> {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  try {
    // Database connectivity check
    const userCount = await prisma.user.count();

    // Memory usage check
    const memUsage = process.memoryUsage();
    const heapUsedPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;

    // Determine health status
    let status: "healthy" | "degraded" | "unhealthy" = "healthy";

    if (heapUsedPercent > 90) {
      status = "degraded";
    }

    const response: HealthCheck = {
      status,
      timestamp,
      uptime: process.uptime(),
      checks: {
        database: "ok",
        server: "ok",
        memoryUsage: `${heapUsedPercent.toFixed(2)}%`,
      },
      version: "1.0.0",
    };

    const statusCode = status === "healthy" ? 200 : 503;
    return NextResponse.json(response, { status: statusCode });
  } catch (error) {
    const response: HealthCheck = {
      status: "unhealthy",
      timestamp,
      uptime: process.uptime(),
      checks: {
        database: "error",
        server: "ok",
        memoryUsage: "unknown",
      },
      version: "1.0.0",
    };

    return NextResponse.json(response, { status: 503 });
  }
}

// Liveness probe (is the app running?)
export async function HEAD() {
  return NextResponse.json(null, { status: 200 });
}
