import { eq } from "drizzle-orm";
import { z } from "zod";
import { useTransaction } from "../database/transaction";
import { Episode } from "../episode/episode";
import { fn } from "../utils/fn";
import { guestTable } from "./guest.sql";

export module Guest {
  export const Info = z.object({
    id: z.number(),
    personId: z.number(),
    episodeId: z.number(),
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, (id) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(guestTable)
        .where(eq(guestTable.id, id))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const byEpisodeId = fn(Episode.Info.shape.id, (id) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(guestTable)
        .where(eq(guestTable.episodeId, id))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const create = fn(Info.partial({ id: true }), (input) =>
    createMany([input])
  );

  export const createMany = fn(z.array(Info.partial({ id: true })), (input) =>
    useTransaction(async (tx) => tx.insert(guestTable).values(input))
  );

  export const serialize = (input: typeof guestTable.$inferSelect): Info => {
    return {
      id: input.id,
      personId: input.personId,
      episodeId: input.episodeId,
    };
  };
}
