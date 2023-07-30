import { visit } from "unist-util-visit";
import { toString as treeToString } from "mdast-util-to-string";

/**
 * Custom remark plugin for injecting information about `headings` into frontmatter.
 * 
 * TODO: Refactor this into rehype plugin to get the heading ID within HTML for better sync.
 * Right now rehype cannot change the frontmatter
 * https://github.com/pngwn/MDsveX/issues/353
 */
export const transformerTOC = () => (tree, vFile) => {
	const toc = [];

	visit(tree, "heading", (node) => {
		const title = treeToString(node);
		toc.push({
			level: node.depth,
			title,
			id: title.toLowerCase().replace(/\s/g, "-")
		});
	});

	if (!vFile.data.fm) {
		vFile.data.fm = {};
	}

	if (toc.length) {
		vFile.data.fm.toc = toc;
	}
};
