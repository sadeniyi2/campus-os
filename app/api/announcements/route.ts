import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const category = searchParams.get("category");

  try {
    const where = {
      deletedAt: null,
      ...(category && category !== "ALL" ? { category: category as never } : {}),
    };

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, avatarUrl: true, role: true } },
          _count: { select: { reactions: true, comments: true } },
        },
        orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.announcement.count({ where }),
    ]);

    return NextResponse.json({
      data: announcements,
      total,
      page,
      limit,
      hasMore: page * limit < total,
    });
  } catch (error) {
    console.error("GET /api/announcements error:", error);
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, category, isPinned, isUrgent, isScheduled, scheduledAt, targetRoles, departmentId } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        authorId: dbUser.id,
        category: category ?? "ACADEMIC",
        isPinned: isPinned ?? false,
        isUrgent: isUrgent ?? false,
        isScheduled: isScheduled ?? false,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        targetRoles: targetRoles ?? [],
        departmentId: departmentId ?? null,
        attachments: [],
      },
      include: { author: { select: { id: true, name: true, avatarUrl: true } } },
    });

    return NextResponse.json({ data: announcement }, { status: 201 });
  } catch (error) {
    console.error("POST /api/announcements error:", error);
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
  }
}
