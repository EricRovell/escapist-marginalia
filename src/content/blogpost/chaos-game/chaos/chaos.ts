import { getValidVertices, jump, move, getSetIntersection  } from "./chaos.utils";
import { range } from "@utils/helpers";
import { randItem } from "@utils/random";
import type { ChaosOptions, Coords, Move, Polygon, VerticeRestrictionRule } from "./chaos.types";

const defaults = {
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
	palette: string[];

	constructor(polygon: Polygon, options: Partial<ChaosOptions> = defaults) {
		this.polygon = polygon;
		this.history = [ 0 ];
		this.distances = [];
		this.step = options.step || defaults.step;
		this.position = { x: 0, y: 0 };
		this.counter = 0;

		this.palette = this.polygon.vertices.map(({ alpha }) => {
			return `hsl(${Math.round(alpha * 180 / Math.PI)} 75% 50%)`;
		});

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
				const vertices = new Set(range(0, this.polygon.n - 1));
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
		this.history = this.history.slice(-this.polygon.n);
	}

	getRandomVerticeCoords(): Coords {
		if (!this.distances.length) {
			const [ coords, index ] = this.polygon.random;
			this.updateHistory(index);
			return coords;
		}

		const allowed: Set<number>[] = [];

		for (const { index, values } of this.distances) {
			const vertice = this.history.at(index);
			if (vertice >= 0) {
				const vertices = getValidVertices(vertice, this.polygon.n, values);
				allowed.push(new Set(vertices));
			}
		}

		const [ index ] = randItem(Array.from(getSetIntersection(allowed)));
		this.updateHistory(index);
		return this.polygon.vertice(index);
	}

	get moveData(): Move {
		const index = this.history.at(-1);
		return {
			position: this.position,
			verticeIndex: index,
			verticeCoords: this.polygon.vertice(index),
			color: this.palette[index]
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
