import { eq } from "drizzle-orm";
import { z } from "zod";
import { useTransaction } from "../database/transaction";
import { Episode } from "../episode/episode";
import { fn } from "../utils/fn";
import { guestTable } from "./guest.sql";
import { episodeTable } from "../episode/episode.sql";
import { personTable } from "../person/person.sql";

export module Guest {
  export const Info = z.object({
    id: z.number(),
    personId: z.number(),
    person: z.object({
      id: z.number(),
      name: z.string(),
      image: z.string().optional(),
    }),
    episodeId: z.number(),
    episode: z.object({
      id: z.number(),
      videoId: z.number(),
    }),
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, (id) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(guestTable)
        .innerJoin(personTable, eq(guestTable.personId, personTable.id))
        .innerJoin(episodeTable, eq(guestTable.episodeId, episodeTable.id))
        .where(eq(guestTable.id, id))
        .then((rows) => rows.map(serialize).at(0))
    )
  );

  export const byEpisodeId = fn(Episode.Info.shape.id, (id) =>
    useTransaction(async (tx) =>
      tx
        .select()
        .from(guestTable)
        .innerJoin(personTable, eq(guestTable.personId, personTable.id))
        .innerJoin(episodeTable, eq(guestTable.episodeId, episodeTable.id))
        .where(eq(guestTable.episodeId, id))
        .then((rows) => rows.map(serialize))
    )
  );

  export const CreateParams = Info.pick({
    id: true,
    personId: true,
    episodeId: true,
  }).partial({ id: true });
  export type CreateParams = z.infer<typeof CreateParams>;

  export const create = fn(CreateParams, (input) => createMany([input]));

  export const createMany = fn(z.array(CreateParams), (input) =>
    useTransaction(async (tx) => tx.insert(guestTable).values(input))
  );

  type SelectSchema = {
    guest: typeof guestTable.$inferSelect;
    episode: typeof episodeTable.$inferSelect;
    person: typeof personTable.$inferSelect;
  };
  export const serialize = (input: SelectSchema): Info => {
    return {
      id: input.guest.id,
      personId: input.guest.personId,
      episodeId: input.guest.episodeId,
      person: {
        id: input.person.id,
        name: input.person.name,
        image: input.person.image ?? undefined,
      },
      episode: {
        id: input.episode.id,
        videoId: input.episode.videoId,
      },
    };
  };
}
