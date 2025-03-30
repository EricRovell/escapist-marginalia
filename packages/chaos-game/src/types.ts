export interface Coords {
	x: number;
	y: number;
}

export interface CoordsPolar {
	phi: number;
	r: number;
}

/**
 * Polygon Vertice Interface.
 */
export interface Vertice extends Coords {
	alpha: number;
	r: number;
	x0: number;
	y0: number;
}

/**
 * Polygon Origin Interface.
 */
export interface PolygonOrigin extends Coords {
	angle: number;
}

export interface Polygon {
	origin: PolygonOrigin;
	scale: number;
	sides: number;
	vertices: Coords[];
	verticesPolar: CoordsPolar[];
}

export type PolygonConstructor = (sides: number, scale: number, origin?: Partial<PolygonOrigin>) => Polygon;

/**
 * Polygon vertice randomness restriction rule.
 */
export interface VerticeRestrictionRule {
	forbidden?: boolean;
	index: number;
	values: number[]
}

export interface ChaosOptions {
	distances: VerticeRestrictionRule[];
	step: {
		factor: boolean;
		value: number;
	}
}

/**
 * Chaos Game move data.
 */
export interface Move {
	position: Coords,
	verticeCoords: Coords;
	verticeIndex: number;
}
