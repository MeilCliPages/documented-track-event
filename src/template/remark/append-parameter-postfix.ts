import type { Root } from "mdast";
import { headingRange } from "mdast-util-heading-range";
import { parameterHeadingName, parameterPostfixType } from "./constant";

export function appendParameterPostfix(tree: Root) {
    headingRange(tree, { test: parameterHeadingName }, (_, nodes) => {
        return [
            ...nodes,
            {
                type: "html",
                value: "",
                data: { hName: "div", hProperties: { type: parameterPostfixType } },
            },
        ];
    });
}
