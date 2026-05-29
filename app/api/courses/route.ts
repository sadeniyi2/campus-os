import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: {
        lecturer: true,
        student: true,
      },
    });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    let courses;

    if (dbUser.role === "LECTURER" && dbUser.lecturer) {
      courses = await prisma.course.findMany({
        where: { lecturerId: dbUser.lecturer.id, deletedAt: null },
        include: {
          department: { select: { name: true, code: true } },
          _count: { select: { enrollments: true, assignments: true } },
        },
        orderBy: { code: "asc" },
      });
    } else if ((dbUser.role === "STUDENT" || dbUser.role === "COURSE_REP") && dbUser.student) {
      const enrollments = await prisma.enrollment.findMany({
        where: { studentId: dbUser.student.id },
        include: {
          course: {
            include: {
              department: { select: { name: true, code: true } },
              lecturer: { include: { user: { select: { name: true } } } },
              _count: { select: { enrollments: true } },
            },
          },
        },
        orderBy: { course: { code: "asc" } },
      });
      courses = enrollments.map((e) => ({ ...e.course, enrollmentId: e.id }));
    } else {
      // Admin: return all
      courses = await prisma.course.findMany({
        where: { deletedAt: null },
        include: {
          department: { select: { name: true, code: true } },
          lecturer: { include: { user: { select: { name: true } } } },
          _count: { select: { enrollments: true, assignments: true } },
        },
        orderBy: { code: "asc" },
      });
    }

    return NextResponse.json({ data: courses });
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser || !["ADMIN", "SUPER_ADMIN"].includes(dbUser.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { code, title, description, units, departmentId, lecturerId, semester, level } = body;

    if (!code || !title || !departmentId || !units || !semester || !level) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: { code, title, description, units: parseInt(units), departmentId, lecturerId, semester: parseInt(semester), level: parseInt(level) },
      include: { department: { select: { name: true, code: true } } },
    });

    return NextResponse.json({ data: course }, { status: 201 });
  } catch (error) {
    console.error("POST /api/courses error:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
