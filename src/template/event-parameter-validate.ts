import {
    type EventParameter,
    type EventField,
    EventFieldBasicTypes,
    type EventFieldBasicType,
    type EventFieldEnumType,
} from "./event-parameter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateEventParameter(name: string, description: string, frontmatter: any): EventParameter {
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
    const fields = frontmatter.fields == undefined ? [] : (frontmatter.fields as any[]);
    if (Array.isArray(fields) == false) {
        throw new Error("Fields must be an array.");
    }
    const eventFields = fields
        .filter((x) => typeof x.field === "string" && typeof x.type === "string" && typeof x.description === "string")
        .filter((x) => validateEventField(x.field, x.type, x.description))
        .map((x) => x as EventField);

    return { name, description, fields: eventFields };
}

function validateEventField(field: string, type: string, description: string): EventField {
    if (field.length === 0) {
        throw new Error("Field cannot be empty.");
    }
    if (type.length === 0) {
        throw new Error("Type cannot be empty.");
    }
    if (description.length === 0) {
        throw new Error("Description cannot be empty.");
    }

    if (field.match(/^[a-z][a-z0-9]*(-[a-z][a-z0-9]*)*$/) === null) {
        throw new Error("Field must be a valid identifier. (regex: [a-z][a-z0-9]*(-[a-z][a-z0-9]*)*)");
    }

    let resultType: EventFieldBasicType | EventFieldEnumType;
    if (type.startsWith("enum:")) {
        // ToDo: check enum names
        resultType = type as EventFieldEnumType;
    } else {
        if (EventFieldBasicTypes.find((x) => x == type) != null) {
            resultType = type as EventFieldBasicType;
        } else {
            throw new Error(`Type must be one of ${EventFieldBasicTypes.join(", ")}`);
        }
    }

    return { field, type: resultType, description };
}
