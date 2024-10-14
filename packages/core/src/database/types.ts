import { sql } from "drizzle-orm";
import {
  bigint,
  customType,
  timestamp as drizzleTs,
  MySqlColumn,
} from "drizzle-orm/mysql-core";

/**
 * ID column for integer primary keys
 */
export const id = {
  get id() {
    return bigint("id", { mode: "number" }).primaryKey().autoincrement();
  },
};

/**
 * Timestamp column, formatted like `2024-02-29 12:00:00.000`
 */
export const timestamp = (name: string) =>
  drizzleTs(name, {
    fsp: 3,
    mode: "date",
  });

/**
 * Timestamp columns for created, updated, and deleted
 */
export const timestamps = {
  timeCreated: timestamp("time_created").notNull().defaultNow(),
  timeUpdated: timestamp("time_updated")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`),
  timeDeleted: timestamp("time_deleted"),
};

/**
 * Distance metrics for vector similarity search
 */
export type DistanceMetric = "DOT" | "COSINE" | "L2" | "L2_SQUARED";

/**
 * Custom type for Vector columns in planetscale
 */
export const vector = customType<{
  data: Buffer;
  config: { length: number };
  configRequired: true;
  driverData: Buffer;
}>({
  dataType(config) {
    return `vector(${config.length})`;
  },
  fromDriver(value) {
    return value;
  },
  toDriver(value) {
    return Buffer.from(value);
  },
});

/**
 * Serialize a vector into a Buffer.
 */
export function serializeVector(vector: number[]): Buffer {
  const floatArray = new Float32Array(vector);
  return Buffer.from(floatArray.buffer);
}

/**
 * Calculate the distance between an embedding and a column using a specified metric.
 */
export const distance = (
  embedding: number[],
  column: MySqlColumn,
  metric: DistanceMetric = "COSINE" // Default distance metric
) =>
  sql<number>`DISTANCE(TO_VECTOR(${JSON.stringify(embedding)}), ${column}, ${metric})`;
