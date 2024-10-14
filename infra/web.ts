import { database } from "./database";
import { domain } from "./domain";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

export const www = new sst.aws.TanstackStart("Site", {
  domain: {
    name: domain,
    redirects: ["www." + domain],
    dns: sst.cloudflare.dns(),
  },
  path: "./packages/www",
  link: [database],
  environment: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
});

export const outputs = {
  www: www.url,
};
