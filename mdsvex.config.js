/**
 * Setup for including Math in MDsvex files.
 * 
 * Issue: https://github.com/pngwn/MDsveX/issues/302
 * Example: https://github.com/pngwn/mdsvex-math
 */

import math from "remark-math";
import rehype_katex from "rehype-katex";
import katex from "katex";
import { visit } from "unist-util-visit";
import slug from "rehype-slug";

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

/**
 * Custom remark plugin for injecting information about `headings` into frontmatter.
 */
function get_headings() {
  let visit;
  let tree_to_string;
  return async function transformer(tree, vFile) {
    if (!visit) {
      tree_to_string = (await import('mdast-util-to-string')).toString;
      visit = (await import('unist-util-visit')).visit;
    }

    vFile.data.toc = [];
		
    visit(tree, 'heading', (node) => {
			const title = tree_to_string(node);
      vFile.data.toc.push({
        level: node.depth,
        title,
				id: title.toLowerCase().replace(/\s/g, "-")
      });
    });

    if (!vFile.data.fm) {
			vFile.data.fm = {};
		}

    vFile.data.fm.toc = vFile.data.toc;
  };
};

export const mdsvexConfig = {
	remarkPlugins: [ get_headings, math, katex_blocks ],
	rehypePlugins: [ correct_hast_tree, rehype_katex, slug ],
	layout: {
		"project-euler": "./src/lib/layout/ProjectEuler.svelte",
		"algorithm": "./src/lib/layout/Algorithm.svelte"
	}
};