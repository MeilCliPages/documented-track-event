import type { Parameter } from "./parameter";
import type { Platform } from "./platform";

export interface Common {
    name: string;
    description: string;
    platforms: Platform[];
    parameters: Parameter[];
}
