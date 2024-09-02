import type { Root } from "mdast";
import { headingRange } from "mdast-util-heading-range";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import { is } from "unist-util-is";
import { parameterHeadingName, parameterTypeLinkTitle } from "./constant";

export function replaceParameterTypeCell(tree: Root) {
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
            const typeIndex = tableHeaderCells.findIndex((cell) => toString(cell) == "Type");
            if (typeIndex == -1) {
                return;
            }

            const tableBody = node.children.slice(1);
            for (const tableRow of tableBody) {
                const cells = tableRow.children;
                const typeCell = cells[typeIndex];
                for (let i = 0; i < typeCell.children.length; i++) {
                    const child = typeCell.children[i];
                    if (is(child, "text") && child.value.startsWith("type:")) {
                        typeCell.children[i] = {
                            type: "link",
                            url: child.value,
                            title: parameterTypeLinkTitle,
                            children: [{ type: "text", value: child.value }],
                        };
                    }
                }
            }
        });
    });
}
