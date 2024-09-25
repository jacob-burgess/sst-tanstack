import { mysqlTable } from "drizzle-orm/mysql-core";
import { datetime } from "drizzle-orm/mysql-core/columns/datetime";
import { id, timestamps, ulid } from "../database/types";
import { venueTable } from "../venue/venue.sql";
import { videoTable } from "../video/video.sql";

export const episodeTable = mysqlTable("episode", {
  ...id,
  ...timestamps,
  videoId: ulid("video_id")
    .references(() => videoTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  venueId: ulid("venue_id")
    .references(() => venueTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  dateRecorded: datetime("date_recorded").notNull(),
});
