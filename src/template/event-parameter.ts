export interface EventParameter {
    name: string;
    description: string;
    fields: EventField[];
}

export interface EventField {
    field: string;
    type: EventFieldBasicType | EventFieldEnumType;
    description: string;
}

export const EventFieldBasicTypes = ["string", "int", "long", "float", "double", "boolean"] as const;
export type EventFieldBasicType = (typeof EventFieldBasicTypes)[number];

type WithPrefix<TKey, TPrefix extends string> = TKey extends string ? `${TPrefix}${TKey}` : never;
export type EventFieldEnumType = WithPrefix<string, "enum:">;
