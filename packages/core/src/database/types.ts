import { sql } from "drizzle-orm";
import { bigint, char, timestamp as rawTs } from "drizzle-orm/mysql-core";

export const ulid = (name: string) => char(name, { length: 26 + 4 });

export const id = {
  get id() {
    return bigint("id", { mode: "number" }).primaryKey().autoincrement();
  },
};

export const timestamp = (name: string) =>
  rawTs(name, {
    fsp: 3,
    mode: "date",
  });

export const timestamps = {
  timeCreated: timestamp("time_created").notNull().defaultNow(),
  timeUpdated: timestamp("time_updated")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`),
  timeDeleted: timestamp("time_deleted"),
};
