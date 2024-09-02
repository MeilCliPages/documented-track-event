import type { Root } from "mdast";
import type { RemarkFile } from "./remark-file";
import { headingRange } from "mdast-util-heading-range";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import { valueHeadingName } from "./constant";

export function parseValue(tree: Root, file: RemarkFile) {
    headingRange(tree, { test: valueHeadingName }, (_, nodes) => {
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
            const nameIndex = tableHeaderCells.findIndex((cell) => toString(cell) == "Name");
            const valueIndex = tableHeaderCells.findIndex((cell) => toString(cell) == "Value");
            const descriptionIndex = tableHeaderCells.findIndex((cell) => toString(cell) == "Description");
            if (nameIndex === -1 || valueIndex === -1 || descriptionIndex === -1) {
                return;
            }

            const tableBody = node.children.slice(1);
            const values = tableBody.map((row) => {
                const cells = row.children;
                const name = toString(cells[nameIndex]);
                const value = toString(cells[valueIndex]);
                const description = toString(cells[descriptionIndex]);
                return { name, value, description };
            });

            file.data.astro.frontmatter.values = values;
        });
    });
}
