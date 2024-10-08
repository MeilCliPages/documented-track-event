import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import rehypeStarryNight from "rehype-starry-night";
import { all } from "@wooorm/starry-night";
import { remarkTemplatePlugin } from "./src/template";

function rehypeStarryNightWrapper() {
    return rehypeStarryNight({ grammars: all });
}

export default defineConfig({
    site: "https://dte.meilcli.net",
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport",
    },
    integrations: [mdx(), tailwind()],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [remarkTemplatePlugin],
        rehypePlugins: [rehypeStarryNightWrapper],
    },
});
