export function kebabCaseToUpperCamelCase(value: string): string {
    return value
        .split("-")
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join("");
}

export function kebabCaseToLowerCamelCase(value: string): string {
    const upperCamelCase = kebabCaseToUpperCamelCase(value);
    return upperCamelCase.charAt(0).toLowerCase() + upperCamelCase.slice(1);
}
