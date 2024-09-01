export interface Parameter {
    name: string;
    type: ParameterBasicType | ParameterEnumType;
    description: string;
}

export const ParameterBasicTypes = ["string", "int", "long", "float", "double", "boolean"] as const;
export type ParameterBasicType = (typeof ParameterBasicTypes)[number];

type WithPrefix<TKey, TPrefix extends string> = TKey extends string ? `${TPrefix}${TKey}` : never;
export type ParameterEnumType = WithPrefix<string, "enum:">;
