import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser || !["LECTURER", "COURSE_REP", "ADMIN", "SUPER_ADMIN"].includes(dbUser.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() ?? "";
    const departmentId = searchParams.get("departmentId");
    const level = searchParams.get("level");

    const students = await prisma.student.findMany({
      where: {
        ...(departmentId ? { departmentId } : {}),
        ...(level ? { level: parseInt(level) } : {}),
        user: search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      },
      include: {
        user: { select: { id: true, name: true, email: true, avatarUrl: true } },
        department: { select: { name: true, code: true } },
      },
      orderBy: { user: { name: "asc" } },
      take: 30,
    });

    return NextResponse.json({ data: students });
  } catch (error) {
    console.error("GET /api/students error:", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}
