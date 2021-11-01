/**
 * Setup for including Math in MDsvex files.
 * 
 * Issue: https://github.com/pngwn/MDsveX/issues/302
 * Example: https://github.com/pngwn/mdsvex-math
 */

import math from "remark-math";
import rehype_katex from "rehype-katex";
import katex from "katex";
import visit from "unist-util-visit";

const correct_hast_tree = () => (tree) => {
	visit(tree, "text", (node) => {
		if (node.value.trim().startsWith('<')) {
			node.type = "raw";
		}
	});
};

const katex_blocks = () => (tree) => {
	visit(tree, "code", (node) => {
		if (node.lang === "math") {
			const str = katex.renderToString(node.value, {
				displayMode: true,
				leqno: false,
				fleqn: false,
				throwOnError: true,
				errorColor: "#cc0000",
				strict: "warn",
				output: "htmlAndMathml",
				trust: false,
				macros: { "\\f": "#1f(#2)" }
			});

			node.type = "raw";
			node.value = '{@html `' + str + '`}';
		}
	});
};

export const mdsvexConfig = {
	remarkPlugins: [ math, katex_blocks ],
	rehypePlugins: [ correct_hast_tree, rehype_katex ],
	layout: {
		"project-euler": "./src/lib/layout/LayoutProjectEuler.svelte",
		"blogpost": "./src/lib/layout/Blogpost.svelte"
	}
};