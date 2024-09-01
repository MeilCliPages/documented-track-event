import {
    type Event,
    type EventParameter,
    EventParameterBasicTypes,
    type EventParameterBasicType,
    type EventParameterEnumType,
} from "./event";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateEvent(name: string, description: string, frontmatter: any): Event {
    if (name.length === 0) {
        throw new Error("Name cannot be empty.");
    }
    if (description.length === 0) {
        throw new Error("Description cannot be empty.");
    }

    if (name.match(/^[a-z][a-z0-9]*(-[a-z][a-z0-9]*)*$/) === null) {
        throw new Error("Name must be a valid identifier. (regex: [a-z][a-z0-9]*(-[a-z][a-z0-9]*)*)");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = frontmatter.parameters == undefined ? [] : (frontmatter.parameters as any[]);
    if (Array.isArray(parameters) == false) {
        throw new Error("Fields must be an array.");
    }
    const eventParameters = parameters
        .filter((x) => typeof x.name === "string" && typeof x.type === "string" && typeof x.description === "string")
        .filter((x) => validateEventParameter(x.name, x.type, x.description))
        .map((x) => x as EventParameter);

    return { name, description, parameters: eventParameters };
}

function validateEventParameter(name: string, type: string, description: string): EventParameter {
    if (name.length === 0) {
        throw new Error("Name cannot be empty.");
    }
    if (type.length === 0) {
        throw new Error("Type cannot be empty.");
    }
    if (description.length === 0) {
        throw new Error("Description cannot be empty.");
    }

    if (name.match(/^[a-z][a-z0-9]*(-[a-z][a-z0-9]*)*$/) === null) {
        throw new Error("Name must be a valid identifier. (regex: [a-z][a-z0-9]*(-[a-z][a-z0-9]*)*)");
    }

    let resultType: EventParameterBasicType | EventParameterEnumType;
    if (type.startsWith("enum:")) {
        // ToDo: check enum names
        resultType = type as EventParameterEnumType;
    } else {
        if (EventParameterBasicTypes.find((x) => x == type) != null) {
            resultType = type as EventParameterBasicType;
        } else {
            throw new Error(`Type must be one of ${EventParameterBasicTypes.join(", ")}`);
        }
    }

    return { name, type: resultType, description };
}
