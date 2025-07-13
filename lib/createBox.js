"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

// Get form input from @/app/dashboard/create-box and add box to database
export async function createBox(formData) {
  const name = formData.get("name");
  const description = formData.get("description");

  if (!name || !description) {
    throw new Error("Missing name or description");
  }

  const session = await getServerSession(authOptions);
  if (!session)
    throw new Error("Not logged in");

  const box = await prisma.Box.create({
    data: {
      adminId: session.user.id,
      name,
      description,
      createdAt: new Date(),
    },
  });

  return box;
}
