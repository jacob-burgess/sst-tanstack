import { id, timestamps } from "../database/types";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { episodeTable } from "../episode/episode.sql";

export const venueTable = mysqlTable("venue", {
  ...id,
  ...timestamps,
  name: varchar("name", { length: 256 }).notNull().unique(),
  city: varchar("city", { length: 64 }),
  state: varchar("state", { length: 2 }),
  country: varchar("country", { length: 64 }),
  room: varchar("room", { length: 64 }),
  image: varchar("image", { length: 256 }),
  link: varchar("link", { length: 256 }),
});

export const venueRelations = relations(venueTable, ({ many }) => ({
  episodes: many(episodeTable),
}));
