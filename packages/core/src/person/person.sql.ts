import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { id, timestamps } from "../database/types";
import { relations } from "drizzle-orm";
import { guestTable } from "../guest/guest.sql";
import { setTable } from "../set/set.sql";

export const personTable = mysqlTable("person", {
  ...id,
  ...timestamps,
  name: varchar("name", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  link: varchar("link", { length: 255 }),
});

export const personRelations = relations(personTable, ({ many }) => ({
  guestAppearances: many(guestTable),
  sets: many(setTable),
}));
