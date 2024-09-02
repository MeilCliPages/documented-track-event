import { lowerSnaleCaseToUpperCamelCase } from "../string";
import type { Value } from "../value";

export interface WebValue {
    name: string;
    value: string;
    descriptionLines: string[];
}

export function mapToWebValue(value: Value): WebValue {
    return {
        name: lowerSnaleCaseToUpperCamelCase(value.name),
        value: mapToWebValueValue(value),
        descriptionLines: value.description.split(/\r?\n/),
    };
}

function mapToWebValueValue(value: Value): string {
    switch (value.type) {
        case "string":
            return `"${value.value}"`;
        case "int":
            return value.value.toString();
        case "long":
            return value.value.toString();
        case "float":
            return value.value.toString();
        case "double":
            return value.value.toString();
        case "boolean":
            return value.value.toString();
    }
}
