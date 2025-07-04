import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Gets sample test data from Prisma
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err: "Failed to fetch users" }, { status: 500 });
  }
}
