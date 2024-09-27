import { relations } from "drizzle-orm";
import {
  bigint,
  int,
  json,
  mysqlTable,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { id, timestamps } from "../database/types";
import { episodeTable } from "../episode/episode.sql";

export const transcriptEmbeddingTable = mysqlTable("transcript_embedding", {
  ...id,
  ...timestamps,
  text: text("text"),
  vector: json("embedding").$type<number[]>(),
  episodeId: bigint("episode_id", { mode: "number" })
    .references(() => episodeTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  startSecond: int("start_second"),
  endSecond: int("end_second"),
  model: varchar("model", { length: 255 }).notNull(),
});

export const embeddingRelations = relations(
  transcriptEmbeddingTable,
  ({ one }) => ({
    episode: one(episodeTable, {
      fields: [transcriptEmbeddingTable.episodeId],
      references: [episodeTable.id],
    }),
  })
);
