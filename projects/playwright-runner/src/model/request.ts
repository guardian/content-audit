import { z } from "zod";

export const AuditPageRequestSchema = z.object({
  url: z.string(),
});

export type AuditPageRequest = z.infer<typeof AuditPageRequestSchema>;
