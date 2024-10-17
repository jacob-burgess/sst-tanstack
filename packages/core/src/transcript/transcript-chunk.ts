import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { useTransaction } from "../database/transaction";
import { distance } from "../database/types";
import { episodeTable } from "../episode/episode.sql";
import { generateEmbedding } from "../openai";
import { fn } from "../utils/fn";
import { videoTable } from "../video/video.sql";
import { transcriptChunkTable } from "./transcript-chunk.sql";
import { fallback } from "@tanstack/router-zod-adapter";

export module TranscriptChunk {
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

  export const SearchParams = z.object({
    query: fallback(z.string(), "").default("The best damn band in the land"),
    limit: fallback(z.number(), 10).default(10),
    offset: fallback(z.number(), 0).default(0),
  });
  export type SearchParams = z.infer<typeof SearchParams>;

  export const search = fn(
    SearchParams,
    async ({ query, limit, offset }): Promise<SearchOut[]> => {
      const vector = await generateEmbedding(query);
      if (!vector) {
        console.error("error fetching vector");
        return [];
      }

      return useTransaction(async (tx) =>
        tx
          .select({
            id: transcriptChunkTable.id,
            text: transcriptChunkTable.text,
            startSecond: transcriptChunkTable.startSecond,
            endSecond: transcriptChunkTable.endSecond,
            distance: sql<number>`${distance(vector, transcriptChunkTable.embedding)} as distance`,
            episode: {
              id: episodeTable.id,
              youtubeId: videoTable.youtubeId,
              number: episodeTable.number,
              title: videoTable.title,
              description: videoTable.description,
              // dateRecorded: episodeTable.dateRecorded,
              // datePublished: videoTable.datePublished,
            },
          })
          .from(transcriptChunkTable)
          .innerJoin(
            episodeTable,
            eq(transcriptChunkTable.episodeId, episodeTable.id)
          )
          .innerJoin(videoTable, eq(episodeTable.videoId, videoTable.id))
          .orderBy(sql`distance desc`)
          .limit(limit)
          .offset(offset)
      );
    }
  );

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
