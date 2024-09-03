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

    let resultType: ParameterBasicType | ParameterUserType;
    if (type.startsWith("type:")) {
        // ToDo: check enum names
        resultType = type as ParameterUserType;
        const matched = context.findEnum(resultType);
        if (matched == undefined) {
            throw new Error(`Enum ${resultType} not found`);
        }
    } else {
        if (ParameterBasicTypes.find((x) => x == type) != null) {
            resultType = type as ParameterBasicType;
        } else {
            throw new Error(`Type must be one of ${ParameterBasicTypes.join(", ")}`);
        }
    }

    return { name, type: resultType, description };
}
