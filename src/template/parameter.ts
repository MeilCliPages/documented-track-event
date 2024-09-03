import type { Enum } from "./type";

export const ParameterBasicTypes = ["string", "int", "long", "float", "double", "boolean"] as const;
export type ParameterBasicType = (typeof ParameterBasicTypes)[number];

type WithPrefix<TKey, TPrefix extends string> = TKey extends string ? `${TPrefix}${TKey}` : never;
export type ParameterUserType = WithPrefix<string, "type:">;

interface ParameterInternal {
    name: string;
    type: ParameterBasicType | ParameterUserType;
    description: string;
}

export type Parameter = BasicTypeParameter | UserTypeParameter;

export interface BasicTypeParameter extends ParameterInternal {
    type: ParameterBasicType;
}

export interface UserTypeParameter extends ParameterInternal {
    type: ParameterUserType;
    typeDefinition: Enum;
}
