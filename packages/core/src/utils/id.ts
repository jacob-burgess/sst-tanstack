import { ulid } from "ulid";

const prefixes = {
  user: "usr",
  venue: "ven",
  video: "vid",
  episode: "epi",
  person: "per",
  guest: "gst",
  set: "set",
} as const;

export function createID(prefix: keyof typeof prefixes): string {
  return [prefixes[prefix], ulid()].join("_");
}
