export const lowerSnakeCase = /^[a-z][a-z0-9]*(_[a-z][a-z0-9]*)*$/;

export function lowerSnaleCaseToUpperCamelCase(value: string): string {
    return value
        .split("_")
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join("");
}

export function lowerSnaleCaseToLowerCamelCase(value: string): string {
    const upperCamelCase = lowerSnaleCaseToUpperCamelCase(value);
    return upperCamelCase.charAt(0).toLowerCase() + upperCamelCase.slice(1);
}
