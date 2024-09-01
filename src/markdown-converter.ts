import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStarryNight from "rehype-starry-night";
import rehypeStringify from "rehype-stringify";
import { all } from "@wooorm/starry-night";

const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStarryNight, { grammars: all })
    .use(rehypeStringify, { allowDangerousHtml: true });

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
    return (await processor.process(markdown)).toString();
}
