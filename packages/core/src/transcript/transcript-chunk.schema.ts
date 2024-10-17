import { z } from "zod";
import { fallback } from "@tanstack/router-zod-adapter";

export module TranscriptChunkSchema {
  export const Info = z.object({
    id: z.number(),
    text: z.string(),
    startSecond: z.number(),
    endSecond: z.number(),
    episode: z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      publishedAt: z.string(),
      youtubeId: z.string(),
    }),
  });
  export type Info = z.infer<typeof Info>;

  // TODO: fallback is a tanstack thing, it doesnt belong in the core package. lazy rn
  export const SearchParams = z.object({
    query: fallback(z.string(), "").default("The best damn band in the land"),
    limit: fallback(z.number(), 10).default(10),
    offset: fallback(z.number(), 0).default(0),
  });
  export type SearchParams = z.infer<typeof SearchParams>;

  export const SearchOut = z.object({
    id: z.number(),
    text: z.string(),
    startSecond: z.number(),
    endSecond: z.number(),
    distance: z.number(),
    episode: z.object({
      id: z.number(),
      youtubeId: z.string(),
      number: z.number(),
      title: z.string(),
      description: z.string(),
      // TODO: serialization issues on dates
      // dateRecorded: z.string(),
      // datePublished: z.string(),
    }),
  });
  export type SearchOut = z.infer<typeof SearchOut>;
}
