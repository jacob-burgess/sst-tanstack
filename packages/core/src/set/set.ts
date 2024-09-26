import { eq } from "drizzle-orm";
import { z } from "zod";
import { useTransaction } from "../database/transaction";
import { fn } from "../utils/fn";
import { setTable } from "./set.sql";

export module Set {
  export const Info = z.object({
    id: z.number(),
    startSecond: z.number(),
    endSecond: z.number(),
    personId: z.number(),
    episodeId: z.number(),
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, (id) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(setTable)
        .where(eq(setTable.id, id))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const byEpisodeId = fn(Info.shape.episodeId, (episodeId) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(setTable)
        .where(eq(setTable.episodeId, episodeId))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const create = fn(Info.partial({ id: true }), (input) =>
    createMany([input])
  );

  export const createMany = fn(z.array(Info.partial({ id: true })), (input) =>
    useTransaction(async (tx) => tx.insert(setTable).values(input))
  );

  const serialize = (input: typeof setTable.$inferSelect): Info => {
    return {
      id: input.id,
      startSecond: input.startSecond,
      endSecond: input.endSecond,
      personId: input.personId,
      episodeId: input.episodeId,
    };
  };
}
