import type { APIContext } from "astro";
import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import { createTypeContext } from "../../content/create-type-context";
import { validateCommon, generateAndroidCommon } from "../../template";

type Common = CollectionEntry<"common">;

export async function getStaticPaths() {
    const commons = await getCollection("common");
    return commons
        .filter((x) => x.data.platforms.includes("android"))
        .map((common: Common) => ({
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
    const typeContext = await createTypeContext();

    return new Response(
        generateAndroidCommon(
            validateCommon(
                typeContext,
                common.data.name,
                common.data.description,
                common.data.platforms,
                remarkPluginFrontmatter,
            ),
        ),
    );
}
