export type RemarkFile = { data: RemarkFileData };
export type RemarkFileData = { astro: RemarkFileAstro };
export type RemarkFileAstro = { frontmatter: Record<string, unknown> };
