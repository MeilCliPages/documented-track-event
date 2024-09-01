import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { Root } from "mdast";
import type { RemarkFile } from "./remark-file";
import { parseParameter } from "./parameter-parser";
import { appendParameterPostfix } from "./append-parameter-postfix";

export const remarkTemplatePlugin: RemarkPlugin = remarkTemplatePluginInternal as unknown as RemarkPlugin;

function remarkTemplatePluginInternal() {
    return (tree: Root, file: RemarkFile) => {
        parseParameter(tree, file);
        appendParameterPostfix(tree);
    };
}
