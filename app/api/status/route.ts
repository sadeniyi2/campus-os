import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const start = Date.now();
  const checks: Record<string, { status: "ok" | "degraded" | "down"; latencyMs?: number; message?: string }> = {};

  // Database check
  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    checks.database = { status: "ok", latencyMs: Date.now() - dbStart };
  } catch (err) {
    checks.database = { status: "down", message: "Cannot reach database" };
  }

  // AI service check
  checks.ai = process.env.GEMINI_API_KEY
    ? { status: "ok" }
    : { status: "degraded", message: "GEMINI_API_KEY not configured" };

  // Attendance integration check
  checks.geomark = { status: "ok", message: "External service" };

  const allOk = Object.values(checks).every((c) => c.status === "ok");
  const anyDown = Object.values(checks).some((c) => c.status === "down");
  const overall = anyDown ? "down" : allOk ? "operational" : "degraded";

  return NextResponse.json(
    {
      status: overall,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? "1.0.0",
      uptimeMs: process.uptime() * 1000,
      responseMs: Date.now() - start,
      services: checks,
    },
    { status: anyDown ? 503 : 200 }
  );
}
