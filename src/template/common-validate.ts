import { z } from "zod";
import { lowerSnakeCase } from "./string";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateCommon(name: string, description: string, platforms: Platform[], frontmatter: any): Common {
    const { parameters } = common.parse({ name, description, parameters: frontmatter.parameters });
    const resultParameters = (parameters ?? []).map((x) => validateParameter(x.name, x.type, x.description));

    return { name, description, platforms, parameters: resultParameters };
}
