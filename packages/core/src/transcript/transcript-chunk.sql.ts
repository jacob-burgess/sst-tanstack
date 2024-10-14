import { relations } from "drizzle-orm";
import { bigint, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { id, timestamps, vector } from "../database/types";
import { episodeTable } from "../episode/episode.sql";

export const transcriptChunkTable = mysqlTable("transcript_chunk", {
  ...id,
  text: text("text").notNull(),
  embedding: vector("embedding", { length: 1536 }).notNull(),
  model: varchar("model", { length: 255 }).notNull(),
  episodeId: bigint("episode_id", { mode: "number" })
    .references(() => episodeTable.id)
    .notNull(),
  startSecond: int("start_second").notNull(),
  endSecond: int("end_second").notNull(),
  ...timestamps,
});
// TODO: there is a vector index on the embedding column, but idk how to do that in drizzle yet

export const transcriptChunkRelations = relations(
  transcriptChunkTable,
  ({ one }) => ({
    episode: one(episodeTable, {
      fields: [transcriptChunkTable.episodeId],
      references: [episodeTable.id],
    }),
  })
);
