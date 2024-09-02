import { lowerSnaleCaseToLowerCamelCase } from "../string";
import type { Parameter } from "../parameter";

export interface AndroidParameter {
    name: string;
    type: string;
    descriptionLines: string[];
}

export function mapToAndroidParameter(parameter: Parameter): AndroidParameter {
    return {
        name: lowerSnaleCaseToLowerCamelCase(parameter.name),
        type: mapToAndroidParameterType(parameter.type),
        descriptionLines: parameter.description.split(/\r?\n/),
    };
}

function mapToAndroidParameterType(parameterType: Parameter["type"]): string {
    if (parameterType.startsWith("type:")) {
        return parameterType.slice("type:".length);
    } else {
        switch (parameterType) {
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
                throw new Error(`Unknown type: ${parameterType}`);
        }
    }
}
