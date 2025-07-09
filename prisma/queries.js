import prisma from "@/lib/prisma";

// Get all the boxes
export async function getBoxes(adminId) {
  try {
    const boxes = await prisma.box.findMany({
        where: {
            adminId: adminId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });
    return boxes;
  } catch (err) {
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
<<<<<<< HEAD
            submissions: true, // Include submissions associated with the box
=======
            items: true, // Include items associated with the box i.e. submissions
>>>>>>> f6e7c37 (feat: add query file)
        },
    });
    return box;
  } catch (err) {
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
        adminId: adminId,
      },
    });
    return box;
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete box");
  }
}

// Update a submission i.e respond to a submission
export async function updateSubmission(submissionId, submissionData) {
  try {
    const submission = await prisma.item.update({
      where: {
        id: submissionId,
      },
      data: submissionData,
    });
    return submission;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update submission");
  }
}
