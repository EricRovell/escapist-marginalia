import type { QuadTree, Boundary } from "@utils/quad-tree";

/**
 * Returns the boundaries coordinates that have children.
 */
export const getBoundaries = (qt: QuadTree, query: Boundary[] = []): Boundary[] => {
	query.push({
		x: qt.x,
		y: qt.y,
		width: qt.width,
		height: qt.height
	});

	if (qt.hasChildren) {
		for (const quadrant of qt.quadrants) {
			getBoundaries(quadrant, query);
		}
	}

	return query;
};
