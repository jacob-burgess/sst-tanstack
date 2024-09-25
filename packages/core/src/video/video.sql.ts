import { date, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { id, timestamp, timestamps } from "../database/types";

export const videoTable = mysqlTable("video", {
  ...id,
  ...timestamps,
  title: varchar("title", { length: 255 }),
  description: varchar("description", { length: 255 }),
  thumbnailUrl: varchar("thumbnail_url", { length: 255 }),
  durationSeconds: int("duration_seconds").notNull(),
  datePublished: date("date_published").notNull(),
  youtubeId: varchar("youtube_id", { length: 255 }),
  timeProcessed: timestamp("time_processed"),
});
