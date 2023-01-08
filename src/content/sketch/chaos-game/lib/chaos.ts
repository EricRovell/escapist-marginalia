import { getValidVertices, jump, move, getSetIntersection  } from "./chaos.utils";
import { range } from "@utils/helpers";
import { randItem, randInt } from "@utils/random";
import type { ChaosOptions, Coords, Move, Polygon, VerticeRestrictionRule } from "./chaos.types";

const defaults: ChaosOptions = {
	distances: [],
	step: {
		value: 0.5,
		factor: true
	}
};

export class Chaos {
	counter: number;
	history: number[];
	polygon: Polygon;
	position: Coords;
	step: {
		value: number;
		factor: boolean;
	};
	distances: Array<Omit<VerticeRestrictionRule, "forbidden">>;

	constructor(polygon: Polygon, options: Partial<ChaosOptions> = defaults) {
		this.counter = 0;
		this.distances = [];
		this.history = [ 0 ];
		this.polygon = polygon;
		this.position = { x: 0, y: 0 };
		this.step = options.step || defaults.step;

		this.initDistances(options.distances || []);
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

		for (const { index, values, forbidden = false } of distances) {
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

	/**
	 * Stores the history of all lastly chosen vertex indices.
	 * The size is equal to the number of vertices.
	 */
	updateHistory(vertice: number) {
		this.history.push(vertice);
		this.history = this.history.slice(-this.polygon.sides);
	}

	get randVerticeCoords(): Coords {
		const [ coords, index ] = randItem(this.polygon.vertices);
		this.updateHistory(index);
		return coords;
	}

	getRandomVerticeCoords(): Coords {
		if (!this.distances.length) {
			return this.randVerticeCoords;
		}

		const allowed: Set<number>[] = [];

		for (const { index, values } of this.distances) {
			const vertice = this.history.at(index);
			if (vertice >= 0) {
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

	get moveData(): Move {
		const index = this.history.at(-1);
		return {
			position: this.position,
			verticeIndex: index,
			verticeCoords: this.polygon.vertices[index]
		};
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
}
