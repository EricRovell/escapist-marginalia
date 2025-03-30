import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";
import { dirname, resolve } from "node:path";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
	integrations: [
		solid(),
		mdx()
	],
	outDir: process.env.LANG === "ru" ? "./dist-ru" : undefined,
	markdown: {
		rehypePlugins: [
			rehypeKatex
		],
		remarkPlugins: [
			remarkMath
		],
		shikiConfig: {
			themes: {
				dark: "poimandres",
				light: "catppuccin-latte"
			}
		}
	},
	site: "https://example.com",
	vite: {
		resolve: {
			alias: {
				"~": resolve(__dirname, "./src")
			}
		}
	}
});
