import { kebabCaseToLowerCamelCase } from "../string";
import type { Parameter } from "../parameter";

export interface AndroidParameter {
    name: string;
    type: string;
    descriptionLines: string[];
}

export function mapToAndroidParameter(parameter: Parameter): AndroidParameter {
    return {
        name: kebabCaseToLowerCamelCase(parameter.name),
        type: mapToAndroidParameterType(parameter.type),
        descriptionLines: parameter.description.split(/\r?\n/),
    };
}

function mapToAndroidParameterType(parameterType: Parameter["type"]): string {
    if (parameterType.startsWith("enum:")) {
        return parameterType.slice("enum:".length);
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
