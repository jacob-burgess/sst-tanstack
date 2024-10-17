import { TranscriptChunk } from "@sst-tanstack/core/transcript/transcript-chunk";
import { createServerFn } from "@tanstack/start";

export const SearchParams = TranscriptChunk.SearchParams;
export type SearchParams = TranscriptChunk.SearchParams;

export const SearchOut = TranscriptChunk.SearchOut;
export type SearchOut = TranscriptChunk.SearchOut;

// TODO: I want to be able to do this: but i think tanstack must inject "use server", so it fails at runtime.
// export const search = createServerFn("GET", TranscriptChunk.search);

export const search = createServerFn(
  "GET",
  async (search: TranscriptChunk.SearchParams) => {
    return await TranscriptChunk.search(search);
  }
);
