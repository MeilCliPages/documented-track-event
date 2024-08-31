import type { APIContext } from "astro";
import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import { validateEventParameter, generateAndroidEvent } from "../../template";

type Event = CollectionEntry<"event">;

export async function getStaticPaths() {
    const events = await getCollection("event");
    return events.map((event: Event) => ({
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

    const eventParameter = validateEventParameter(event.data.name, event.data.description, remarkPluginFrontmatter);
    return new Response(generateAndroidEvent(eventParameter));
}
