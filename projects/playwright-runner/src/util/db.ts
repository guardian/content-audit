import { PrismaClient } from "../../prisma/client/index.js";

export const getPrismaClient = () =>
  new PrismaClient({
    log: ["query"],
  })
