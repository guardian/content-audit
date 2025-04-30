import { PrismaClient } from "@prisma/client";

export const getPrismaClient = () =>
  new PrismaClient({
    log: ["query"],
  });
