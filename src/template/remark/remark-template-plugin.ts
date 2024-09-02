import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { Root } from "mdast";
import type { RemarkFile } from "./remark-file";
import { parseParameter } from "./parameter-parser";
import { appendParameterPostfix } from "./append-parameter-postfix";
import { replaceParameterTypeCell } from "./replace-parameter-type-cell";

export const remarkTemplatePlugin: RemarkPlugin = remarkTemplatePluginInternal as unknown as RemarkPlugin;

function remarkTemplatePluginInternal() {
    return (tree: Root, file: RemarkFile) => {
        const parameters = parseParameter(tree, file);
        appendParameterPostfix(tree, file);

        if (0 < parameters.filter((x) => x.type.startsWith("type:")).length) {
            replaceParameterTypeCell(tree);
        }
    };
}
