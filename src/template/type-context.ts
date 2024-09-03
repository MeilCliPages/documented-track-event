import type { Platform } from "./platform";
import type { Enum } from "./type";
import { validateEnum } from "./type-validate";
import type { ParameterUserType } from "./parameter";

export class TypeContext {
    enums: Enum[];

    constructor(
        types: {
            slug: string;
            data: { type: string; name: string; description: string; platforms: Platform[] };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            frontmatter: any;
        }[],
    ) {
        this.enums = types.map((x) =>
            validateEnum(x.data.type, x.slug, x.data.name, x.data.description, x.data.platforms, x.frontmatter),
        );
    }

    findEnum(type: ParameterUserType): Enum | undefined {
        return this.enums.find((x) => x.name == type.slice("type:".length));
    }
}
