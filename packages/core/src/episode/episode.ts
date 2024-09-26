import { eq } from "drizzle-orm";
import { z } from "zod";
import { useTransaction } from "../database/transaction";
import { fn } from "../utils/fn";
import { venueTable } from "../venue/venue.sql";
import { videoTable } from "../video/video.sql";
import { episodeTable } from "./episode.sql";
import { createInsertSchema } from "drizzle-zod";

export module Episode {
  export const Info = z.object({
    id: z.number(),
    youtubeId: z.string(),
    number: z.number(),
    title: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    durationSeconds: z.number(),
    datePublished: z.date(),
    dateRecorded: z.date(),
    videoId: z.number(),
    venueId: z.number(),
    venue: z.string().optional(),
    // guests: z.array(GuestAppearanceInfo),
    // sets: z.array(SetInfo),
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, (id) => {
    return useTransaction(async (tx) =>
      tx
        .select()
        .from(episodeTable)
        .innerJoin(videoTable, eq(episodeTable.videoId, videoTable.id))
        .innerJoin(venueTable, eq(episodeTable.venueId, venueTable.id))
        .where(eq(episodeTable.id, id))
        .then((rows) => rows.map(serialize).at(0))
    );
  });

  export const create = fn(createInsertSchema(episodeTable), (input) =>
    createMany([input])
  );

  export const createMany = fn(
    z.array(createInsertSchema(episodeTable)),
    (input) =>
      useTransaction(async (tx) => tx.insert(episodeTable).values(input))
  );

  type EpisodeWithJoins = {
    episode: typeof episodeTable.$inferSelect;
    video: typeof videoTable.$inferSelect;
    venue: typeof venueTable.$inferSelect;
  };

  export const serialize = (input: EpisodeWithJoins): Info => {
    return {
      id: input.episode.id,
      youtubeId: input.video.youtubeId,
      number: input.episode.number,
      title: input.video.title ?? undefined,
      description: input.video.description ?? undefined,
      thumbnail: input.video.thumbnail ?? undefined,
      durationSeconds: input.video.durationSeconds,
      datePublished: input.video.datePublished,
      dateRecorded: input.episode.dateRecorded,
      videoId: input.video.id,
      venueId: input.episode.venueId,
      venue: input.venue.name ?? undefined,
    };
  };
}
