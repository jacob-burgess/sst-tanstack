import { date, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { id, timestamp, timestamps } from "../database/types";
import { relations } from "drizzle-orm";
import { episodeTable } from "../episode/episode.sql";

export const videoTable = mysqlTable("video", {
  ...id,
  ...timestamps,
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 5000 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 255 }).notNull(),
  durationSeconds: int("duration_seconds").notNull(),
  datePublished: date("date_published").notNull(),
  youtubeId: varchar("youtube_id", { length: 255 }).notNull().unique(),
  timeProcessed: timestamp("time_processed"),
});

export const videoRelations = relations(videoTable, ({ one }) => ({
  episode: one(episodeTable, {
    fields: [videoTable.id],
    references: [episodeTable.videoId],
  }),
}));
