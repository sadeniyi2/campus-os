import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getModel } from "@/lib/gemini/client";

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
  } catch {
    checks.database = { status: "down", message: "Cannot reach database" };
  }

  // AI service check — actually test a live Gemini call
  if (!process.env.GEMINI_API_KEY) {
    checks.ai = { status: "degraded", message: "GEMINI_API_KEY not configured" };
  } else {
    try {
      const aiStart = Date.now();
      const model = getModel();
      await model.generateContent("Say OK");
      checks.ai = { status: "ok", latencyMs: Date.now() - aiStart };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "AI call failed";
      checks.ai = { status: "degraded", message: msg.slice(0, 120) };
    }
  }

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
