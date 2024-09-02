import { z } from "zod";
import { lowerSnakeCase } from "./string";
import type { EnumType } from "./type";
import type { Value, StringValue, IntValue, LongValue, FloatValue, DoubleValue, BooleanValue } from "./value";

const stringEnum = z.object({
    name: z.string().min(1).regex(lowerSnakeCase),
    value: z
        .string()
        .min(1)
        .regex(/^[^"'`]+$/),
    description: z.string(),
});

const intEnum = z.object({
    name: z.string().min(1).regex(lowerSnakeCase),
    value: z.coerce.number().int(),
    description: z.string(),
});

const longEnum = z.object({
    name: z.string().min(1).regex(lowerSnakeCase),
    value: z.coerce.number().int(),
    description: z.string(),
});

const floatEnum = z.object({
    name: z.string().min(1).regex(lowerSnakeCase),
    value: z.coerce.number(),
    description: z.string(),
});

const doubleEnum = z.object({
    name: z.string().min(1).regex(lowerSnakeCase),
    value: z.coerce.number(),
    description: z.string(),
});

const booleanEnum = z.object({
    name: z.string().min(1).regex(lowerSnakeCase),
    value: z.coerce.boolean(),
    description: z.string(),
});

export function validateValue(enumType: EnumType, name: string, value: string, description: string): Value {
    switch (enumType) {
        case "string":
            return { type: "string", ...stringEnum.parse({ name, value, description }) } as StringValue;
        case "int":
            return { type: "int", ...intEnum.parse({ name, value, description }) } as IntValue;
        case "long":
            return { type: "long", ...longEnum.parse({ name, value, description }) } as LongValue;
        case "float":
            return { type: "float", ...floatEnum.parse({ name, value, description }) } as FloatValue;
        case "double":
            return { type: "double", ...doubleEnum.parse({ name, value, description }) } as DoubleValue;
        case "boolean":
            return { type: "boolean", ...booleanEnum.parse({ name, value, description }) } as BooleanValue;
        default:
            throw new Error(`Unknown type: ${enumType}`);
    }
}
