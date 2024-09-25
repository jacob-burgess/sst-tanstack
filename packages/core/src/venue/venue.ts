import { z } from "zod";
import { fn } from "../utils/fn";
import { useTransaction } from "../database/transaction";
import { eq, sql } from "drizzle-orm";
import { venueTable } from "./venue.sql";
import { createID } from "../utils/id";
import { invariant } from "../utils/invariant";

export module Venue {
  export const Info = z.object({
    id: z.string(),
    name: z.string(),
  });

  export type Info = z.infer<typeof Info>;

  export const fromId = fn(Info.shape.id, (input) => {
    useTransaction(async (tx) => {
      const venue = await tx
        .select()
        .from(venueTable)
        .where(eq(venueTable.id, input));
      if (!venue) {
        return undefined;
      }
      return venue;
    });
  });

  export const fromName = fn(Info.shape.name, (input) => {
    useTransaction(async (tx) => {
      const venue = await tx
        .select()
        .from(venueTable)
        .where(eq(venueTable.name, input));
      return venue;
    });
  });

  export const create = fn(
    Info.pick({ name: true, id: true }).partial({ id: true }),
    (input) => {
      useTransaction(async (tx) => {
        const id = input.id ?? createID("venue");
        const venue = await tx
          .insert(venueTable)
          .values({
            id,
            name: input.name,
          })
          .onDuplicateKeyUpdate({ set: { id: sql`id` } });
        invariant(venue.insertId, "Failed to create venue");
        return venue.insertId;
      });
    }
  );
}
