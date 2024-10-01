import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

const { username, password, host, database } = Resource.Database;

export default defineConfig({
  strict: true,
  verbose: true,
  out: "./migrations",
  dialect: "mysql",
  dbCredentials: {
    url: `mysql://${username}:${password}@${host}/${database}`,
  },
  schema: "./src/**/*.sql.ts",
});
