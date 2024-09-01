import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import type { Event } from "../event";
import type { Parameter } from "../parameter";

interface AndroidEvent {
    className: string;
    descriptionLines: string[];
    fields: AndroidEventParameter[];
}

interface AndroidEventParameter {
    name: string;
    type: string;
    descriptionLines: string[];
}

export function generateAndroidEvent(event: Event): string {
    const templatePath = path.join(process.cwd(), "src/template/android/event.txt");
    return ejs.render(fs.readFileSync(templatePath).toString(), mapToAndroidEvent(event));
}

function kebabCaseToUpperCamelCase(value: string): string {
    return value
        .split("-")
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join("");
}

function kebabCaseToLowerCamelCase(value: string): string {
    const upperCamelCase = kebabCaseToUpperCamelCase(value);
    return upperCamelCase.charAt(0).toLowerCase() + upperCamelCase.slice(1);
}

function mapToAndroidEvent(event: Event): AndroidEvent {
    return {
        className: kebabCaseToUpperCamelCase(event.name),
        descriptionLines: event.description.split(/\r?\n/),
        fields: event.parameters.map(mapToAndroidEventParameter),
    };
}

function mapToAndroidEventParameter(parameter: Parameter): AndroidEventParameter {
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
