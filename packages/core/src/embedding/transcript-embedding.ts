import { z } from "zod";
import { fn } from "../utils/fn";
import { useTransaction } from "../database/transaction";
import { transcriptEmbeddingTable } from "./embedding.sql";
import { eq } from "drizzle-orm";

export module TranscriptEmbedding {
  export const Info = z.object({
    id: z.number(),
    text: z.string().optional(),
    vector: z.array(z.number()).optional(),
    episodeId: z.number(),
    startSecond: z.number().optional(),
    endSecond: z.number().optional(),
    model: z.string(),
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, async (id) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(transcriptEmbeddingTable)
        .where(eq(transcriptEmbeddingTable.id, id))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const byEpisodeId = fn(Info.shape.episodeId, async (episodeId) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(transcriptEmbeddingTable)
        .where(eq(transcriptEmbeddingTable.episodeId, episodeId))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const create = fn(Info.partial({ id: true }), async (input) =>
    createMany([input])
  );

  export const createMany = fn(
    z.array(Info.partial({ id: true })),
    async (input) =>
      useTransaction(async (tx) =>
        tx.insert(transcriptEmbeddingTable).values(input)
      )
  );

  export const update = fn(Info, async (input) =>
    useTransaction(async (tx) =>
      tx
        .update(transcriptEmbeddingTable)
        .set(input)
        .where(eq(transcriptEmbeddingTable.id, input.id))
    )
  );

  const serialize = (
    embedding: typeof transcriptEmbeddingTable.$inferSelect
  ): Info => {
    return {
      id: embedding.id,
      text: embedding.text ?? undefined,
      vector: embedding.vector ?? undefined,
      episodeId: embedding.episodeId,
      startSecond: embedding.startSecond ?? undefined,
      endSecond: embedding.endSecond ?? undefined,
      model: embedding.model,
    };
  };
}
