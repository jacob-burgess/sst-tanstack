import { TranscriptChunk } from "@sst-tanstack/core/transcript/transcript-chunk";
import { TranscriptChunkSchema } from "@sst-tanstack/core/transcript/transcript-chunk.schema";
import { createServerFn } from "@tanstack/start";

// TODO: I want to be able to do this: but i think tanstack must inject "use server", so it fails at runtime.
// export const search = createServerFn("GET", TranscriptChunk.search);

export const search = createServerFn(
  "GET",
  async (search: TranscriptChunkSchema.SearchParams) => {
    return await TranscriptChunk.search(search);
  }
);
