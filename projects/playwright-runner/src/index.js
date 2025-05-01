import { auditPage } from "./audit.ts";
import { createHandler } from "./handler.ts";
import { getPrismaClient } from "./util/db.ts";

export const handler = createHandler(auditPage, getPrismaClient);
