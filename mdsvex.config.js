/**
 * Setup for including Math in MDsvex files.
 * 
 * Issue: https://github.com/pngwn/MDsveX/issues/302
 * Example: https://github.com/pngwn/mdsvex-math
*/
import math from "remark-math";
import rehype_katex from "rehype-katex";
import slug from "rehype-slug";

import {
	correct_hast_tree,
	transformerAnchor,
	transformerMath,
	transformerTOC
} from "./src/transformers/index.js";

export const mdsvexConfig = {
	remarkPlugins: [ transformerTOC, math, transformerMath ],
	rehypePlugins: [ correct_hast_tree, rehype_katex, slug, transformerAnchor ],
	layout: {
		"blogpost": "./src/lib/layout/blogpost/Blogpost.svelte"
	}
};