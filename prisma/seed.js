// Cannot use '@' import as Node.js doesn't recognise it (when running prisma/seed.js)
import prisma from "../lib/prisma.js";
import {
  createBox,
  createSubmission,
} from "./queries.js";

// Enter Atlas Cloud userId here:
const adminId = "686943e8fe64107c2a61f343";

const boxData
  = {
    name: "Who is the best Pokemon?",
    description: "This is vital information",
  };

const submissionData = [
  { message: "Not Pikachu" },
  { message: "Lugia" },
  { message: "Totodile" },
  { message: "Pikachu" },
];

// WARNING: This function deletes all box/submission data currently on the database and seeds it with example data
async function run() {
  try {
    // Clear existing data
    await prisma.submission.deleteMany();
    await prisma.box.deleteMany();

    // Seed with example box and submissions
    const box = await createBox(adminId, boxData);
    for (const submission of submissionData) {
      await createSubmission(box.id, submission);
    }
  }
  catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
  finally {
    await prisma.$disconnect();
  }
}

run();
