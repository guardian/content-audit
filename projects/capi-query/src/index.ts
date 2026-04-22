import { createHandler } from "./handler.ts";
import { getEnvOrThrow } from "./util/env.ts";

const capiApiKey = getEnvOrThrow("CAPI_API_KEY");
const capiUrl = getEnvOrThrow("CAPI_URL");

export const handler = createHandler(capiApiKey, capiUrl);