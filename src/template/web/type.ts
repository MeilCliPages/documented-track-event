import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { lowerSnaleCaseToUpperCamelCase } from "../string";
import type { Enum } from "../type";
import { type WebValue, mapToWebValue } from "./value";

interface WebEnum {
    className: string;
    descriptionLines: string[];
    values: WebValue[];
}

export function generateWebEnum(enumValue: Enum): string {
    const templatePath = path.join(process.cwd(), "src/template/web/enum.txt");
    return ejs.render(fs.readFileSync(templatePath).toString(), mapToWebEnum(enumValue));
}

function mapToWebEnum(enumValue: Enum): WebEnum {
    return {
        className: lowerSnaleCaseToUpperCamelCase(enumValue.name),
        descriptionLines: enumValue.description.split(/\r?\n/),
        values: enumValue.values.map(mapToWebValue),
    };
}
