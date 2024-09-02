import { lowerSnaleCaseToUpperCamelCase } from "../string";
import type { Value } from "../value";

export interface AndroidValue {
    name: string;
    value: string;
    descriptionLines: string[];
}

export function mapToAndroidValue(value: Value): AndroidValue {
    return {
        name: lowerSnaleCaseToUpperCamelCase(value.name),
        value: mapToAndroidValueValue(value),
        descriptionLines: value.description.split(/\r?\n/),
    };
}

function mapToAndroidValueValue(value: Value): string {
    switch (value.type) {
        case "string":
            return `"${value.value}"`;
        case "int":
            return value.value.toString();
        case "long":
            return `${value.value.toString()}L`;
        case "float":
            return `${value.value.toString()}f`;
        case "double":
            return value.value.toString();
        case "boolean":
            return value.value.toString();
    }
}
