import { URL } from "node:url";
import { deserialiseSearchResponse } from "./util/capi.ts";

type Payload = {
  capiParameters: string;
};

export const createHandler =
  (capiApiKey: string, capiUrl: string) =>
  async ({ capiParameters }: Payload) => {
    const url = new URL(`${capiUrl}/search?${capiParameters}`);
    url.searchParams.append("api-key", capiApiKey);

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const searchResponse = deserialiseSearchResponse(buffer);

    return { items: searchResponse.results.map(({ webUrl }) => webUrl) };
  };
