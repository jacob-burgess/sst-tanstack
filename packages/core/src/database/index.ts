import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Resource } from "sst";
export * from "drizzle-orm";
import * as embeddingSchema from "../embedding/embedding.sql";
import * as episodeSchema from "../episode/episode.sql";
import * as guestSchema from "../guest/guest.sql";
import * as personSchema from "../person/person.sql";
import * as setSchema from "../set/set.sql";
import * as venueSchema from "../venue/venue.sql";
import * as videoSchema from "../video/video.sql";

export const schema = {
  ...embeddingSchema,
  ...episodeSchema,
  ...guestSchema,
  ...personSchema,
  ...setSchema,
  ...venueSchema,
  ...videoSchema,
};

type Schema = typeof schema;

const client = new Client({
  host: Resource.Database.host,
  username: Resource.Database.username,
  password: Resource.Database.password,
});

export const db = drizzle(client, {
  schema,
  logger:
    process.env.DRIZZLE_LOG === "true"
      ? {
          logQuery(query, params) {
            console.log("query", query);
            console.log("params", params);
          },
        }
      : undefined,
});
