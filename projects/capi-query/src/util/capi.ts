import type { SearchResponse } from "@guardian/content-api-models/v1/searchResponse.js";
import { SearchResponseSerde } from "@guardian/content-api-models/v1/searchResponse.js";
import type { TProtocol } from "thrift";
import { TCompactProtocol, TFramedTransport } from "thrift";

const resultToThrift = (contentBuffer: Buffer): TProtocol => {
  const transport = new TFramedTransport(contentBuffer);
  return new TCompactProtocol(transport);
};

export const deserialiseSearchResponse = (content: ArrayBuffer): SearchResponse =>  SearchResponseSerde.read(
    resultToThrift(Buffer.from(content)),
  );