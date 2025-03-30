import { range } from "utils/math";
import { randItem } from "utils/random";
import { isNonNegativeInteger } from "utils/validators";

import { getSetIntersection, getValidVertices, jump, move  } from "./utils";

import type { ChaosOptions, Coords, Move, Polygon, VerticeRestrictionRule } from "./types";

const defaults: ChaosOptions = {
	distances: [],
	step: {
		factor: true,
		value: 0.5
	}
};

export class Chaos {
	counter: number;
	distances: Omit<VerticeRestrictionRule, "forbidden">[];
	history: number[];
	polygon: Polygon;
	position: Coords;
	step: {
		factor: boolean;
		value: number;
	};

	get moveData(): Move {
		const index = this.history[this.history.length - 1];

		return {
			position: this.position,
			verticeCoords: this.polygon.vertices[index],
			verticeIndex: index
		};
	}

	get randVerticeCoords(): Coords {
		const [ coords, index ] = randItem(this.polygon.vertices);
		this.updateHistory(index);
		return coords;
	}

	constructor(polygon: Polygon, options: Partial<ChaosOptions> = defaults) {
		this.counter = 0;
		this.distances = [];
		this.history = [ 0 ];
		this.polygon = polygon;
		this.position = { x: 0, y: 0 };
		this.step = options.step ?? defaults.step;

		this.initDistances(options.distances ?? []);
	}

	getRandomVerticeCoords(): Coords {
		if (!this.distances.length) {
			return this.randVerticeCoords;
		}

		const allowed: Set<number>[] = [];

		for (const { index, values } of this.distances) {
			const vertice = this.history.at(index);

			if (isNonNegativeInteger(vertice)) {
				const vertices = getValidVertices(vertice, this.polygon.sides, values);
				allowed.push(new Set(vertices));
			}
		}

		const [ index ] = randItem(Array.from(getSetIntersection(allowed)));

		if (index !== 0 && !index) {
			//console.warn("Could not generate random vertice due the restriction rules.");
			return this.randVerticeCoords;
		}

		this.updateHistory(index);
		return this.polygon.vertices[index];
	}

	/**
	 * "steps" restricts the vertices are available for the next move.
	 *
	 * { index: -1, steps: [ 1, 2, 3] } means that the lastly chosen vertice index
	 * should be any of steps away from the next chosen vertex.
	 *
	 * Optional `forbidden` flag marks steps as forbidden distances.
	 */
	initDistances(distances: VerticeRestrictionRule[]) {
		if (!distances.length) {
			return;
		}

		for (const { forbidden = false, index, values } of distances) {
			if (!forbidden) {
				this.distances.push({ index, values });
			} else {
				const vertices = new Set(range(this.polygon.sides));
				for (const value of values) {
					vertices.delete(value);
				}
				this.distances.push({ index, values: Array.from(vertices) });
			}
		}
	}

	move(): Move {
		const verticeCoords = this.getRandomVerticeCoords();
		const coords = (this.step.factor)
			? move(this.position, verticeCoords, this.step.value)
			: jump(this.position, verticeCoords, this.step.value);
		this.position = coords;
		this.counter += 1;
		return this.moveData;
	}

	moves(value = 1): Move[] {
		const positions = [];
		for (let i = 0; i < value; i++) {
			positions.push(
				this.move()
			);
		}

		return positions;
	}

	/**
	 * Stores the history of all lastly chosen vertex indices.
	 * The size is equal to the number of vertices.
	 */
	updateHistory(vertice: number) {
		this.history.push(vertice);
		this.history = this.history.slice(-this.polygon.sides);
	}
}
