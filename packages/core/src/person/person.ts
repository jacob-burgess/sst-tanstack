import { eq } from "drizzle-orm";
import { z } from "zod";
import { useTransaction } from "../database/transaction";
import { fn } from "../utils/fn";
import { personTable } from "./person.sql";

export module Person {
  export const Info = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().optional(),
    link: z.string().optional(),
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, (input) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(personTable)
        .where(eq(personTable.id, input))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const byName = fn(Info.shape.name, (input) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(personTable)
        .where(eq(personTable.name, input))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const create = fn(Info.partial({ id: true }), (input) =>
    useTransaction(async (tx) => tx.insert(personTable).values(input))
  );

  export const createMany = fn(z.array(Info.partial({ id: true })), (input) =>
    useTransaction(async (tx) => tx.insert(personTable).values(input))
  );

  export const serialize = (input: typeof personTable.$inferSelect): Info => {
    return {
      id: input.id,
      name: input.name,
      image: input.image ?? undefined,
      link: input.link ?? undefined,
    };
  };
}
