import sveltePreprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import katex from "rehype-katex";
import adapter from "@sveltejs/adapter-static";
import path from "path";
import cssModules from "svelte-preprocess-cssmodules";

const aliasList = [
	{ name: "$components", path: "./src/lib/components" },
	{ name: "$stores", path: "./src/lib/stores" },
	{ name: "$utils", path: "./src/lib/utils" },
	{ name: "$views", path: "./src/lib/views" },
	{ name: "$types", path: "./src/types" },
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex({
			rehypePlugins: [
				katex
			],
			layout: {
				blog: "./src/components/layout.svelte"
			}
		}),
		cssModules(),
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