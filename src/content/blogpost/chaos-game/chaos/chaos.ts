import { getValidVertices, jump, move, getSetIntersection  } from "./chaos.utils";
import { range } from "@utils/helpers";
import { randItem } from "@utils/random";
import type { ChaosOptions, Coords, Move, Polygon, Steps  } from "./chaos.types";

const defaults = {
	steps: [],
	step: null,
	stepFactor: 0
};

export class Chaos {
	history: number[];
	polygon: Polygon;
	position: Coords;
	step: number;
	steps: Array<Omit<Steps, "forbidden">>;
	stepFactor: number;
	palette: string[];

	constructor(polygon: Polygon, options: Partial<ChaosOptions> = defaults) {
		this.polygon = polygon;
		this.history = [ 0 ];
		this.steps = [];
		this.step = options.step;
		this.stepFactor = options.stepFactor || (3 / (this.polygon.n + 3));
		this.position = { x: 0, y: 0 };

		this.palette = this.polygon.vertices.map(({ alpha }) => {
			return `hsl(${Math.round(alpha * 180 / Math.PI)} 75% 50%)`;
		});

		this.initSteps(options.steps || []);
	}

	/**
	 * "steps" restricts the vertices are available for the next move.
	 * 
	 * { index: -1, steps: [ 1, 2, 3] } means that the lastly chosen vertice index
	 * should be any of steps away from the next chosen vertex.
	 * 
	 * Optional `forbidden` flag marks steps as forbidden distances.
	 */
	initSteps(value: Steps[]) {
		if (!value.length) {
			return;
		}

		for (const { index, steps, forbidden = false } of value) {
			if (!forbidden) {
				this.steps.push({ index, steps });
			} else {
				const vertices = new Set(range(0, this.polygon.n - 1));
				for (const step of steps) {
					vertices.delete(step);
				}
				this.steps.push({ index, steps: Array.from(vertices) });
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
		if (!this.steps.length) {
			const [ coords, index ] = this.polygon.random;
			this.updateHistory(index);
			return coords;
		}

		const allowed: Set<number>[] = [];

		for (const { index, steps } of this.steps) {
			const vertice = this.history.at(index);
			if (vertice >= 0) {
				const vertices = getValidVertices(vertice, this.polygon.n, steps);
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
		const coords = (this.step)
			? jump(this.position, verticeCoords, this.step)
			: move(this.position, verticeCoords, this.stepFactor);
		this.position = coords;
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
