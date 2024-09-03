import { z } from "zod";
import { lowerSnakeCase } from "./string";
import { TypeContext } from "./type-context";
import type { Common } from "./common";
import type { Platform } from "./platform";
import { validateParameter } from "./parameter-validate";

const common = z.object({
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

export function validateCommon(
    context: TypeContext,
    name: string,
    description: string,
    platforms: Platform[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    frontmatter: any,
): Common {
    const { parameters } = common.parse({ name, description, parameters: frontmatter.parameters });
    const resultParameters = (parameters ?? []).map((x) => validateParameter(context, x.name, x.type, x.description));

    return { name, description, platforms, parameters: resultParameters };
}
