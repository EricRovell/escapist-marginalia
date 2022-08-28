export type { Polygon } from "./polygon";

export interface Coords {
	x: number;
	y: number;
}

/**
 * Polygon Vertice Interface.
 */
export interface Vertice extends Coords {
	x0: number;
	y0: number;
	alpha: number;
	r: number;
}

/**
 * Polygon Origin Interface.
 */
export interface PolygonOrigin extends Coords {
	angle: number;
}

export type PolygonVerticesConstructor = (n: number, scale: number, origin?: Partial<PolygonOrigin>) => Vertice[];

/**
 * Polygon vertice randomness restriction rule.
 */
export interface Steps {
	index: number;
	steps: number[]
	forbidden?: boolean;
}

export interface ChaosOptions {
	steps: Steps[];
	step: number | null;
	stepFactor: number;
}

/**
 * Chaos Game move data.
 */
export interface Move {
	position: Coords,
	verticeIndex: number;
	verticeCoords: Coords;
	color: string;
}
