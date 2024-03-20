import { randFloat } from "utils/random";
import type { QuadTree, Boundary } from "quadtree";

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

/**
 * Generates a set of random points for a quadtree.
 * 
 * width & height - quadtree's boundary size;
 * offset - point position offset from the boundary edges.
 */
export function* getRandomPoints(points: number, width: number, height: number, offset: number) {
	for (let i = 0; i < points; i++) {
		yield {
			x: randFloat(offset, width - offset),
			y: randFloat(offset, height - offset)
		};
	}
}
