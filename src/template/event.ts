export interface Event {
    name: string;
    description: string;
    parameters: EventParameter[];
}

export interface EventParameter {
    name: string;
    type: EventParameterBasicType | EventParameterEnumType;
    description: string;
}

export const EventParameterBasicTypes = ["string", "int", "long", "float", "double", "boolean"] as const;
export type EventParameterBasicType = (typeof EventParameterBasicTypes)[number];

type WithPrefix<TKey, TPrefix extends string> = TKey extends string ? `${TPrefix}${TKey}` : never;
export type EventParameterEnumType = WithPrefix<string, "enum:">;
