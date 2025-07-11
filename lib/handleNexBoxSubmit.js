'use server';

import { getServerSession } from "next-auth";

export async function handleNewBoxSubmit() {
  const name = formData.get('name');
  const description = formData.get('description');

  const session = await getServerSession(authOptions);
}