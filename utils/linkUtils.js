import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";

// Helper to handle errors consistently
async function handleAsync(fn, errorMsg) {
  try {
    return await fn();
  }
  catch (error) {
    console.error(errorMsg, error);
    throw error;
  }
}

export const createToken = () => nanoid(10); // Shorter token for user-friendly URLs

export function generateLink({ boxId }) {
  return handleAsync(async () => {
    const token = createToken();
    return prisma.link.create({
      data: { token, boxId },
    });
  }, "Error generating link:");
}

export function getLinkByToken(token) {
  return handleAsync(async () =>
    prisma.link.findUnique({
      where: { token },
      include: { box: true },
    }), "Error fetching link by token:");
}

export function updateLinkStatus(token, isActive) {
  return handleAsync(async () =>
    prisma.link.update({
      where: { token },
      data: { isActive },
    }), "Error updating link status:");
}

export function deleteLink(token) {
  return handleAsync(async () =>
    prisma.link.delete({ where: { token } }), "Error deleting link:");
}

export const isLinkActive = link => link.isActive;

export function getFullLinkUrl(token) {
  const baseUrl = "http://localhost:3000";
  // Generate URL in the format: myapp.com/voice-tokenhere
  return `${baseUrl}/voice-${token}`;
}
