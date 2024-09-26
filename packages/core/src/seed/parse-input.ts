import { readFile } from "fs/promises";
import { join } from "path";
import { z } from "zod";
import { episodeTable } from "../episode/episode.sql";
import { videoTable } from "../video/video.sql";

const seedDir = join(__dirname, ".");

const venueSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    room: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
  })
);

export async function parseVenues() {
  const venueRaw = JSON.parse(
    await readFile(join(seedDir, "venue.json"), "utf-8")
  );
  const venuesParsed = venueSchema.safeParse(venueRaw);
  if (!venuesParsed.success) {
    console.error(venuesParsed.error);
    throw new Error("Failed to parse venues");
  }
  const venues = venuesParsed.data;
  return venues;
}

const personSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
  })
);

export async function parsePeople() {
  const personRaw = JSON.parse(
    await readFile(join(seedDir, "person.json"), "utf-8")
  );
  const peopleParsed = personSchema.safeParse(personRaw);
  if (!peopleParsed.success) {
    console.error(peopleParsed.error);
    throw new Error("Failed to parse people");
  }
  const people = peopleParsed.data;
  return people;
}

const episodeSchema = z.array(
  z.object({
    id: z.number(),
    number: z.string(),
    title: z.string(),
    description: z.string(),
    date_recorded: z.string(),
    date_published: z.string(),
    duration_seconds: z.number(),
    thumbnail: z.string(),
    yt_id: z.string(),
    venue_id: z.number(),
    time_created: z.string(),
    time_updated: z.string(),
    time_deleted: z.string().nullable(),
  })
);

export async function parseEpisodes() {
  const episodeRaw = JSON.parse(
    await readFile(join(seedDir, "episode.json"), "utf-8")
  );
  const episodesParsed = episodeSchema.safeParse(episodeRaw);
  if (!episodesParsed.success) {
    console.error(episodesParsed.error);
    throw new Error("Failed to parse episodes");
  }
  const episodes = episodesParsed.data;

  type Mapped = {
    video: typeof videoTable.$inferInsert;
    episode: typeof episodeTable.$inferInsert;
  };

  return episodes.map(
    (episode, i): Mapped => ({
      video: {
        id: i + 1,
        title: episode.title,
        description: episode.description,
        datePublished: new Date(episode.date_published),
        durationSeconds: episode.duration_seconds,
        thumbnail: episode.thumbnail,
        youtubeId: episode.yt_id,
      },
      episode: {
        id: episode.id,
        number: Number(episode.number),
        dateRecorded: new Date(episode.date_recorded),
        venueId: episode.venue_id,
        videoId: i + 1,
      },
    })
  );
}

const guestSchema = z.array(
  z.object({
    id: z.number(),
    person_id: z.number(),
    episode_id: z.number(),
  })
);

export async function parseGuests() {
  const guestRaw = JSON.parse(
    await readFile(join(seedDir, "guest.json"), "utf-8")
  );
  const guestsParsed = guestSchema.safeParse(guestRaw);
  if (!guestsParsed.success) {
    console.error(guestsParsed.error);
    throw new Error("Failed to parse guests");
  }
  const guests = guestsParsed.data;
  return guests;
}

const setSchema = z.array(
  z.object({
    id: z.number(),
    person_id: z.number(),
    episode_id: z.number(),
    start_second: z.number(),
    end_second: z.number(),
  })
);

export async function parseSets() {
  const setRaw = JSON.parse(await readFile(join(seedDir, "set.json"), "utf-8"));
  const setsParsed = setSchema.safeParse(setRaw);
  if (!setsParsed.success) {
    console.error(setsParsed.error);
    throw new Error("Failed to parse sets");
  }
  const sets = setsParsed.data;
  return sets;
}
