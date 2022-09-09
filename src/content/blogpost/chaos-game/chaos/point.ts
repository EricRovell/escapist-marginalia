import { move } from "./chaos.utils";
import type { Coords } from "./chaos.types";

interface Options {
	color: string;
	size: number;
}

const defaults = {
	size: 1,
	color: "white"
};

export class Point {
	x: number;
	y: number;
	size: number;
	color: string;

	constructor(coords: Coords, options: Partial<Options> = defaults) {
		this.x = coords.x || 0;
		this.y = coords.y || 0;
		this.size = options.size || 1;
		this.color = options.color || "white";
	}

	set coords(value: Coords) {
		this.x = value.x;
		this.y = value.y;
	}

	get coords(): Coords {
		return {
			x: this.x,
			y: this.y
		};
	}

	move(another: Coords, stepFactor: number) {
		const coords = move(this.coords, another, stepFactor);
		this.x = coords.x;
		this.y = coords.y;
	}

	render(context: CanvasRenderingContext2D) {
		context.beginPath();
		context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
		context.closePath();
		context.fill();
	}
}