import type { Config } from "tailwindcss";
import { addIconSelectors } from "@iconify/tailwind";

export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: ["selector", '[data-color-mode="dark"]'],
    theme: {
        container: {
            screens: {
                xl: "1024px",
                "2xl": "1024px",
            },
        },
    },
    plugins: [addIconSelectors(["fa6-solid"])],
} satisfies Config;
