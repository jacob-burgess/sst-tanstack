import { eq, sql } from "drizzle-orm";
import { useTransaction } from "../database/transaction";
import { distance } from "../database/types";
import { episodeTable } from "../episode/episode.sql";
import { generateEmbedding } from "../openai";
import { fn } from "../utils/fn";
import { videoTable } from "../video/video.sql";
import { transcriptChunkTable } from "./transcript-chunk.sql";
import { TranscriptChunkSchema } from "./transcript-chunk.schema";

export module TranscriptChunk {
  export const search = fn(
    TranscriptChunkSchema.SearchParams,
    async ({
      query,
      limit,
      offset,
    }): Promise<TranscriptChunkSchema.SearchOut[]> => {
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
}
