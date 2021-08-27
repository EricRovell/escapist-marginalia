import sveltePreprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import katex from "rehype-katex";
import adapter from "@sveltejs/adapter-static";
import path from "path";

const aliasList = [
	{ name: "@components", path: "./src/lib/components" },
	{ name: "@lib", path: "./src/lib" },
	{ name: "@styles", path: "./src/lib/styles" },
	{ name: "@stores", path: "./src/lib/stores" },
	{ name: "@utils", path: "./src/lib/utils" },
	{ name: "@views", path: "./src/lib/views" },
	{ name: "@types", path: "./src/types" },
	{ name: "@paths", path: "./src/core/paths.ts" }
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex({
			rehypePlugins: [
				katex
			],
			layout: {
				blogpost: "./src/lib/layout/Blogpost.svelte"
			}
		}),
		sveltePreprocess(),
	],
	extensions: [ ".svelte", ".svx" ],
	kit: {
		adapter: adapter(),
		target: "body",
		vite: {
			resolve: {
				alias: Object.fromEntries(aliasList.map(alias => (
					[ alias.name, path.resolve(alias.path) ]
				)))
			}
		}
	}
};

export default config;