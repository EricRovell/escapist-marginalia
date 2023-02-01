/**
 * Defines a coordinate in 2D space.
 */
export class Point<Data = unknown> {
	readonly x: number;
	readonly y: number;
	readonly data?: Data;

	constructor(x: number, y: number, data?: Data) {
		this.x = x;
		this.y = y;
		this.data = data;
	}
}

/**
 * Defines a rectangular boundary, where:
 *  - `x`, `y` - the top-left vertex position;
 *  - `w` - rectangle width (block dimension);
 *  - `h` - rectangle height (inline dimension).
 */
export class Rectangle {
	readonly x: number;
	readonly y: number;
	readonly w: number;
	readonly h: number;

	constructor(x: number, y: number, w: number, h: number) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	/**
	 * Checks if the given coordinate are contained within the boundary.
	 */
	contains(item: Point): boolean {
		return (
			item.x >= this.x &&
			item.x <= this.x + this.w &&
			item.y >= this.y &&
			item.y <= this.y + this.h
		);
	}

	/**
	 * Checks if the boundary intersects with given boundary.
	 */
	intersects(range: Rectangle): boolean {
		return !(
			this.x >= range.x + range.w ||
			this.x + this.w <= range.x ||
			this.y >= range.y + range.h ||
			this.y + this.h <= range.y
		);
	}
}

/**
 * Defines a circlular boundary, where:
 *   - `x`, `y` - a circle center;
 *   - `r` - a circle radius.
 */
export class Circle {
	readonly x: number;
	readonly y: number;
	readonly r: number;
	readonly rSq: number;

	constructor(x: number, y: number, r: number) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.rSq = this.r ** 2;
	}

	/**
	 * Checks if the given coordinate are contained within the boundary.
	 */
	contains(coords: Point): boolean {
		const distSq = (coords.x - this.x) ** 2 + (coords.y - this.y) ** 2;
		return distSq <= this.rSq;
	}

	/**
	 * Checks if the boundary intersects with axis-aligned rectangular boundary.
	 *
	 * Based on https://stackoverflow.com/a/402010.
	 */
	intersects(range: Rectangle): boolean {
		const [ hw, hh ] = [ range.w / 2, range.h / 2 ];
		const circleDistX = Math.abs(this.x - range.x - hw);
		const circleDistY = Math.abs(this.y - range.y - hh);

		if (circleDistX >= hw + this.r || circleDistY >= hh + this.r) {
			return false;
		}

		if (circleDistX <= hw || circleDistY <= hh) {
			return true;
		}

		return (circleDistX - hw) ** 2 + (circleDistY - hh) ** 2 < this.rSq;
	}
}
