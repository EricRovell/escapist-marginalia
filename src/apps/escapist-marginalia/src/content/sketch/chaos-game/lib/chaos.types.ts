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
	index: number;
	values: number[]
	forbidden?: boolean;
}

export interface ChaosOptions {
	distances: VerticeRestrictionRule[];
	step: {
		value: number;
		factor: boolean;
	}
}

/**
 * Chaos Game move data.
 */
export interface Move {
	position: Coords,
	verticeIndex: number;
	verticeCoords: Coords;
}
