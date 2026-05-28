import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const semester = searchParams.get("semester");
  const type = searchParams.get("type");
  const departmentId = searchParams.get("departmentId");

  try {
    const timetables = await prisma.timetable.findMany({
      where: {
        deletedAt: null,
        ...(semester ? { semester: parseInt(semester) } : {}),
        ...(type ? { type: type as never } : {}),
        ...(departmentId ? { departmentId } : {}),
      },
      include: {
        department: { select: { id: true, name: true, code: true } },
        versions: { orderBy: { version: "desc" }, take: 5 },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ data: timetables });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch timetables" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const semester = parseInt(formData.get("semester") as string);
    const type = (formData.get("type") as string) ?? "CLASS";
    const departmentId = formData.get("departmentId") as string;
    const session = (formData.get("session") as string) ?? "2024/2025";

    if (!file || !title || !departmentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileName = `timetables/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("campus-os")
      .upload(fileName, fileBuffer, { contentType: file.type });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from("campus-os").getPublicUrl(fileName);

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const timetable = await prisma.timetable.create({
      data: {
        title,
        type: type as never,
        departmentId,
        semester: semester || 1,
        session,
        fileUrl: publicUrl,
        fileType: file.type,
        uploadedBy: dbUser.id,
      },
    });

    return NextResponse.json({ data: timetable }, { status: 201 });
  } catch (error) {
    console.error("POST /api/timetables error:", error);
    return NextResponse.json({ error: "Failed to upload timetable" }, { status: 500 });
  }
}
