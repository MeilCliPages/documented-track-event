import type { APIContext } from "astro";
import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import { validateCommon, generateWebCommon } from "../../template";

type Common = CollectionEntry<"common">;

export async function getStaticPaths() {
    const commons = await getCollection("common");
    return commons.map((common: Common) => ({
        params: { slug: common.slug },
    }));
}

export async function GET({ params }: APIContext) {
    const { slug } = params;
    if (slug == undefined) {
        throw Error("slug is undefined");
    }

    const common = await getEntry("common", slug);
    if (common == undefined) {
        throw Error("common is undefined");
    }

    const { remarkPluginFrontmatter } = await common.render();

    return new Response(
        generateWebCommon(
            validateCommon(common.data.name, common.data.description, common.data.platforms, remarkPluginFrontmatter),
        ),
    );
}
