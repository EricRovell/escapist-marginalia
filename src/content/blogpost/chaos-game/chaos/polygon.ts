import { randItem } from "@utils/random";
import { constructPolygon } from "./chaos.utils";
import type { PolygonOrigin, Vertice } from "./chaos.types";

export class Polygon {
	n: number;
	vertices: Vertice[];
	origin: Partial<PolygonOrigin>;

	constructor(n: number, scale: number, origin: Partial<PolygonOrigin>) {
		this.n = n;
		this.origin = origin;
		this.vertices = constructPolygon(n, scale, origin);
	}

	vertice(index: number): Vertice {
		return this.vertices[index];
	}

	get random(): [ Vertice, number ] {
		return randItem(this.vertices);
	}
}
