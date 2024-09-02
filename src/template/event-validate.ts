import type { Event } from "./event";
import type { Parameter } from "./parameter";
import { validateParameter } from "./parameter-validate";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateEvent(name: string, description: string, frontmatter: any): Event {
    if (name.length === 0) {
        throw new Error("Name cannot be empty.");
    }
    if (description.length === 0) {
        throw new Error("Description cannot be empty.");
    }

    if (name.match(/^[a-z][a-z0-9]*(_[a-z][a-z0-9]*)*$/) === null) {
        throw new Error("Name must be a valid identifier. (regex: [a-z][a-z0-9]*(_[a-z][a-z0-9]*)*)");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = frontmatter.parameters == undefined ? [] : (frontmatter.parameters as any[]);
    if (Array.isArray(parameters) == false) {
        throw new Error("Parameters must be an array.");
    }
    const resultParameters = parameters
        .filter((x) => typeof x.name === "string" && typeof x.type === "string" && typeof x.description === "string")
        .filter((x) => validateParameter(x.name, x.type, x.description))
        .map((x) => x as Parameter);

    return { name, description, parameters: resultParameters };
}
