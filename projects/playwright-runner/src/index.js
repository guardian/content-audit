import { auditPage } from "./audit.ts";
import { createHandler } from "./handler.ts";

export const handler = createHandler(auditPage);
