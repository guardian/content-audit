import { auditPage } from "./audit.ts";
import { createHandler } from "./handler.ts";
import { getPrismaClient } from "./util/db.ts";

// Instantiated outside of the handler, to ensure that the Prisma instance and
// its connection pool are reused between invocations where possible. See
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#the-serverless-challenge
// for details.
const client = getPrismaClient();

export const handler = createHandler(auditPage, client);
