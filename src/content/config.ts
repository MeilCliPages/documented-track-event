import { defineCollection, z } from "astro:content";

const type = defineCollection({
    type: "content",
    schema: z.object({
        name: z.string(),
        description: z.string(),
        platforms: z.array(z.union([z.literal("web"), z.literal("android")])),
        type: z.union([z.literal("int_enum"), z.literal("string_enum")]),
    }),
});

const common = defineCollection({
    type: "content",
    schema: z.object({
        name: z.string(),
        description: z.string(),
        platforms: z.array(z.union([z.literal("web"), z.literal("android")])),
    }),
});

const event = defineCollection({
    type: "content",
    schema: z.object({
        name: z.string(),
        description: z.string(),
        platforms: z.array(z.union([z.literal("web"), z.literal("android")])),
    }),
});

export const collections = { type, common, event };
