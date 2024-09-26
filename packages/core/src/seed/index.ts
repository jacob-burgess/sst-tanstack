import { Episode } from "../episode/episode";
import { Guest } from "../guest/guest";
import { Person } from "../person/person";
import { Set } from "../set/set";
import { Venue } from "../venue/venue";
import { Video } from "../video/video";
import {
  parseEpisodes,
  parseGuests,
  parsePeople,
  parseSets,
  parseVenues,
} from "./parse-input";

async function main() {
  const venues = await parseVenues();
  await Venue.createMany(
    venues.map((v) => ({
      id: v.id,
      name: v.name,
      city: v.city ?? undefined,
      state: v.state ?? undefined,
      country: v.country ?? undefined,
      room: v.room ?? undefined,
      image: v.image ?? undefined,
      link: v.link ?? undefined,
    }))
  );

  const people = await parsePeople();
  await Person.createMany(
    people.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image ?? undefined,
      link: p.link ?? undefined,
    }))
  );

  const episodes = await parseEpisodes();
  await Video.createMany(
    episodes.map((e) => ({
      id: e.video.id,
      youtubeId: e.video.youtubeId,
      title: e.video.title ?? undefined,
      description: e.video.description ?? undefined,
      thumbnail: e.video.thumbnail ?? undefined,
      durationSeconds: e.video.durationSeconds,
      datePublished: e.video.datePublished,
    }))
  );
  await Episode.createMany(
    episodes.map((e) => ({
      id: e.episode.id,
      youtubeId: e.video.youtubeId,
      number: e.episode.number,
      dateRecorded: e.episode.dateRecorded,
      durationSeconds: e.video.durationSeconds,
      venueId: e.episode.venueId,
      videoId: e.episode.videoId,
    }))
  );

  const guests = await parseGuests();
  await Guest.createMany(
    guests.map((g) => ({
      // id: g.id,
      personId: g.person_id,
      episodeId: g.episode_id,
    }))
  );

  const sets = await parseSets();
  await Set.createMany(
    sets.map((s) => ({
      // id: s.id,
      personId: s.person_id,
      episodeId: s.episode_id,
      startSecond: s.start_second,
      endSecond: s.end_second,
    }))
  );
}

main()
  .then(() => console.log("done"))
  .catch(console.error);
