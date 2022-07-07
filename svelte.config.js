import sveltePreprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import { mdsvexConfig } from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex(mdsvexConfig),
		sveltePreprocess(),
	],
	extensions: [ ".svelte", ".svx" ],
	kit: {
		adapter: adapter(),
		prerender: {
			default: false
		}
	}
};

export default config;
