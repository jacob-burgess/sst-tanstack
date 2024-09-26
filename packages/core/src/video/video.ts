import { and, eq, isNull } from "drizzle-orm";
import { z } from "zod";
import { useTransaction } from "../database/transaction";
import { fn } from "../utils/fn";
import { videoTable } from "./video.sql";

export module Video {
  export const Info = z.object({
    id: z.number(),
    youtubeId: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    durationSeconds: z.number(),
    datePublished: z.date(),
    timeProcessed: z.date().optional(),
  });
  export type Info = z.infer<typeof Info>;

  export const fromId = fn(Info.shape.id, (id) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(videoTable)
        .where(and(eq(videoTable.id, id), isNull(videoTable.timeDeleted)))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const fromYoutubeId = fn(Info.shape.youtubeId, (youtubeId) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(videoTable)
        .where(
          and(
            eq(videoTable.youtubeId, youtubeId),
            isNull(videoTable.timeDeleted)
          )
        )
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const create = fn(
    Info.partial({
      id: true,
    }),
    (input) => createMany([input])
  );

  export const createMany = fn(
    z.array(
      Info.partial({
        id: true,
      })
    ),
    (input) => useTransaction(async (tx) => tx.insert(videoTable).values(input))
  );

  function serialize(
    input: typeof videoTable.$inferSelect
  ): z.infer<typeof Info> {
    return {
      id: input.id,
      youtubeId: input.youtubeId,
      title: input.title ?? undefined,
      description: input.description ?? undefined,
      thumbnail: input.thumbnail ?? undefined,
      durationSeconds: input.durationSeconds,
      datePublished: input.datePublished,
      timeProcessed: input.timeProcessed ?? undefined,
    };
  }
}
