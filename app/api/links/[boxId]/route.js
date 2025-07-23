import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { boxId } = await params;

    // Verify user owns the box
    const box = await prisma.box.findUnique({
      where: { id: boxId },
    });

    if (!box || box.adminId !== session.user.id) {
      return NextResponse.json({ error: "Box not found or unauthorized" }, { status: 404 });
    }

    // Fetch links for this box
    const links = await prisma.link.findMany({
      where: { boxId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(links);
  }
  catch (error) {
    console.error("Links API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
