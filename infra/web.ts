import { domain } from "./domain";

export const www = new sst.aws.TanstackStart("Site", {
  domain: {
    name: "www." + domain,
    dns: sst.cloudflare.dns(),
  },
  path: "./packages/web",
  // link: [api],
});

export const outputs = {
  www: www.url,
};
