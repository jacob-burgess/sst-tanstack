import { relations } from "drizzle-orm";
import { bigint, int, mysqlTable } from "drizzle-orm/mysql-core";
import { datetime } from "drizzle-orm/mysql-core/columns/datetime";
import { id, timestamps } from "../database/types";
import { guestTable } from "../guest/guest.sql";
import { setTable } from "../set/set.sql";
import { venueTable } from "../venue/venue.sql";
import { videoTable } from "../video/video.sql";
import { transcriptChunkTable } from "../transcript/transcript-chunk.sql";

export const episodeTable = mysqlTable("episode", {
  ...id,
  ...timestamps,
  videoId: bigint("video_id", { mode: "number" })
    .references(() => videoTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  venueId: bigint("venue_id", { mode: "number" })
    .references(() => venueTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  dateRecorded: datetime("date_recorded").notNull(),
  number: int("number").notNull(),
});

export const episodeRelations = relations(episodeTable, ({ many, one }) => ({
  video: one(videoTable, {
    fields: [episodeTable.videoId],
    references: [videoTable.id],
  }),
  venue: one(venueTable, {
    fields: [episodeTable.venueId],
    references: [venueTable.id],
  }),
  guests: many(guestTable),
  sets: many(setTable),
  transcriptChunks: many(transcriptChunkTable),
}));
