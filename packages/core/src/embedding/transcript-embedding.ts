import {
  asc,
  count as drizzleCount,
  eq,
  inArray,
  isNull,
  sql,
  SQL,
} from "drizzle-orm";
import { z } from "zod";
import { useTransaction } from "../database/transaction";
import { distance, serializeVector } from "../database/types";
import { generateEmbedding } from "../openai";
import { fn } from "../utils/fn";
import { transcriptEmbeddingTable } from "./embedding.sql";

export module TranscriptEmbedding {
  export const Info = z.object({
    id: z.number(),
    text: z.string().optional(),
    embedding: z.array(z.number()).optional(),
    vector: z.custom<Buffer>((data) => data instanceof Buffer).optional(),
    episodeId: z.number(),
    startSecond: z.number().optional(),
    endSecond: z.number().optional(),
    model: z.string(),
  });
  export type Info = z.infer<typeof Info>;

  export const allIds = fn(z.object({}), async () =>
    useTransaction(async (tx) =>
      tx
        .select({ id: transcriptEmbeddingTable.id })
        .from(transcriptEmbeddingTable)
        .then((rows) => rows.map((row) => row.id))
    )
  );

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

  export const UpdateSchema = z.array(
    z.object({
      id: z.number(),
      vector: z.array(z.number()),
    })
  );
  export type UpdateSchema = z.infer<typeof UpdateSchema>;

  export const updateVectorById = fn(UpdateSchema, async (inputs) => {
    if (inputs.length === 0) {
      return;
    }

    const sqlChunks: SQL[] = [];
    const ids: number[] = [];
    sqlChunks.push(sql`(case`);
    for (const input of inputs) {
      sqlChunks.push(
        sql`when ${transcriptEmbeddingTable.id} = ${input.id} then ${serializeVector(input.vector)}`
      );
      ids.push(input.id);
    }
    sqlChunks.push(sql`end)`);
    const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));

    return useTransaction(async (tx) =>
      tx
        .update(transcriptEmbeddingTable)
        .set({ vector: finalSql })
        .where(inArray(transcriptEmbeddingTable.id, ids))
    );
  });

  export const ListParams = z.object({
    limit: z.number().optional().default(100),
    offset: z.number().optional().default(0),
  });

  export const list = fn(ListParams, async ({ limit, offset }) =>
    useTransaction(async (tx) =>
      tx
        .select({
          id: transcriptEmbeddingTable.id,
          embedding: transcriptEmbeddingTable.vector,
        })
        .from(transcriptEmbeddingTable)
        .orderBy(asc(transcriptEmbeddingTable.id))
        .limit(limit)
        .offset(offset)
    )
  );

  export const listIds = fn(ListParams, async ({ limit, offset }) =>
    useTransaction(async (tx) =>
      tx
        .select({ id: transcriptEmbeddingTable.id })
        .from(transcriptEmbeddingTable)
        .where(isNull(transcriptEmbeddingTable.vector))
        .orderBy(asc(transcriptEmbeddingTable.id))
        .limit(limit)
        .offset(offset)
        .then((rows) => rows.map((row) => row.id))
    )
  );

  export const count = fn(z.object({}), async () =>
    useTransaction(async (tx) =>
      tx
        .select({ count: drizzleCount() })
        .from(transcriptEmbeddingTable)
        .then((rows) => rows.at(0)?.count ?? 0)
    )
  );

  export const SearchParams = z.object({
    query: z.string(),
    limit: z.number().optional().default(100),
    offset: z.number().optional().default(0),
  });
  export type SearchParams = z.infer<typeof SearchParams>;

  export const search = fn(SearchParams, async ({ query, limit, offset }) => {
    const vector = await generateEmbedding(query);
    if (!vector) {
      console.error("error fetching vector");
      return [];
    }

    return useTransaction(async (tx) =>
      tx
        .select({
          id: transcriptEmbeddingTable.id,
          text: transcriptEmbeddingTable.text,
          episodeId: transcriptEmbeddingTable.episodeId,
          startSecond: transcriptEmbeddingTable.startSecond,
          endSecond: transcriptEmbeddingTable.endSecond,
          distance: sql`${distance(vector, transcriptEmbeddingTable.vector)} as distance`,
        })
        .from(transcriptEmbeddingTable)
        .orderBy(sql`distance desc`)
        .limit(limit)
        .offset(offset)
    );
  });

  const serialize = (
    embedding: typeof transcriptEmbeddingTable.$inferSelect
  ): Info => {
    return {
      id: embedding.id,
      text: embedding.text ?? undefined,
      embedding: embedding.embedding ?? undefined,
      episodeId: embedding.episodeId,
      startSecond: embedding.startSecond ?? undefined,
      endSecond: embedding.endSecond ?? undefined,
      model: embedding.model,
    };
  };
}
