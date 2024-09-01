export const Platforms = ["android", "web"] as const;
export type Platform = (typeof Platforms)[number];
