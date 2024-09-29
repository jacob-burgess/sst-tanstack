import { Episode } from "@sst-tanstack/core/episode/episode";
import { Guest } from "@sst-tanstack/core/guest/guest";

import { createServerFn } from "@tanstack/start";

export const guestByEpisodeId = createServerFn(
  "GET",
  async (episodeId: number) => {
    return Guest.byEpisodeId(episodeId);
  }
);

export const episodeByYoutubeId = createServerFn(
  "GET",
  async (youtubeId: string) => {
    return Episode.byYoutubeId(youtubeId);
  }
);
