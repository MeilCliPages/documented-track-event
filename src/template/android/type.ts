import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { lowerSnaleCaseToUpperCamelCase } from "../string";
import type { Enum } from "../type";
import { type AndroidValue, mapToAndroidValue } from "./value";

interface AndroidEnum {
    className: string;
    descriptionLines: string[];
    type: string;
    values: AndroidValue[];
}

export function generateAndroidEnum(enumValue: Enum): string {
    const templatePath = path.join(process.cwd(), "src/template/android/enum.txt");
    return ejs.render(fs.readFileSync(templatePath).toString(), mapToAndroidEnum(enumValue));
}

function mapToAndroidEnum(enumValue: Enum): AndroidEnum {
    return {
        className: lowerSnaleCaseToUpperCamelCase(enumValue.name),
        descriptionLines: enumValue.description.split(/\r?\n/),
        type: mapToAndroidEnumType(enumValue.type),
        values: enumValue.values.map(mapToAndroidValue),
    };
}

function mapToAndroidEnumType(enumType: Enum["type"]): string {
    switch (enumType) {
        case "string":
            return "String";
        case "int":
            return "Int";
        case "long":
            return "Long";
        case "float":
            return "Float";
        case "double":
            return "Double";
        case "boolean":
            return "Boolean";
        default:
            throw new Error(`Unknown type: ${enumType}`);
    }
}
