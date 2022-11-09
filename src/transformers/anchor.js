import { visit } from "unist-util-visit";

/**
 * Checks if the given node is heading and returns it level.
 * If it is not or it's level is invalid, zero is returned.
 */
const checkHeading = node => {
	let name = "";
	let level = 0;

	if (node && node.type === "element") {
		name = node.tagName.toLowerCase() || "";
	}

	if (name.length === 2 && name[0] === "h") {
		level = name[1];
	}

	return (level < 7)
		? level
		: 0;
};

/**
 * Injects an anchor element (here it is custom as MDSvex uses custom Link instead <a>)
 * into heading element using it's ID slug.
 */
export const transformerAnchor = () => (tree) => {
	visit(tree, "element", node => {
		const heading = checkHeading(node);
		if (heading && node.properties?.id) {
			node.children.push({
				type: "element",
				tagName: "Components.a",
				properties: {
					href: `#${encodeURI(node.properties.id)}`,
					rel: [ "nofollow" ]
				},
				children: [{
					type: "text",
					value: "#"
				}]
			});
		}
	});
};
