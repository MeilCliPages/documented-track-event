import { z } from "zod";
import { lowerSnakeCase } from "./string";
import { TypeContext } from "./type-context";
import type { Event } from "./event";
import { validateParameter } from "./parameter-validate";

const event = z.object({
    name: z.string().min(1).regex(lowerSnakeCase),
    description: z.string().min(1),
    parameters: z.undefined().or(
        z.array(
            z.object({
                name: z.string().min(1),
                type: z.string().min(1),
                description: z.string(),
            }),
        ),
    ),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateEvent(context: TypeContext, name: string, description: string, frontmatter: any): Event {
    const { parameters } = event.parse({ name, description, parameters: frontmatter.parameters });
    const resultParameters = (parameters ?? []).map((x) => validateParameter(context, x.name, x.type, x.description));

    return { name, description, parameters: resultParameters };
}
