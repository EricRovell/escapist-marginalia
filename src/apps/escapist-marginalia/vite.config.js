import { sveltekit } from "@sveltejs/kit/vite";
import intlPrecompile from "svelte-intl-precompile/sveltekit-plugin";
import replace from "@rollup/plugin-replace";

import pluginPostCssNesting from "postcss-nesting";

const config = {
	plugins: [
		sveltekit(),
		intlPrecompile("/src/locales"),
		replace({
			preventAssignment: true,
			"BUILD_TIME": () => new Date().toISOString()
		})
	],
	css: {
		postcss: {
			plugins: [
				pluginPostCssNesting
			]
		}
	},
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			allow: [ ".." ]
		}
	}
};

export default config;
