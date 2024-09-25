import { int, mysqlTable, uniqueIndex } from "drizzle-orm/mysql-core";
import { episodeTable } from "../episode/episode.sql";
import { id, timestamps, ulid } from "../database/types";
import { personTable } from "../person/person.sql";

export const setTable = mysqlTable(
  "set",
  {
    ...id,
    ...timestamps,
    episodeId: ulid("episode_id")
      .references(() => episodeTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    personId: ulid("person_id")
      .references(() => personTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    startSecond: int("start_second").notNull(),
    endSecond: int("end_second").notNull(),
  },
  (table) => ({
    uniqPersonEpisode: uniqueIndex("uniq_person_episode").on(
      table.personId,
      table.episodeId
    ),
  })
);
