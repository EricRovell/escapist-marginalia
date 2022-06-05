/**
 * Setup for including Math in MDsvex files.
 * 
 * Issue: https://github.com/pngwn/MDsveX/issues/302
 * Example: https://github.com/pngwn/mdsvex-math
 */
import katex from "katex";
import { visit } from "unist-util-visit";

export const correct_hast_tree = () => (tree) => {
	visit(tree, "text", (node) => {
		if (node.value.trim().startsWith("<")) {
			node.type = "raw";
		}
	});
};
 
export const transformerMath = () => (tree) => {
	visit(tree, "code", (node) => {
		if (node.lang === "math") {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
			node.value = "{@html `" + str + "`}";
		}
	});
};
 