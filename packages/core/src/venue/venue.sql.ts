import { id, timestamps } from "../database/types";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const venueTable = mysqlTable("venue", {
  ...id,
  ...timestamps,
  name: varchar("name", { length: 255 }).unique(),
});
