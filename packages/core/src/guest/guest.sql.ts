import { relations } from "drizzle-orm";
import { bigint, mysqlTable, uniqueIndex } from "drizzle-orm/mysql-core";
import { id, timestamps } from "../database/types";
import { episodeTable } from "../episode/episode.sql";
import { personTable } from "../person/person.sql";

export const guestTable = mysqlTable(
  "guest",
  {
    ...id,
    ...timestamps,
    personId: bigint("person_id", { mode: "number" })
      .references(() => personTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    episodeId: bigint("episode_id", { mode: "number" })
      .references(() => episodeTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => ({
    uniqPersonEpisode: uniqueIndex("uniq_person_episode").on(
      table.personId,
      table.episodeId
    ),
  })
);

export const guestRelations = relations(guestTable, ({ one }) => ({
  episode: one(episodeTable, {
    fields: [guestTable.episodeId],
    references: [episodeTable.id],
  }),
  person: one(personTable, {
    fields: [guestTable.personId],
    references: [personTable.id],
  }),
}));
