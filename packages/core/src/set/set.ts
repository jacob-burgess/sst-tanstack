import { z } from "zod";
import { Person } from "../person/person";
import { useTransaction } from "../database/transaction";
import { setTable } from "./set.sql";
import { fn } from "../utils/fn";
import { eq } from "drizzle-orm";

export module Set {
  export const Info = z.object({
    id: z.string(),
    person: Person.Info,
    startSecond: z.number(),
    endSecond: z.number(),
  });

  export type Info = z.infer<typeof Info>;

  export const fromId = fn(Info.shape.id, (input) => {
    useTransaction(async (tx) => {
      const set = await tx
        .select()
        .from(setTable)
        .where(eq(setTable.id, input));
      return set;
    });
  });

  export const fromEpisodeId = fn(Info.shape.id, (input) => {
    useTransaction(async (tx) => {
      const sets = await tx
        .select()
        .from(setTable)
        .where(eq(setTable.episodeId, input));
      return sets;
    });
  });
}
