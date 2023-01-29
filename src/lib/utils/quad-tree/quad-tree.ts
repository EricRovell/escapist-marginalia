import { Circle, Point, Rectangle } from "./quad-tree.geometry";
import type { Boundary } from ".";

/**
 * Class representing a `QuadTree` Node.
 */
export class QuadTree<Item extends Point = Point> {
	readonly boundary: Rectangle;
	readonly capacity: number;
	readonly depth: number;
	private readonly depthLimit: number;
	items: Item[];
	quadrants: QuadTree<Item>[];

	constructor(capacity: number, boundary: Rectangle, depthLimit = 12, depth = 1) {
		this.boundary = boundary;
		this.capacity = capacity;
		this.depth = depth;
		this.depthLimit = depthLimit;
		this.items = [];
		this.quadrants = [];
	}

	/**
	 * Returns the the boundary's origin (top-left vertext) `x` coordinate.
	 */
	get x(): number {
		return this.boundary.x;
	}

	/**
	 * Returns the the boundary's origin (top-left vertext) `y` coordinate.
	 */
	get y(): number {
		return this.boundary.y;
	}

	/**
	 * Returns the the boundary width (block size).
	 */
	get width(): number {
		return this.boundary.w;
	}

	/**
	 * Returns the the boundary height (inline size).
	 */
	get height(): number {
		return this.boundary.h;
	}

	/**
	 * Returns a flag indicating if this branch has children.
	 */
	get hasChildren(): boolean {
		return this.quadrants.length > 0;
	}

	/**
	 * Clears the QuadTree instance.
	 */
	clear(): void {
		this.items = [];

		for (const quadrant of this.quadrants) {
			if (quadrant.hasChildren) {
				quadrant.clear();
			}
		}

		this.quadrants = [];
	}

	/**
	 * Inserts a coordinate into the `QuadTree` instance.
	 */
	insert(item: Item): boolean {
		if (!this.boundary.contains(item)) {
			return false;
		}

		if (!this.hasChildren && this.items.length < this.capacity) {
			this.items.push(item);
			return true;
		}

		if (!this.hasChildren && this.depth < this.depthLimit) {
			this.split();

			for (const thisItem of this.items) {
				for (const quadrant of this.quadrants) {
					if (quadrant.insert(thisItem)) {
						break;
					}
				}
			}

			this.items = [];
		}

		for (const quadrant of this.quadrants) {
			if (quadrant.insert(item)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Creates children nodes, expanding the `QuadTree` instance.
	 */
	private split(): void {
		const hw = this.width / 2;
		const hh = this.height / 2;

		const delta = [
			[ hw, 0 ],
			[ 0, 0 ],
			[ 0, hh ],
			[ hw, hh ]
		];

		for (const [ dx, dy ] of delta) {
			this.quadrants.push(new QuadTree<Item>(
				this.capacity,
				new Rectangle(this.x + dx, this.y + dy, hw, hh),
				this.depthLimit,
				this.depth + 1
			));
		}
	}

	/**
	 * Queries the `QuadTree` instance for stored items located withing a given boundary.
	 */
	query(range: Rectangle | Circle, items: Item[] = []): Item[] {
		// boundary.intersects(range) or vice versa?
		if (!range.intersects(this.boundary)) {
			return items;
		}

		for (const item of this.items) {
			if (range.contains(item)) {
				items.push(item);
			}
		}

		if (this.hasChildren) {
			for (const quadrant of this.quadrants) {
				quadrant.query(range, items);
			}
		}

		return items;
	}

	/**
	 * Visualizes the `QuadTree` instance on a `canvas` element.
	 */
	render(context: CanvasRenderingContext2D, stroke = 1, strokeStyle = "#808080") {
		context.strokeStyle = strokeStyle;
		context.lineWidth = stroke;
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.x, this.y + this.height);
		context.lineTo(this.x + this.width, this.y + this.height);
		context.lineTo(this.x + this.width, this.y);
		context.lineTo(this.x, this.y);
		context.closePath();
		context.stroke();

		if (this.hasChildren) {
			for (const quadrant of this.quadrants) {
				quadrant.render(context);
			}
		}
	}
}
