export const domain =
  {
    production: "fanhard.app",
    dev: "dev.fanhard.app",
  }[$app.stage] || $app.stage + ".dev.fanhard.app";

export const zone = cloudflare.getZoneOutput({
  name: "fanhard.app",
});
