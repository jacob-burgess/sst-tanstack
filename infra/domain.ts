const permanent = {
  production: "killtony.fyi",
  dev: "dev.killtony.fyi",
} as Record<string, string>;

export const domain = permanent[$app.stage] ?? $app.stage + ".dev.killtony.fyi";

export const zone = cloudflare.getZoneOutput({
  name: "killtony.fyi",
});
