import { z } from "zod";
import { Video } from "../video/video";
import { Venue } from "../venue/venue";
import { Guest } from "../guest/guest";
import { Set } from "../set/set";
import { fn } from "../utils/fn";
import { useTransaction } from "../database/transaction";
import { episodeTable } from "./episode.sql";
import { eq } from "drizzle-orm";

export module Episode {
  // TODO: Splat the type. here or on returns?
  export const Info = z.object({
    id: z.string(),
    dateRecorded: z.string(),
    video: Video.Info,
    venue: Venue.Info,
    guests: z.array(Guest.Info),
    sets: z.array(Set.Info),
  });

  export const fromId = fn(Info.shape.id, (input) => {
    useTransaction(async (tx) => {
      const episode = await tx
        .select()
        .from(episodeTable)
        .where(eq(episodeTable.id, input));
      return episode;
    });
  });
}
