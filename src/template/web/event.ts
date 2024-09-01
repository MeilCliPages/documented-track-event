import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { lowerSnaleCaseToUpperCamelCase } from "../string";
import type { Event } from "../event";
import { type WebParameter, mapToWebParameter } from "./parameter";

interface WebEvent {
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
        className: lowerSnaleCaseToUpperCamelCase(event.name),
        descriptionLines: event.description.split(/\r?\n/),
        parameters: event.parameters.map(mapToWebParameter),
    };
}
