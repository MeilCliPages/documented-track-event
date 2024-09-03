import { z } from "zod";
import { lowerSnakeCase } from "./string";
import { TypeContext } from "./type-context";
import { type Parameter, ParameterBasicTypes, type ParameterBasicType, type ParameterUserType } from "./parameter";

const parameter = z.object({
    name: z.string().min(1).regex(lowerSnakeCase),
    type: z.string().min(1),
    description: z.string().min(1),
});

export function validateParameter(context: TypeContext, name: string, type: string, description: string): Parameter {
    parameter.parse({ name, type, description });

    if (type.startsWith("type:")) {
        const matched = context.findEnum(type as ParameterUserType);
        if (matched == undefined) {
            throw new Error(`Enum ${type} not found`);
        }
        return { name, type: type as ParameterUserType, description, typeDefinition: matched };
    } else {
        if (ParameterBasicTypes.find((x) => x == type) != null) {
            return { name, type: type as ParameterBasicType, description };
        } else {
            throw new Error(`Type must be one of ${ParameterBasicTypes.join(", ")}`);
        }
    }
}
