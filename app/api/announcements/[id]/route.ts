import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id, deletedAt: null },
      include: {
        author: { select: { id: true, name: true, avatarUrl: true } },
        reactions: { include: { user: { select: { id: true, name: true } } } },
        comments: {
          where: { deletedAt: null },
          include: { user: { select: { id: true, name: true, avatarUrl: true } } },
          orderBy: { createdAt: "asc" },
        },
        _count: { select: { reactions: true, comments: true } },
      },
    });

    if (!announcement) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
    }

    return NextResponse.json({ data: announcement });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch announcement" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const canEdit = existing.authorId === dbUser.id || ["ADMIN", "SUPER_ADMIN"].includes(dbUser.role);
    if (!canEdit) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const updated = await prisma.announcement.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.content && { content: body.content }),
        ...(body.category && { category: body.category }),
        ...(body.isPinned !== undefined && { isPinned: body.isPinned }),
        ...(body.isUrgent !== undefined && { isUrgent: body.isUrgent }),
      },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const canDelete = existing.authorId === dbUser.id || ["ADMIN", "SUPER_ADMIN"].includes(dbUser.role);
    if (!canDelete) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.announcement.update({ where: { id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
  }
}
