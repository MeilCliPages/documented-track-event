import { z } from "zod";
import { lowerSnakeCase } from "./string";
import type { Platform } from "./platform";
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
    slug: z.string().min(1),
    name: z.string().min(1).regex(lowerSnakeCase),
    description: z.string().min(1),
    values: z.undefined().or(
        z.array(
            z.object({
                name: z.string().min(1),
                value: z.string().min(1),
                description: z.string(),
            }),
        ),
    ),
});

export function validateEnum(
    type: string,
    slug: string,
    name: string,
    description: string,
    platforms: Platform[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    frontmatter: any,
): Enum {
    const { values } = enumTypeScheme.parse({ type, slug, name, description, values: frontmatter.values });

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

    const resultValues = (values ?? []).map((x) => validateValue(enumType, x.name, x.value, x.description));

    switch (enumType) {
        case "string":
            return { type: enumType, slug, name, description, platforms, values: resultValues } as StringEnum;
        case "int":
            return { type: enumType, slug, name, description, platforms, values: resultValues } as IntEnum;
        case "long":
            return { type: enumType, slug, name, description, platforms, values: resultValues } as LongEnum;
        case "float":
            return { type: enumType, slug, name, description, platforms, values: resultValues } as FloatEnum;
        case "double":
            return { type: enumType, slug, name, description, platforms, values: resultValues } as DoubleEnum;
        case "boolean":
            return { type: enumType, slug, name, description, platforms, values: resultValues } as BooleanEnum;
    }
}
