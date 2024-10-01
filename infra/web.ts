import { database } from "./database";
import { domain } from "./domain";

export const www = new sst.aws.TanstackStart("Site", {
  domain: {
    name: domain,
    redirects: ["www." + domain],
    dns: sst.cloudflare.dns(),
  },
  path: "./packages/www",
  link: [database],
});

export const outputs = {
  www: www.url,
};
