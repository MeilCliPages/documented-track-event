import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { kebabCaseToUpperCamelCase } from "../string";
import type { Common } from "../common";
import { type WebParameter, mapToWebParameter } from "./parameter";

interface WebCommon {
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
        className: kebabCaseToUpperCamelCase(common.name),
        descriptionLines: common.description.split(/\r?\n/),
        parameters: common.parameters.map(mapToWebParameter),
    };
}
