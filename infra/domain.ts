const permanent = {
  production: "fanhard.app",
  dev: "dev.fanhard.app",
} as Record<string, string>;

export const domain = permanent[$app.stage] ?? $app.stage + ".dev.fanhard.app";

export const zone = cloudflare.getZoneOutput({
  name: "fanhard.app",
});
