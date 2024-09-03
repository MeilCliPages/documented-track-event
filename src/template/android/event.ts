import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { lowerSnaleCaseToUpperCamelCase } from "../string";
import type { UserTypeParameter } from "../parameter";
import type { Event } from "../event";
import { type AndroidParameter, mapToAndroidParameter } from "./parameter";

interface AndroidEvent {
    imports: string[];
    className: string;
    descriptionLines: string[];
    parameters: AndroidParameter[];
}

export function generateAndroidEvent(event: Event): string {
    const templatePath = path.join(process.cwd(), "src/template/android/event.txt");
    return ejs.render(fs.readFileSync(templatePath).toString(), mapToAndroidEvent(event));
}

function mapToAndroidEvent(event: Event): AndroidEvent {
    return {
        imports: mapToAndroidImports(event),
        className: lowerSnaleCaseToUpperCamelCase(event.name),
        descriptionLines: event.description.split(/\r?\n/),
        parameters: event.parameters.map(mapToAndroidParameter),
    };
}

function mapToAndroidImports(event: Event): string[] {
    return event.parameters
        .filter((x) => x.type.startsWith("type:"))
        .map((x) => x as UserTypeParameter)
        .map((x) => `import net.meilcli.dte.entity.${lowerSnaleCaseToUpperCamelCase(x.type.slice("type:".length))}`)
        .sort();
}
