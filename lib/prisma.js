import { env } from "node:process";
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/no-mutable-exports
let prisma;

if (env.NODE_ENV === "production") {
  prisma = new PrismaClient();
}
else {
  if (!globalThis.prisma)
    globalThis.prisma = new PrismaClient();
  prisma = globalThis.prisma;
}

export default prisma;
