import { lowerSnaleCaseToLowerCamelCase, lowerSnaleCaseToUpperCamelCase } from "../string";
import type { Parameter } from "../parameter";

export interface WebParameter {
    name: string;
    type: string;
    descriptionLines: string[];
}

export function mapToWebParameter(parameter: Parameter): WebParameter {
    return {
        name: lowerSnaleCaseToLowerCamelCase(parameter.name),
        type: mapToWebParameterType(parameter.type),
        descriptionLines: parameter.description.split(/\r?\n/),
    };
}

function mapToWebParameterType(parameterType: Parameter["type"]): string {
    if (parameterType.startsWith("type:")) {
        return lowerSnaleCaseToUpperCamelCase(parameterType.slice("type:".length));
    } else {
        switch (parameterType) {
            case "string":
                return "string";
            case "int":
                return "number";
            case "long":
                return "number";
            case "float":
                return "number";
            case "double":
                return "number";
            case "boolean":
                return "boolean";
            default:
                throw new Error(`Unknown type: ${parameterType}`);
        }
    }
}
