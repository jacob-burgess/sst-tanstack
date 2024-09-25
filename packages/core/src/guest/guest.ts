import { z } from "zod";
import { Person } from "../person/person";
import { fn } from "../utils/fn";
import { useTransaction } from "../database/transaction";
import { guestTable } from "./guest.sql";
import { eq } from "drizzle-orm";

export module Guest {
  export const Info = z.object({
    id: z.string(),
    person: Person.Info,
  });

  export type Info = z.infer<typeof Info>;

  export const fromId = fn(Info.shape.id, (input) => {
    useTransaction(async (tx) => {
      const guest = await tx
        .select()
        .from(guestTable)
        .where(eq(guestTable.id, input));
      if (!guest?.length) {
        return undefined;
      }
      return guest[0];
    });
  });

  export const fromEpisodeId = fn(Info.shape.id, (input) => {
    useTransaction(async (tx) => {
      const guests = await tx
        .select()
        .from(guestTable)
        .where(eq(guestTable.episodeId, input));
      return guests;
    });
  });
}
