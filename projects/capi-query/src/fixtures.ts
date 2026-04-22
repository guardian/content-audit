import { ContentType } from "@guardian/content-api-models/v1/contentType.js";
import type { SearchResponse } from "@guardian/content-api-models/v1/searchResponse.js";

export const searchResponse: SearchResponse = {
  status: "ok",
  userTier: "internal",
  total: 2,
  startIndex: 1,
  pageSize: 10,
  currentPage: 1,
  pages: 1,
  orderBy: "newest",
  results: [
    {
      id: "world/2026/apr/22/example-article-1",
      type: ContentType.ARTICLE,
      webTitle: "Example article 1",
      webUrl: "https://www.theguardian.com/world/2026/apr/22/example-article-1",
      apiUrl: "",
      tags: [],
      isHosted: true,
      references: [],
    },
    {
      id: "world/2026/apr/22/example-article-2",
      type: ContentType.ARTICLE,
      webTitle: "Example article 2",
      webUrl: "https://www.theguardian.com/world/2026/apr/22/example-article-2",
      apiUrl: "",
      tags: [],
      isHosted: true,
      references: [],
    },
  ],
};
