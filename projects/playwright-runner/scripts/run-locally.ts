import { handler } from "../src/index.js";
import { parseArgs } from "node:util";

const {
  values: { url },
} = parseArgs({
  options: {
    url: {
      type: "string",
    },
  },
});

if (!url) {
    throw new Error("Usage: node ./run-locally --url <page-url>")
}

await handler({ url });
