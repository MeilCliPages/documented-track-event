import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { lowerSnaleCaseToUpperCamelCase } from "../string";
import type { Common } from "../common";
import { type AndroidParameter, mapToAndroidParameter } from "./parameter";

interface AndroidCommon {
    className: string;
    descriptionLines: string[];
    parameters: AndroidParameter[];
}

export function generateAndroidCommon(common: Common): string {
    const templatePath = path.join(process.cwd(), "src/template/android/common.txt");
    return ejs.render(fs.readFileSync(templatePath).toString(), mapToAndroidCommon(common));
}

function mapToAndroidCommon(common: Common): AndroidCommon {
    return {
        className: lowerSnaleCaseToUpperCamelCase(common.name),
        descriptionLines: common.description.split(/\r?\n/),
        parameters: common.parameters.map(mapToAndroidParameter),
    };
}
