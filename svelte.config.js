import sveltePreprocess from "svelte-preprocess";
import intlPrecompile from "svelte-intl-precompile/sveltekit-plugin";
import { mdsvex } from "mdsvex";
import { mdsvexConfig } from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-static";
import path from "path";

const aliasList = [
	{ name: "@data", path: "./src/data" },
	{ name: "@components", path: "./src/lib/components" },
	{ name: "@lib", path: "./src/lib" },
	{ name: "@styles", path: "./src/lib/styles" },
	{ name: "@stores", path: "./src/lib/stores" },
	{ name: "@utils", path: "./src/lib/utils" },
	{ name: "@views", path: "./src/lib/views" },
	{ name: "@types", path: "./src/types" },
	{ name: "@paths", path: "./src/core/paths.ts" },
	{ name: "@core", path: "./src/core" },
	{ name: "$locales", path: "./src/locales" }
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex(mdsvexConfig),
		sveltePreprocess(),
	],
	extensions: [ ".svelte", ".svx" ],
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: Object.fromEntries(aliasList.map(alias => (
					[ alias.name, path.resolve(alias.path) ]
				)))
			},
			server: {
				fs: {
					// Allow serving files from one level up to the project root
					allow: [ ".." ]
				}
			},
			plugins: [
				intlPrecompile("/src/locales")
			]
		}
	}
};

export default config;