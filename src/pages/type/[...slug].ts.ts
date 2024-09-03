import type { APIContext } from "astro";
import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import { validateEnum, generateWebEnum } from "../../template";

type Type = CollectionEntry<"type">;

export async function getStaticPaths() {
    const types = await getCollection("type");
    return types
        .filter((x) => x.data.platforms.includes("web"))
        .map((type: Type) => ({
            params: { slug: type.slug },
        }));
}

export async function GET({ params }: APIContext) {
    const { slug } = params;
    if (slug == undefined) {
        throw Error("slug is undefined");
    }

    const type = await getEntry("type", slug);
    if (type == undefined) {
        throw Error("type is undefined");
    }

    const { remarkPluginFrontmatter } = await type.render();

    return new Response(
        generateWebEnum(
            validateEnum(
                type.data.type,
                type.slug,
                type.data.name,
                type.data.description,
                type.data.platforms,
                remarkPluginFrontmatter,
            ),
        ),
    );
}
