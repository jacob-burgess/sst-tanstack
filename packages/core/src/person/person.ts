import { z } from "zod";
import { fn } from "../utils/fn";
import { useTransaction } from "../database/transaction";
import { personTable } from "./person.sql";
import { eq } from "drizzle-orm";

export module Person {
  export const Info = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().optional(),
    link: z.string().optional(),
  });

  export type Info = z.infer<typeof Info>;

  export const fromId = fn(Info.shape.id, (input) => {
    useTransaction(async (tx) => {
      const person = await tx
        .select()
        .from(personTable)
        .where(eq(personTable.id, input));
      if (!person?.length) {
        return undefined;
      }
      return person[0];
    });
  });
}
