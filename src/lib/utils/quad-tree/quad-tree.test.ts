import { describe, expect, it } from "vitest";
import { QuadTree } from "./quad-tree";
import { Rectangle, Point } from "./quad-tree.geometry";
import { randFloat } from "@utils/random";

describe("Splitting", () => {
	const fn = (capacity: number, points: number, depthLimit?: number) => {
		const [ height, width ] = [ 100, 100 ];
		const qt = new QuadTree(capacity, new Rectangle(0, 0, width, height), depthLimit);

		for (let i = 0; i < points; i++) {
			qt.insert(new Point(
				randFloat(0, width),
				randFloat(0, height)
			));
		}

		return qt;
	};

	it("Does not split when there is enough capacity", () => {
		expect(fn(10, 9).hasChildren).toBe(false);
		expect(fn(10, 10).hasChildren).toBe(false);
	});
	it("Does split when there is not enough capacity", () => {
		expect(fn(10, 11).hasChildren).toBe(true);
		expect(fn(5, 10).hasChildren).toBe(true);
	});
	it("Does not split when the maximum depth is reached", () => {
		const qt = fn(4, 50, 3);

		expect(qt.hasChildren).toBe(true);
		expect(qt.quadrants.every(q1 => q1.hasChildren)).toBe(true);
		expect(qt.quadrants.every(q1 => q1.quadrants.every(q2 => !q2.hasChildren))).toBe(true);
		expect(qt.quadrants.every(q1 => q1.quadrants.every(q2 => q2.quadrants.every(q3 => !q3.hasChildren)))).toBe(true);
	});
	it("Does not have items after split", () => {
		expect(fn(10, 11).items.length).toBe(0);
		expect(fn(5, 10).items.length).toBe(0);
	});
});
describe("Inserting", () => {
	it("Inserts an item where there is enough capacity", () => {
		const qt = new QuadTree(4, new Rectangle(0, 0, 100, 100));

		qt.insert(new Point(25, 25));
		expect(qt.items.length).toBe(1);
		qt.insert(new Point(25, 25));
		expect(qt.items.length).toBe(2);
		qt.insert(new Point(25, 25));
		expect(qt.items.length).toBe(3);
	});
	it("Inserts an item where there is enough capacity", () => {
		const qt = new QuadTree(4, new Rectangle(0, 0, 100, 100));

		// add items that will be contained in 4 different quadrants
		qt.insert(new Point(25, 25));
		qt.insert(new Point(75, 25));
		qt.insert(new Point(25, 75));
		qt.insert(new Point(75, 75));
		// adding this point will split the tree, it will be located at quadrant #0
		qt.insert(new Point(75, 25));

		expect(qt.quadrants[0].items.length).toBe(2);
	});
});
describe("Querying", () => {
	const qt = new QuadTree(4, new Rectangle(0, 0, 100, 100));

	const points = [
		[ 75, 25 ], [ 75, 26 ], [ 75, 27 ], [ 75, 28 ], [ 75, 30 ],
		[ 25, 25 ], [ 25, 26 ], [ 25, 27 ], [ 25, 28 ], [ 25, 29 ],
		[ 25, 75 ], [ 25, 76 ], [ 25, 77 ], [ 25, 78 ], [ 25, 79 ],
		[ 75, 75 ], [ 75, 76 ], [ 75, 77 ], [ 75, 78 ], [ 75, 79 ]
	];

	for (const [ x, y ] of points) {
		qt.insert(new Point(x, y));
	}

	it("Queries all points", () => {
		expect(qt.query(new Rectangle(0, 0, 100, 100)).length).toBe(20);
	});
	it("Queries points from quadrants", () => {
		expect(qt.query(new Rectangle(0, 0, 50, 50)).length).toBe(5);
		expect(qt.query(new Rectangle(50, 0, 50, 50)).length).toBe(5);
		expect(qt.query(new Rectangle(0, 50, 50, 50)).length).toBe(5);
		expect(qt.query(new Rectangle(50, 50, 50, 50)).length).toBe(5);
	});
	it("Queries points from two quadrants", () => {
		expect(qt.query(new Rectangle(0, 0, 100, 50)).length).toBe(10);
		expect(qt.query(new Rectangle(50, 0, 50, 100)).length).toBe(10);
		expect(qt.query(new Rectangle(0, 50, 100, 50)).length).toBe(10);
		expect(qt.query(new Rectangle(0, 0, 50, 100)).length).toBe(10);
	});
});
