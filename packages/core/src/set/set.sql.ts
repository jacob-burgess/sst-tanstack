import { relations } from "drizzle-orm";
import { bigint, int, mysqlTable } from "drizzle-orm/mysql-core";
import { id, timestamps } from "../database/types";
import { episodeTable } from "../episode/episode.sql";
import { personTable } from "../person/person.sql";

export const setTable = mysqlTable("set", {
  ...id,
  ...timestamps,
  episodeId: bigint("episode_id", { mode: "number" })
    .references(() => episodeTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  personId: bigint("person_id", { mode: "number" })
    .references(() => personTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  startSecond: int("start_second").notNull(),
  endSecond: int("end_second").notNull(),
});

export const setRelations = relations(setTable, ({ one }) => ({
  episode: one(episodeTable, {
    fields: [setTable.episodeId],
    references: [episodeTable.id],
  }),
  person: one(personTable, {
    fields: [setTable.personId],
    references: [personTable.id],
  }),
}));
