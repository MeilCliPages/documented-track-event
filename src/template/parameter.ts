export interface Parameter {
    name: string;
    type: ParameterBasicType | ParameterUserType;
    description: string;
}

export const ParameterBasicTypes = ["string", "int", "long", "float", "double", "boolean"] as const;
export type ParameterBasicType = (typeof ParameterBasicTypes)[number];

type WithPrefix<TKey, TPrefix extends string> = TKey extends string ? `${TPrefix}${TKey}` : never;
export type ParameterUserType = WithPrefix<string, "type:">;
