import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { courseId },
      include: {
        student: {
          include: {
            user: { select: { id: true, name: true, email: true, avatarUrl: true } },
          },
        },
      },
      orderBy: { student: { user: { name: "asc" } } },
    });

    return NextResponse.json({ data: enrollments });
  } catch (error) {
    console.error("GET /api/courses/[courseId]/students error:", error);
    return NextResponse.json({ error: "Failed to fetch enrolled students" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser || !["LECTURER", "COURSE_REP", "ADMIN", "SUPER_ADMIN"].includes(dbUser.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { studentIds, semester, session } = body;

    if (!studentIds?.length || !semester || !session) {
      return NextResponse.json({ error: "studentIds, semester and session are required" }, { status: 400 });
    }

    const results = await Promise.allSettled(
      studentIds.map((studentId: string) =>
        prisma.enrollment.upsert({
          where: { studentId_courseId_session: { studentId, courseId, session } },
          update: {},
          create: { studentId, courseId, semester: parseInt(semester), session },
        })
      )
    );

    const enrolled = results.filter((r) => r.status === "fulfilled").length;
    return NextResponse.json({ data: { enrolled, total: studentIds.length } }, { status: 201 });
  } catch (error) {
    console.error("POST /api/courses/[courseId]/students error:", error);
    return NextResponse.json({ error: "Failed to enroll students" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser || !["LECTURER", "COURSE_REP", "ADMIN", "SUPER_ADMIN"].includes(dbUser.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { enrollmentId } = body;
    if (!enrollmentId) return NextResponse.json({ error: "enrollmentId is required" }, { status: 400 });

    await prisma.enrollment.delete({ where: { id: enrollmentId } });
    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("DELETE /api/courses/[courseId]/students error:", error);
    return NextResponse.json({ error: "Failed to remove student" }, { status: 500 });
  }
}
