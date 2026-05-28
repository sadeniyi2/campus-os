import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { canAccessRoute, getDashboardPath } from "@/lib/auth/rbac";
import type { Role } from "@/types";

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 100;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

const PUBLIC_ROUTES = ["/", "/login", "/register", "/verify", "/forgot-password", "/auth"];
const PROTECTED_PREFIXES = ["/student", "/lecturer", "/course-rep", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  if (!checkRateLimit(ip)) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))
  ) {
    const { supabaseResponse } = await updateSession(request);
    return supabaseResponse;
  }

  const isDashboardRoute = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isDashboardRoute) {
    const { supabaseResponse } = await updateSession(request);
    return supabaseResponse;
  }

  const { supabaseResponse, user } = await updateSession(request);

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = (user.user_metadata?.role ?? "STUDENT") as Role;

  if (!canAccessRoute(pathname, role)) {
    const dashboardPath = getDashboardPath(role);
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  supabaseResponse.headers.set("X-Frame-Options", "DENY");
  supabaseResponse.headers.set("X-Content-Type-Options", "nosniff");
  supabaseResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
