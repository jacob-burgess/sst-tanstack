import { TranscriptChunk } from "@sst-tanstack/core/transcript/transcript-chunk";
import { createServerFn } from "@tanstack/start";

export const search = createServerFn(
  "GET",
  async (params: { query: string }) => {
    return await TranscriptChunk.search({ query: params.query });
  }
);
