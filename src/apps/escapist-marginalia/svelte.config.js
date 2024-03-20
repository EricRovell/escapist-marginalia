import path from "path";
import sveltePreprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";

import { mdsvexConfig } from "./mdsvex.config.js";

const aliasList = [
	{ name: "@data", path: "./src/data" },
	{ name: "@content", path: "./src/content" },
	{ name: "@layout", path: "./src/lib/layout" },
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
	extensions: [ ".svelte", ".mdx" ],
	kit: {
		alias: Object.fromEntries(aliasList.map(alias => (
			[ alias.name, path.resolve(alias.path) ]
		))),
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: null,
			precompress: false
		}),
		prerender: {
			entries: [
				"*",
				"/rss.xml"
			],
			origin: "https://escapist-marginalia.vercel.app",
			handleMissingId: "ignore"
		}
	}
};

export default config;
