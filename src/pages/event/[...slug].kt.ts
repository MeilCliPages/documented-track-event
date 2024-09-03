import type { APIContext } from "astro";
import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import { createTypeContext } from "../../content/create-type-context";
import { validateEvent, generateAndroidEvent } from "../../template";

type Event = CollectionEntry<"event">;

export async function getStaticPaths() {
    const events = await getCollection("event");
    return events
        .filter((x) => x.data.platforms.includes("android"))
        .map((event: Event) => ({
            params: { slug: event.slug },
        }));
}

export async function GET({ params }: APIContext) {
    const { slug } = params;
    if (slug == undefined) {
        throw Error("slug is undefined");
    }

    const event = await getEntry("event", slug);
    if (event == undefined) {
        throw Error("event is undefined");
    }

    const { remarkPluginFrontmatter } = await event.render();
    const typeContext = await createTypeContext();

    return new Response(
        generateAndroidEvent(
            validateEvent(typeContext, event.data.name, event.data.description, remarkPluginFrontmatter),
        ),
    );
}
