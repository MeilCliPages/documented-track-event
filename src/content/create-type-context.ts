import { getCollection } from "astro:content";
import { TypeContext } from "../template";

export async function createTypeContext(): Promise<TypeContext> {
    const types = await getCollection("type");
    const typeWithFromtmatter = await Promise.all(
        types.map(async (x) => ({ ...x, frontmatter: (await x.render()).remarkPluginFrontmatter })),
    );
    return new TypeContext(typeWithFromtmatter);
}
