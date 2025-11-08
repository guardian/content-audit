import { PrismaClient } from "../../prisma/client/index.js";
import { getEnvOrThrow } from "./env.ts";

const datasourceUrl = getEnvOrThrow("DATABASE_URL");

export const getPrismaClient = () => {
  console.log(`Creating database client for URL ${datasourceUrl}`);

  new PrismaClient({
    log: ["query"],
    datasourceUrl,
  });
};
