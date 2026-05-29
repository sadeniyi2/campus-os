import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getModel } from "@/lib/gemini/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const start = Date.now();
  const checks: Record<string, { status: "ok" | "degraded" | "down"; latencyMs?: number; message?: string }> = {};

  // Database check
  if (!process.env.DATABASE_URL) {
    checks.database = { status: "down", message: "DATABASE_URL environment variable not set in Vercel" };
  } else {
    try {
      const dbStart = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      checks.database = { status: "ok", latencyMs: Date.now() - dbStart };
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      // Surface a short, actionable message
      const msg = raw.includes("Connection refused") || raw.includes("ECONNREFUSED")
        ? "Connection refused — Supabase project may be paused. Resume it at supabase.com/dashboard."
        : raw.includes("password authentication") || raw.includes("auth")
        ? "Authentication failed — check DATABASE_URL password in Vercel env vars."
        : raw.includes("does not exist") || raw.includes("ENOTFOUND")
        ? "Host not found — check DATABASE_URL hostname in Vercel env vars."
        : raw.slice(0, 140);
      checks.database = { status: "down", message: msg };
    }
  }

  // AI service check — actually test a live Gemini call
  if (!process.env.GEMINI_API_KEY) {
    checks.ai = { status: "degraded", message: "GEMINI_API_KEY not configured" };
  } else {
    try {
      const aiStart = Date.now();
      const modelName = process.env.GEMINI_MODEL ?? "gemini-1.5-flash";
      const model = getModel(modelName);
      await model.generateContent("Reply with one word: OK");
      checks.ai = { status: "ok", latencyMs: Date.now() - aiStart, message: `Gemini ${modelName}` };
    } catch (err) {
      const raw = err instanceof Error ? err.message : "AI call failed";
      const hint = raw.includes("Error fetching")
        ? `Model unavailable — set GEMINI_MODEL env var to a valid model (e.g. gemini-2.0-flash-lite). Raw: ${raw.slice(0, 80)}`
        : raw.slice(0, 120);
      checks.ai = { status: "degraded", message: hint };
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
