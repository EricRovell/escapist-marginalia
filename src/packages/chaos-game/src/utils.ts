import type { Coords } from "./types";

/**
 * Generates a set of valid polygon vertices for the next move in one direction
 * from the list of allowed steps from the chosen vertice.
 */
export const getValidVertices = (lastChosen: number, polygon: number, distances: number[]) => {
	return distances.map(value => (lastChosen + value) % polygon);
};

/**
 * Performs a set intersection operation.
 */
export const getSetIntersection = <T>(sets: Set<T>[]): Set<T> => {
	if (sets.length === 1) {
		return sets[0];
	}

	if (!sets.length) {
		return new Set();
	}

	const intersection = new Set<T>();
	for (const set of sets) {
		for (const value of set) {
			if (sets.every(someSet => someSet.has(value))) {
				intersection.add(value);
			}
		}
	}

	return intersection;
};

/**
 * Calculates a new position after a move by a specific distance in direction.
 */
export function jump(from: Coords, to: Coords, step: number): Coords {
	const dist = ((to.x - from.x) ** 2 + (to.y - from.y) ** 2) ** 0.5;
	return {
		x: step * (to.x - from.x) / dist + from.x,
		y: step * (to.y - from.y) / dist + from.y
	};
}

/**
 * Calculates a new position after a move by a factor of distance between to points.
 */
export function move(from: Coords, to: Coords, factor = 1): Coords {
	return {
		x: (from.x + to.x) * factor,
		y: (from.y + to.y) * factor
	};
}

/**
 * Generates all array subsets.
 */
export function subsets<T>(array: T[], includeEmpty = true): T[][] {
	const subsets = [ [] ];

	for (const item of array) {
		const last = subsets.length - 1;
		for (let i = 0; i <= last; i++) {
			subsets.push([ ...subsets[i], item ]);
		}
	}

	return includeEmpty
		? subsets
		: subsets.slice(1);
}
