import { defineCollection, z } from "astro:content";

const event = defineCollection({
    type: "content",
    schema: z.object({
        name: z.string(),
        description: z.string(),
        platforms: z.array(z.string()),
    }),
});

export const collections = { event };
