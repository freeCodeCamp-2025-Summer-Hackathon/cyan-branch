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

// Date helpers
const calculateExpiration = ttlMs => new Date(Date.now() + ttlMs);
const isExpired = expiresAt => Date.now() > new Date(expiresAt).getTime();

export const createToken = () => nanoid(10); // Shorter token for user-friendly URLs

export function generateLink({ ttlMs = 3600000, boxId }) {
  return handleAsync(async () => {
    const token = createToken();
    return prisma.link.create({
      data: { token, expiresAt: calculateExpiration(ttlMs), boxId },
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

export async function updateLinkIfExpired(token) {
  const link = await prisma.link.findUnique({ where: { token } });

  if (!link)
    return;

  if (isExpired(link.expiresAt) && link.isActive) {
    await prisma.link.update({
      where: { token },
      data: { isActive: false },
    });
  }
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

export function extendLinkExpiration(token, additionalMs) {
  return handleAsync(async () => {
    const link = await prisma.link.findUnique({ where: { token } });

    if (!link)
      throw new Error("Link not found");

    return prisma.link.update({
      where: { token },
      data: {
        expiresAt: calculateExpiration(additionalMs),
        isActive: true,
      },
    });
  }, "Error extending link expiration:");
}

export const isLinkExpired = link => isExpired(link.expiresAt);

export const isLinkActive = link => link.isActive && !isLinkExpired(link);

export function formatTimeRemaining(expiresAt) {
  const diffMs = new Date(expiresAt).getTime() - Date.now();

  if (diffMs <= 0)
    return "Expired";

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return diffHours > 0
    ? `${diffHours}h ${diffMinutes}m remaining`
    : `${diffMinutes}m remaining`;
}
