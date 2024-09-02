import type { Root } from "mdast";
import type { RemarkFile } from "./remark-file";
import { headingRange } from "mdast-util-heading-range";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import { parameterHeadingName } from "./constant";
import type { Parameter } from "../parameter";

export function parseParameter(tree: Root, file: RemarkFile): Parameter[] {
    let result: Parameter[] = [];

    headingRange(tree, { test: parameterHeadingName }, (_, nodes) => {
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
            const typeIndex = tableHeaderCells.findIndex((cell) => toString(cell) == "Type");
            const descriptionIndex = tableHeaderCells.findIndex((cell) => toString(cell) == "Description");
            if (nameIndex === -1 || typeIndex === -1 || descriptionIndex === -1) {
                return;
            }

            const tableBody = node.children.slice(1);
            const parameters = tableBody.map((row) => {
                const cells = row.children;
                const name = toString(cells[nameIndex]);
                const type = toString(cells[typeIndex]);
                const description = toString(cells[descriptionIndex]);
                return { name, type, description } as Parameter;
            });

            file.data.astro.frontmatter.parameters = parameters;
            result = parameters;
        });
    });

    return result;
}
