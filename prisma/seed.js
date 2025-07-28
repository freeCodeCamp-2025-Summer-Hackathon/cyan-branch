import minimist from "minimist";
// Cannot use '@' import as Node.js doesn't recognise it (when running prisma/seed.js)
import prisma from "../lib/prisma.js";
import {
  createBox,
  createSubmission,
} from "./queries.js";

const args = minimist(process.argv.slice(2));
const adminEmail = args.email;

const admin = await prisma.user.findUnique({
  where: { email: adminEmail },
});
if (!admin) {
  throw new Error(`Admin user with email ${adminEmail} not found`);
}

const adminId = admin.id;

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

// WARNING: This function deletes the user's box/submission data currently on the database and seeds it with example data
async function run() {
  try {
    // Clear existing user data
    await prisma.submission.deleteMany({
      where: {
        box: {
          adminId,
        },
      },
    });
    await prisma.link.deleteMany({
      where: {
        box: {
          adminId,
        },
      },
    });
    await prisma.box.deleteMany({
      where: {
        adminId,
      },
    });

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
