"use server";

import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/authOptions";
import {
  createBox,
  createSubmission,
  deleteBox,
  updateBox,
  updateSubmission,
} from "@/prisma/queries";

// Box Actions

export async function createBoxAction(formData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Unauthorized: Must be logged in to create a box");
    }

    const name = formData.get("name");
    const description = formData.get("description");

    if (!name || !description) {
      throw new Error("Name and description are required");
    }

    const boxData = {
      name: name.toString(),
      description: description.toString(),
    };

    const newBox = await createBox(session.user.id, boxData);
    revalidatePath("/dashboard");

    return { success: true, data: newBox };
  }
  catch (error) {
    console.error("Create box action error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBoxAction(boxId, formData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Unauthorized: Must be logged in to update a box");
    }

    const name = formData.get("name");
    const description = formData.get("description");

    if (!name || !description) {
      throw new Error("Name and description are required");
    }

    const boxData = {
      name: name.toString(),
      description: description.toString(),
    };

    const updatedBox = await updateBox(boxId, boxData);

    revalidatePath("dashboard");
    revalidatePath(`/box/${boxId}`);
    return { success: true, data: updatedBox };
  }
  catch (error) {
    console.error("Update box action error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBoxAction(boxId) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Unauthorized: Must be logged in to delete a box");
    }

    const deletedBox = await deleteBox(boxId);

    revalidatePath("dashboard");
    return { success: true, data: deletedBox };
  }
  catch (error) {
    console.error("Delete box action error:", error);
    return { success: false, error: error.message };
  }
}

// Submission Actions

export async function createSubmissionAction(boxId, formData) {
  try {
    const message = formData.get("message");

    if (!message || !boxId) {
      throw new Error("Message and box ID are required");
    }

    const submissionData = {
      message: message.toString(),
    };

    const newSubmission = await createSubmission(boxId, submissionData);

    revalidatePath(`/box/${boxId}`);
    return { success: true, data: newSubmission };
  }
  catch (error) {
    console.error("Create submission action error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateSubmissionAction(submissionId, formData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Unauthorized: Must be logged in to respond to submissions");
    }

    const response = formData.get("response");

    if (!response) {
      throw new Error("Response is required");
    }

    const submissionData = {
      response: response.toString(),
    };

    const updatedSubmission = await updateSubmission(submissionId, submissionData);

    revalidatePath("/dashboard");
    return { success: true, data: updatedSubmission };
  }
  catch (error) {
    console.error("Update submission action error:", error);
    return { success: false, error: error.message };
  }
}
