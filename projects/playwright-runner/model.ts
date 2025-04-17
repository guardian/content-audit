import { z } from "zod";

export const AuditPageOptionsSchema = z.object({
  url: z.string(),
});

export type AuditPageOptions = z.infer<typeof AuditPageOptionsSchema>;
