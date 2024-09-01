import type { Parameter } from "./parameter";

export interface Event {
    name: string;
    description: string;
    parameters: Parameter[];
}
