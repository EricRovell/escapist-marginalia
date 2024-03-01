/**
 * Setup for including Math in MDsvex files.
 *
 * Issue: https://github.com/pngwn/MDsveX/issues/302
 * Example: https://github.com/pngwn/mdsvex-math
*/
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import math from "remark-math";
import rehype_katex from "rehype-katex";
import slug from "rehype-slug";

import {
	correct_hast_tree,
	transformerAnchor,
	transformerMath,
	transformerTOC
} from "./src/transformers/index.js";

const LAYOUT_PATH = "/src/lib/layout/default/default.layout.svelte";

export const mdsvexConfig = {
	remarkPlugins: [ transformerTOC, math, transformerMath ],
	rehypePlugins: [ correct_hast_tree, rehype_katex, slug, transformerAnchor ],
	layout: {
		// https://github.com/pngwn/MDsveX/issues/556#issue-2043362234
		"_": `${dirname(fileURLToPath(import.meta.url))}${LAYOUT_PATH}`
	}
};
