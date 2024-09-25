import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { id, timestamps } from "../database/types";

export const personTable = mysqlTable("person", {
  ...id,
  ...timestamps,
  name: varchar("name", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  link: varchar("link", { length: 255 }),
});
