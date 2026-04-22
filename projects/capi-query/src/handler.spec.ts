import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import { MockAgent, setGlobalDispatcher } from "undici";
import { TCompactProtocol, TFramedTransport } from "thrift";
import { SearchResponseSerde } from "@guardian/content-api-models/v1/searchResponse.js";
import type { SearchResponse } from "@guardian/content-api-models/v1/searchResponse.js";

import { createHandler } from "./handler.ts";
import { searchResponse } from "./fixtures.ts";

const capiApiKey = "test-api-key";
const capiUrl = "https://capi.test";

const serialiseSearchResponse = (response: SearchResponse): Buffer => {
  let result: Buffer | undefined;
  const transport = new TFramedTransport(
    undefined,
    (data: Buffer | undefined) => {
      // Strip the 4-byte frame length header added by TFramedTransport.flush
      result = data?.subarray(4);
    },
  );
  const protocol = new TCompactProtocol(transport);
  SearchResponseSerde.write(protocol, response);
  transport.flush();
  return result!;
};

describe("createHandler", () => {
  let agent: MockAgent;

  beforeEach(() => {
    agent = new MockAgent();
    setGlobalDispatcher(agent);
  });

  it("should return webUrls when the content API returns results", async () => {
    agent
      .get(capiUrl)
      .intercept({
        path: "/search?tag=news&api-key=test-api-key",
        method: "GET",
      })
      .reply(200, serialiseSearchResponse(searchResponse), {
        headers: { "content-type": "application/octet-stream" },
      });

    const handler = createHandler(capiApiKey, capiUrl);
    const result = await handler({ capiParameters: "tag=news" });

    assert.deepEqual(result, {
      items: [
        "https://www.theguardian.com/world/2026/apr/22/example-article-1",
        "https://www.theguardian.com/world/2026/apr/22/example-article-2",
      ],
    });
  });

  it("should throw when the content API returns a 500 response", async () => {
    agent
      .get(capiUrl)
      .intercept({
        path: "/search?tag=news&api-key=test-api-key",
        method: "GET",
      })
      .reply(500, "Internal Server Error");

    const handler = createHandler(capiApiKey, capiUrl);

    await assert.rejects(() => handler({ capiParameters: "tag=news" }));
  });
});
