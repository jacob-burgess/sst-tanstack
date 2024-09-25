import { z } from "zod";
import { videoTable } from "./video.sql";
import { eq } from "drizzle-orm";
import { useTransaction } from "../database/transaction";
import { fn } from "../utils/fn";

export module Video {
  export const Info = z.object({
    id: z.string(),
    youtubeId: z.string(),
    title: z.string(),
    description: z.string().optional(),
    thumbnailUrl: z.string().optional(),
    durationSeconds: z.number(),
    datePublished: z.date(),
  });

  export type Info = z.infer<typeof Info>;

  export const fromId = fn(Info.shape.id, (input) => {
    useTransaction(async (tx) => {
      const video = await tx
        .select()
        .from(videoTable)
        .where(eq(videoTable.id, input));
      if (!video) {
        return undefined;
      }
      return video;
    });
  });
}
