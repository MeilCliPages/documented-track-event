import type { StringValue, IntValue, LongValue, FloatValue, DoubleValue, BooleanValue } from "./value";
import type { Platform } from "./platform";

export const EnumTypes = ["string", "int", "long", "float", "double", "boolean"] as const;
export type EnumType = (typeof EnumTypes)[number];

interface EnumInternal {
    name: string;
    description: string;
    platforms: Platform[];
}

export type Enum = StringEnum | IntEnum | LongEnum | FloatEnum | DoubleEnum | BooleanEnum;

export interface StringEnum extends EnumInternal {
    type: "string";
    values: StringValue[];
}

export interface IntEnum extends EnumInternal {
    type: "int";
    values: IntValue[];
}

export interface LongEnum extends EnumInternal {
    type: "long";
    values: LongValue[];
}

export interface FloatEnum extends EnumInternal {
    type: "float";
    values: FloatValue[];
}

export interface DoubleEnum extends EnumInternal {
    type: "double";
    values: DoubleValue[];
}

export interface BooleanEnum extends EnumInternal {
    type: "boolean";
    values: BooleanValue[];
}
