import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { lowerSnaleCaseToUpperCamelCase } from "../string";
import type { UserTypeParameter } from "../parameter";
import type { Common } from "../common";
import { type WebParameter, mapToWebParameter } from "./parameter";

interface WebCommon {
    imports: string[];
    className: string;
    descriptionLines: string[];
    parameters: WebParameter[];
}

export function generateWebCommon(common: Common): string {
    const templatePath = path.join(process.cwd(), "src/template/web/common.txt");
    return ejs.render(fs.readFileSync(templatePath).toString(), mapToWebCommon(common));
}

function mapToWebCommon(common: Common): WebCommon {
    return {
        imports: mapToWebImports(common),
        className: lowerSnaleCaseToUpperCamelCase(common.name),
        descriptionLines: common.description.split(/\r?\n/),
        parameters: common.parameters.map(mapToWebParameter),
    };
}

function mapToWebImports(common: Common): string[] {
    return common.parameters
        .filter((x) => x.type.startsWith("type:"))
        .map((x) => x as UserTypeParameter)
        .map(
            (x) =>
                `import { ${lowerSnaleCaseToUpperCamelCase(x.type.slice("type:".length))} } from "../type/${x.typeDefinition.slug}";`,
        )
        .sort();
}
