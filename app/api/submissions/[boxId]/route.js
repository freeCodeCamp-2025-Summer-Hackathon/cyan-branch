import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { boxId } = await params;
    const box = await prisma.box.findUnique({
      where: { id: boxId },
      include: { admin: true },
    });

    if (!box || box.adminId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const submissions = await prisma.submission.findMany({
      where: { boxId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(submissions);
  }
  catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
