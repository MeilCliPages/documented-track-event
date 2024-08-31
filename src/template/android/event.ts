import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import type { EventParameter, EventField } from "../event-parameter";

interface AndroidEventParameter {
    className: string;
    descriptionLines: string[];
    fields: AndroidEventField[];
}

interface AndroidEventField {
    name: string;
    type: string;
    descriptionLines: string[];
}

export function generateAndroidEvent(eventParameter: EventParameter): string {
    const templatePath = path.join(process.cwd(), "src/template/android/event.txt");
    return ejs.render(fs.readFileSync(templatePath).toString(), mapToAndroidEventParameter(eventParameter));
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

function mapToAndroidEventParameter(eventParameter: EventParameter): AndroidEventParameter {
    return {
        className: kebabCaseToUpperCamelCase(eventParameter.name),
        descriptionLines: eventParameter.description.split(/\r?\n/),
        fields: eventParameter.fields.map(mapToAndroidEventField),
    };
}

function mapToAndroidEventField(eventField: EventField): AndroidEventField {
    return {
        name: kebabCaseToLowerCamelCase(eventField.field),
        type: mapToAndroidFieldType(eventField.type),
        descriptionLines: eventField.description.split(/\r?\n/),
    };
}

function mapToAndroidFieldType(eventFieldType: EventField["type"]): string {
    if (eventFieldType.startsWith("enum:")) {
        return eventFieldType.slice("enum:".length);
    } else {
        switch (eventFieldType) {
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
                throw new Error(`Unknown type: ${eventFieldType}`);
        }
    }
}
