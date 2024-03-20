import type { PolygonConstructor } from "./types";

const originDefault = {
	x: 0,
	y: 0,
	angle: 0
};

/**
 * Generates the polygon's vertices coordinates.
 */
export const createPolygon: PolygonConstructor = (sides = 3, scale = 1, { x = 0, y = 0, angle = 0 } = originDefault) => {
	const polygon: ReturnType<PolygonConstructor> = {
		origin: {
			x,
			y,
			// half the polygons vertice angle
			angle: Math.PI * (sides - 2) / sides / 2 + angle
		},
		scale,
		sides,
		vertices: [],
		verticesPolar: []
	};

	for (let i = 0; i < sides; i++) {
		const angle = polygon.origin.angle + 2 * Math.PI * i / sides;
		polygon.vertices.push({
			x: polygon.origin.x + scale * Math.cos(angle),
			y: polygon.origin.y + scale * Math.sin(angle)
		});
		polygon.verticesPolar.push({
			phi: angle,
			r: scale
		});
	}

	return polygon;
};
