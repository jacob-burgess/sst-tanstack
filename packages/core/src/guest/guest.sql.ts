import { mysqlTable, uniqueIndex } from "drizzle-orm/mysql-core";
import { id, timestamps, ulid } from "../database/types";
import { episodeTable } from "../episode/episode.sql";
import { personTable } from "../person/person.sql";

export const guestTable = mysqlTable(
  "guest",
  {
    ...id,
    ...timestamps,
    personId: ulid("person_id")
      .references(() => personTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    episodeId: ulid("episode_id")
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
