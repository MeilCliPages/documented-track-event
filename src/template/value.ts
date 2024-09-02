interface ValueInternal {
    name: string;
    description: string;
}

export type Value = StringValue | IntValue | LongValue | FloatValue | DoubleValue | BooleanValue;

export interface StringValue extends ValueInternal {
    type: "string";
    value: string;
}

export interface IntValue extends ValueInternal {
    type: "int";
    value: number;
}

export interface LongValue extends ValueInternal {
    type: "long";
    value: number;
}

export interface FloatValue extends ValueInternal {
    type: "float";
    value: number;
}

export interface DoubleValue extends ValueInternal {
    type: "double";
    value: number;
}

export interface BooleanValue extends ValueInternal {
    type: "boolean";
    value: boolean;
}
