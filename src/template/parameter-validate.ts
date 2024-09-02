import { type Parameter, ParameterBasicTypes, type ParameterBasicType, type ParameterUserType } from "./parameter";

export function validateParameter(name: string, type: string, description: string): Parameter {
    if (name.length === 0) {
        throw new Error("Name cannot be empty.");
    }
    if (type.length === 0) {
        throw new Error("Type cannot be empty.");
    }
    if (description.length === 0) {
        throw new Error("Description cannot be empty.");
    }

    if (name.match(/^[a-z][a-z0-9]*(_[a-z][a-z0-9]*)*$/) === null) {
        throw new Error("Name must be a valid identifier. (regex: [a-z][a-z0-9]*(_[a-z][a-z0-9]*)*)");
    }

    let resultType: ParameterBasicType | ParameterUserType;
    if (type.startsWith("type:")) {
        // ToDo: check enum names
        resultType = type as ParameterUserType;
    } else {
        if (ParameterBasicTypes.find((x) => x == type) != null) {
            resultType = type as ParameterBasicType;
        } else {
            throw new Error(`Type must be one of ${ParameterBasicTypes.join(", ")}`);
        }
    }

    return { name, type: resultType, description };
}
