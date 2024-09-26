import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { useTransaction } from "../database/transaction";
import { fn } from "../utils/fn";
import { venueTable } from "./venue.sql";

export module Venue {
  export const Info = z.object({
    id: z.number(),
    name: z.string(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    room: z.string().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, (id) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(venueTable)
        .where(eq(venueTable.id, id))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const byName = fn(z.string(), (name) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(venueTable)
        .where(eq(venueTable.name, name))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const CreateSchema = Info.pick({
    id: true,
    name: true,
    city: true,
    state: true,
    country: true,
    room: true,
    image: true,
    link: true,
  }).partial({
    id: true,
  });

  export const create = fn(CreateSchema, (input) => createMany([input]));

  export const createMany = fn(z.array(CreateSchema), (input) =>
    useTransaction(async (tx) => {
      const venues = await tx
        .insert(venueTable)
        .values(input)
        .onDuplicateKeyUpdate({ set: { id: sql`id` } });
      return venues.insertId;
    })
  );

  const serialize = (input: typeof venueTable.$inferSelect): Info => {
    return {
      id: input.id,
      name: input.name ?? undefined,
      city: input.city ?? undefined,
      state: input.state ?? undefined,
      country: input.country ?? undefined,
      room: input.room ?? undefined,
      image: input.image ?? undefined,
      link: input.link ?? undefined,
    };
  };
}
