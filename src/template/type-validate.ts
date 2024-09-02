import { z } from "zod";
import { lowerSnakeCase } from "./string";
import type { BooleanEnum, DoubleEnum, Enum, FloatEnum, IntEnum, LongEnum, StringEnum } from "./type";
import { validateValue } from "./value-validate";

const enumTypeScheme = z.object({
    type: z.union([
        z.literal("string_enum"),
        z.literal("int_enum"),
        z.literal("long_enum"),
        z.literal("float_enum"),
        z.literal("double_enum"),
        z.literal("boolean_enum"),
    ]),
    name: z.string().min(1).regex(lowerSnakeCase),
    description: z.string().min(1),
    platforms: z.array(z.union([z.literal("android"), z.literal("web")])),
});

export function validateEnum(
    type: string,
    name: string,
    description: string,
    platforms: string[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    frontmatter: any,
): Enum {
    enumTypeScheme.parse({ type, name, description, platforms });

    let enumType: Enum["type"];
    switch (type) {
        case "string_enum":
            enumType = "string";
            break;
        case "int_enum":
            enumType = "int";
            break;
        case "long_enum":
            enumType = "long";
            break;
        case "float_enum":
            enumType = "float";
            break;
        case "double_enum":
            enumType = "double";
            break;
        case "boolean_enum":
            enumType = "boolean";
            break;
        default:
            throw new Error(`Unknown type: ${type}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values = frontmatter.values == undefined ? [] : (frontmatter.values as any[]);
    if (Array.isArray(values) == false) {
        throw new Error("Values must be an array.");
    }
    const resultValues = values
        .filter((x) => typeof x.name === "string" && typeof x.value === "string" && typeof x.description === "string")
        .map((x) => validateValue(enumType, x.name, x.value, x.description));

    switch (enumType) {
        case "string":
            return { type: enumType, name, description, platforms, values: resultValues } as StringEnum;
        case "int":
            return { type: enumType, name, description, platforms, values: resultValues } as IntEnum;
        case "long":
            return { type: enumType, name, description, platforms, values: resultValues } as LongEnum;
        case "float":
            return { type: enumType, name, description, platforms, values: resultValues } as FloatEnum;
        case "double":
            return { type: enumType, name, description, platforms, values: resultValues } as DoubleEnum;
        case "boolean":
            return { type: enumType, name, description, platforms, values: resultValues } as BooleanEnum;
    }
}
