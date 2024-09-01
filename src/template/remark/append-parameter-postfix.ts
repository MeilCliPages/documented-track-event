import type { Root } from "mdast";
import type { RemarkFile } from "./remark-file";
import { headingRange } from "mdast-util-heading-range";
import { parameterHeadingName, parameterPostfixType } from "./constant";

export function appendParameterPostfix(tree: Root, file: RemarkFile) {
    headingRange(tree, { test: parameterHeadingName }, (heading, nodes) => {
        const platforms =
            file.data.astro.frontmatter.platforms != undefined
                ? (file.data.astro.frontmatter.platforms as string[])
                : [];
        return [
            heading,
            ...nodes,
            {
                type: "html",
                value: "",
                data: { hName: "div", hProperties: { type: parameterPostfixType, platforms: platforms.join(",") } },
            },
        ];
    });
}
