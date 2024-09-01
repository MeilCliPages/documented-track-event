import { defineCollection, z } from "astro:content";

const common = defineCollection({
    type: "content",
    schema: z.object({
        name: z.string(),
        description: z.string(),
        platforms: z.array(z.string()),
    }),
});

const event = defineCollection({
    type: "content",
    schema: z.object({
        name: z.string(),
        description: z.string(),
        platforms: z.array(z.string()),
    }),
});

export const collections = { common, event };
