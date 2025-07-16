// Cannot use '@' import as Node.js doesn't recognise it (when running prisma/seed.js)
import prisma from "../lib/prisma.js";

// Get all the boxes
export async function getBoxes(adminId) {
  try {
    const boxes = await prisma.box.findMany({
      where: {
        adminId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return boxes;
  }
  catch (err) {
    console.error(err);
    throw new Error("Failed to fetch boxes");
  }
}

// Get a box by ID
export async function getBoxById(boxId) {
  try {
    const box = await prisma.box.findUnique({
      where: {
        id: boxId,
      },
      include: {
        submissions: true, // Include submissions associated with the box
      },
    });
    return box;
  }
  catch (err) {
    console.error(err);
    throw new Error("Failed to fetch box");
  }
}

// Create a new box
export async function createBox(adminId, boxData) {
  try {
    const box = await prisma.box.create({
      data: {
        ...boxData,
        adminId,
      },
    });
    return box;
  }
  catch (err) {
    console.error(err);
    throw new Error("Failed to create box");
  }
}

// Update a box
export async function updateBox(boxId, boxData) {
  try {
    const box = await prisma.box.update({
      where: {
        id: boxId,
      },
      data: boxData,
    });
    return box;
  }
  catch (err) {
    console.error(err);
    throw new Error("Failed to update box");
  }
}

// Delete a box
export async function deleteBox(boxId) {
  try {
    const box = await prisma.box.delete({
      where: {
        id: boxId,
      },
    });
    return box;
  }
  catch (err) {
    console.error(err);
    throw new Error("Failed to delete box");
  }
}

// Update a submission i.e respond to a submission
export async function updateSubmission(submissionId, submissionData) {
  try {
    const submission = await prisma.submission.update({
      where: {
        id: submissionId,
      },
      data: submissionData,
    });
    return submission;
  }
  catch (err) {
    console.error(err);
    throw new Error("Failed to update submission");
  }
}

// Create a new submission
export async function createSubmission(boxId, submissionData) {
  try {
    const submission = await prisma.submission.create({
      data: {
        ...submissionData,
        boxId,
      },
    });
    return submission;
  }
  catch (err) {
    console.error(err);
    throw new Error("Failed to create submission");
  }
}

// Get all submissions for a box
export async function getSubmissionsByBoxId(boxId) {
  try {
    const submissions = await prisma.submission.findMany({
      where: {
        boxId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return submissions;
  }
  catch (err) {
    console.error(err);
    throw new Error("Failed to fetch submissions");
  }
}
