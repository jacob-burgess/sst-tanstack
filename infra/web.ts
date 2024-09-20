import { database } from "./database";
import { domain } from "./domain";

export const www = new sst.aws.TanstackStart("Site", {
  domain: {
    name: "www." + domain,
    dns: sst.cloudflare.dns(),
  },
  path: "./packages/web",
  link: [database],
});

export const outputs = {
  www: www.url,
};
