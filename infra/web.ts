import { database } from "./database";
import { domain } from "./domain";
import { vector } from "./vector";

export const www = new sst.aws.TanstackStart("Site", {
  domain: {
    name: domain,
    redirects: ["www." + domain],
    // name: "www." + domain,
    dns: sst.cloudflare.dns(),
  },
  path: "./packages/www",
  link: [database, vector],
});

export const outputs = {
  www: www.url,
};
