import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { lowerSnaleCaseToUpperCamelCase } from "../string";
import type { UserTypeParameter } from "../parameter";
import type { Event } from "../event";
import { type WebParameter, mapToWebParameter } from "./parameter";

interface WebEvent {
    imports: string[];
    className: string;
    descriptionLines: string[];
    parameters: WebParameter[];
}

export function generateWebEvent(event: Event): string {
    const templatePath = path.join(process.cwd(), "src/template/web/event.txt");
    return ejs.render(fs.readFileSync(templatePath).toString(), mapToWebEvent(event));
}

function mapToWebEvent(event: Event): WebEvent {
    return {
        imports: mapToWebImports(event),
        className: lowerSnaleCaseToUpperCamelCase(event.name),
        descriptionLines: event.description.split(/\r?\n/),
        parameters: event.parameters.map(mapToWebParameter),
    };
}

function mapToWebImports(event: Event): string[] {
    return event.parameters
        .filter((x) => x.type.startsWith("type:"))
        .map((x) => x as UserTypeParameter)
        .map(
            (x) =>
                `import { ${lowerSnaleCaseToUpperCamelCase(x.type.slice("type:".length))} } from "../type/${x.typeDefinition.slug}";`,
        )
        .sort();
}
