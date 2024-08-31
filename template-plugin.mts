import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { Root } from "mdast";
import { headingRange } from "mdast-util-heading-range";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

type File = { data: FileData };
type FileData = { astro: FileAstro };
type FileAstro = { frontmatter: Record<string, unknown> };

export const remarkTemplatePlugin: RemarkPlugin = remarkTemplatePluginInternal as unknown as RemarkPlugin;

function remarkTemplatePluginInternal() {
    return (tree: Root, file: File) => {
        headingRange(tree, { test: "Specification" }, (_, nodes) => {
            const headingRoot = { type: "parent", children: nodes };
            visit(headingRoot, "table", (node) => {
                if (node.children.length < 2) {
                    return;
                }
                const tableHeader = node.children[0];
                if (tableHeader.children.length < 3) {
                    return;
                }
                const tableHeaderCells = tableHeader.children;
                const fieldIndex = tableHeaderCells.findIndex((cell) => toString(cell) == "Field");
                const typeIndex = tableHeaderCells.findIndex((cell) => toString(cell) == "Type");
                const descriptionIndex = tableHeaderCells.findIndex((cell) => toString(cell) == "Description");
                if (fieldIndex === -1 || typeIndex === -1 || descriptionIndex === -1) {
                    return;
                }
                const tableBody = node.children.slice(1);
                const fields = tableBody.map((row) => {
                    const cells = row.children;
                    const field = toString(cells[fieldIndex]);
                    const type = toString(cells[typeIndex]);
                    const description = toString(cells[descriptionIndex]);
                    return { field, type, description };
                });
                file.data.astro.frontmatter.fields = fields;
            });
        });
    };
}
