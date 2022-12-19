import { Circle, Rectangle, Point } from "./quad-tree.geometry";
import { describe, expect, it } from "vitest";

describe("Rectangle containment", () => {
	const fn = (x1: number, y1: number, w1: number, h1: number) => (x2: number, y2: number) => {
		const rect = new Rectangle(x1, y1, w1, h1);
		const point = new Point(x2, y2);
		return rect.contains(point);
	};

	const point = fn(0, 0, 8, 6);

	it("Does not contain the point: it is too far above", () => {
		expect(point(2, -1)).toBe(false);
		expect(point(4, -2)).toBe(false);
		expect(point(6, -1)).toBe(false);
	});
	it("Does not contain the point: it is too far right", () => {
		expect(point(9, 1)).toBe(false);
		expect(point(10, 3)).toBe(false);
		expect(point(9, 5)).toBe(false);
	});
	it("Does not contain the point: it is too far bottom", () => {
		expect(point(2, 7)).toBe(false);
		expect(point(4, 8)).toBe(false);
		expect(point(6, 7)).toBe(false);
	});
	it("Does not contain the point: it is too far left", () => {
		expect(point(-1, 1)).toBe(false);
		expect(point(-1, 3)).toBe(false);
		expect(point(-1, 5)).toBe(false);
	});
	it("Contains the point: it is at the top edge", () => {
		expect(point(2, 0)).toBe(true);
		expect(point(4, 0)).toBe(true);
		expect(point(6, 0)).toBe(true);
	});
	it("Contains the point: it is at the right edge", () => {
		expect(point(8, 1)).toBe(true);
		expect(point(8, 3)).toBe(true);
		expect(point(8, 5)).toBe(true);
	});
	it("Contains the point: it is at the bottom edge", () => {
		expect(point(6, 2)).toBe(true);
		expect(point(6, 4)).toBe(true);
		expect(point(6, 6)).toBe(true);
	});
	it("Contains the point: it is at the left edge", () => {
		expect(point(0, 1)).toBe(true);
		expect(point(0, 3)).toBe(true);
		expect(point(0, 5)).toBe(true);
	});
	it("Contains the point: it is at the 1st quadrant", () => {
		expect(point(7, 1)).toBe(true);
		expect(point(6, 1)).toBe(true);
		expect(point(6, 2)).toBe(true);
		expect(point(7, 2)).toBe(true);
	});
	it("Contains the point: it is at the 2nd quadrant", () => {
		expect(point(2, 1)).toBe(true);
		expect(point(1, 1)).toBe(true);
		expect(point(1, 2)).toBe(true);
		expect(point(2, 2)).toBe(true);
	});
	it("Contains the point: it is at the 3rd quadrant", () => {
		expect(point(2, 4)).toBe(true);
		expect(point(1, 4)).toBe(true);
		expect(point(1, 5)).toBe(true);
		expect(point(5, 5)).toBe(true);
	});
	it("Contains the point: it is at the 4th quadrant", () => {
		expect(point(7, 4)).toBe(true);
		expect(point(6, 4)).toBe(true);
		expect(point(6, 5)).toBe(true);
		expect(point(7, 5)).toBe(true);
	});
	it("Contains the point: it is at the center", () => {
		expect(point(4, 3)).toBe(true);
	});
});
describe("Rectangle Intersection", () => {
	const fn = (x1: number, y1: number, w1: number, h1: number) => (x2: number, y2: number, w2: number, h2: number) => {
		const a = new Rectangle(x1, y1, w1, h1);
		const b = new Rectangle(x2, y2, w2, h2);
		return a.intersects(b);
	};

	const rect = fn(0, 0, 8, 6);

	it("Does not intersect: another rectangle is too far above", () => {
		expect(rect(0, -6, 6, 4)).toBe(false);
		expect(rect(2, -6, 6, 4)).toBe(false);
		expect(rect(4, -6, 6, 4)).toBe(false);
	});
	it("Does not intersect: another rectangle is too far right", () => {
		expect(rect(10, 0, 6, 4)).toBe(false);
		expect(rect(10, 2, 6, 4)).toBe(false);
		expect(rect(10, 4, 6, 4)).toBe(false);
	});
	it("Does not intersect: another rectangle is too far bottom", () => {
		expect(rect(0, 7, 6, 4)).toBe(false);
		expect(rect(0, 8, 6, 4)).toBe(false);
		expect(rect(0, 10, 6, 4)).toBe(false);
	});
	it("Does not intersect: another rectangle is too far left", () => {
		expect(rect(-8, -2, 6, 4)).toBe(false);
		expect(rect(-8, 2, 6, 4)).toBe(false);
		expect(rect(-8, 4, 6, 4)).toBe(false);
	});
	it("Does not intersect: another rectangle is at the edge at above", () => {
		expect(rect(-2, -4, 6, 4)).toBe(false);
		expect(rect(0, -4, 6, 4)).toBe(false);
		expect(rect(2, -4, 6, 4)).toBe(false);
	});
	it("Does not intersect: another rectangle is at the edge at right", () => {
		expect(rect(8, -2, 6, 4)).toBe(false);
		expect(rect(8, 0, 6, 4)).toBe(false);
		expect(rect(8, 2, 6, 4)).toBe(false);
	});
	it("Does not intersect: another rectangle is at the edge at bottom", () => {
		expect(rect(-2, 6, 6, 4)).toBe(false);
		expect(rect(0, 6, 6, 4)).toBe(false);
		expect(rect(2, 6, 6, 4)).toBe(false);
	});
	it("Does not intersect: another rectangle is at the edge at left", () => {
		expect(rect(-6, -2, 6, 4)).toBe(false);
		expect(rect(-6, 0, 6, 4)).toBe(false);
		expect(rect(-6, 2, 6, 4)).toBe(false);
	});
	it("Intersects: another rectangle is covering the entire 1st quadrant and beyound", () => {
		expect(rect(4, 1, 6, 4)).toBe(true);
	});
	it("Intersects: another rectangle is covering the entire 2nd quadrant and beyound", () => {
		expect(rect(-2, 1, 6, 4)).toBe(true);
	});
	it("Intersects: another rectangle is covering the entire 3rd quadrant and beyound", () => {
		expect(rect(-2, 3, 6, 4)).toBe(true);
	});
	it("Intersects: another rectangle is covering the entire 4th quadrant and beyound", () => {
		expect(rect(4, 3, 6, 4)).toBe(true);
	});
	it("Intersects: another rectangle is covering the entire 1st quadrant", () => {
		expect(rect(4, 0, 4, 3)).toBe(true);
	});
	it("Intersects: another rectangle is covering the entire 2nd quadrant", () => {
		expect(rect(0, 0, 4, 3)).toBe(true);
	});
	it("Intersects: another rectangle is covering the entire 3rd quadrant", () => {
		expect(rect(0, 3, 4, 3)).toBe(true);
	});
	it("Intersects: another rectangle is covering the entire 4th quadrant", () => {
		expect(rect(4, 3, 4, 3)).toBe(true);
	});
	it("Intersects: another rectangle is covering the 1st quadrant partially", () => {
		expect(rect(4, -1, 3, 2)).toBe(true);
	});
	it("Intersects: another rectangle is covering the 2nd quadrant partially", () => {
		expect(rect(4, 3, 3, 2)).toBe(true);
	});
	it("Intersects: another rectangle is covering the 3rd quadrant partially", () => {
		expect(rect(1, 3, 3, 2)).toBe(true);
	});
	it("Intersects: another rectangle is covering the 4th quadrant partially", () => {
		expect(rect(1, -1, 3, 2)).toBe(true);
	});
	it("Intersects: another rectangle is inside another", () => {
		expect(rect(1, 1, 6, 4)).toBe(true);
	});
	it("Intersects: another rectangle is just the same", () => {
		expect(rect(0, 0, 8, 6)).toBe(true);
	});
});
describe("Circle containment", () => {
	const fn = (x1: number, y1: number, r: number) => (x2: number, y2: number) => {
		const circle = new Circle(x1, y1, r);
		const point = new Point(x2, y2);
		return circle.contains(point);
	};

	const point = fn(10, 10, 6);

	it("Does not contain the point: it is too far above", () => {
		expect(point(10, 2)).toBe(false);
		expect(point(6, 4)).toBe(false);
		expect(point(14, 4)).toBe(false);
	});
	it("Does not contain the point: it is too far right", () => {
		expect(point(17, 10)).toBe(false);
		expect(point(16, 8)).toBe(false);
		expect(point(16, 12)).toBe(false);
	});
	it("Does not contain the point: it is too far bottom", () => {
		expect(point(10, 17)).toBe(false);
		expect(point(8, 16)).toBe(false);
		expect(point(12, 16)).toBe(false);
	});
	it("Does not contain the point: it is too far left", () => {
		expect(point(3, 10)).toBe(false);
		expect(point(4, 8)).toBe(false);
		expect(point(4, 12)).toBe(false);
	});
	it("Contains the point: it is at the top edge", () => {
		expect(point(10, 4)).toBe(true);
	});
	it("Contains the point: it is at the right edge", () => {
		expect(point(16, 10)).toBe(true);
	});
	it("Contains the point: it is at the bottom edge", () => {
		expect(point(10, 16)).toBe(true);
	});
	it("Contains the point: it is at the left edge", () => {
		expect(point(4, 10)).toBe(true);
	});
	it("Contains the point: it is at the 1st quadrant", () => {
		expect(point(14, 6)).toBe(true);
		expect(point(12, 6)).toBe(true);
		expect(point(12, 8)).toBe(true);
		expect(point(14, 8)).toBe(true);
	});
	it("Contains the point: it is at the 2nd quadrant", () => {
		expect(point(8, 6)).toBe(true);
		expect(point(6, 6)).toBe(true);
		expect(point(6, 8)).toBe(true);
		expect(point(8, 8)).toBe(true);
	});
	it("Contains the point: it is at the 3rd quadrant", () => {
		expect(point(8, 12)).toBe(true);
		expect(point(6, 12)).toBe(true);
		expect(point(6, 14)).toBe(true);
		expect(point(8, 14)).toBe(true);
	});
	it("Contains the point: it is at the 4th quadrant", () => {
		expect(point(14, 12)).toBe(true);
		expect(point(12, 12)).toBe(true);
		expect(point(12, 14)).toBe(true);
		expect(point(14, 14)).toBe(true);
	});
	it("Contains the point: it is at the center", () => {
		expect(point(10, 10)).toBe(true);
	});
});
describe("Circle Intersection", () => {
	const fn = (x2: number, y2: number, w: number, h: number) => (x1: number, y1: number, r1: number) => {
		const a = new Circle(x1, y1, r1);
		const b = new Rectangle(x2, y2, w, h);
		return a.intersects(b);
	};

	const circle = fn(-4, 3, 8, 6);

	it("Does not intersect: too far, up", () => {
		expect(circle(-2, 6, 2)).toBe(false);
		expect(circle(0, 6, 2)).toBe(false);
		expect(circle(2, 6, 2)).toBe(false);
	});
	it("Does not intersect: too far, right", () => {
		expect(circle(7, 1, 2)).toBe(false);
		expect(circle(7, 0, 2)).toBe(false);
		expect(circle(7, -1, 2)).toBe(false);
	});
	it("Does not intersect: too far, bottom", () => {
		expect(circle(2, -6, 2)).toBe(false);
		expect(circle(0, -6, 2)).toBe(false);
		expect(circle(-2, -6, 2)).toBe(false);
	});
	it("Does not intersect: too far, left", () => {
		expect(circle(-8, 2, 2)).toBe(false);
		expect(circle(-8, 0, 2)).toBe(false);
		expect(circle(-8, -2, 2)).toBe(false);
	});
	it("Does not intersect: at the edge, up", () => {
		expect(circle(-2, 6, 3)).toBe(false);
		expect(circle(0, 6, 3)).toBe(false);
		expect(circle(2, 6, 3)).toBe(false);
	});
	it("Does not intersect: at the edge, right", () => {
		expect(circle(7, 1, 3)).toBe(false);
		expect(circle(7, 0, 3)).toBe(false);
		expect(circle(7, -1, 3)).toBe(false);
	});
	it("Does not intersect: at the edge, bottom", () => {
		expect(circle(2, -6, 3)).toBe(false);
		expect(circle(0, -6, 3)).toBe(false);
		expect(circle(-2, -6, 3)).toBe(false);
	});
	it("Does not intersect: at the edge, left", () => {
		expect(circle(-8, 2, 3)).toBe(false);
		expect(circle(-8, 0, 3)).toBe(false);
		expect(circle(-8, -2, 3)).toBe(false);
	});
	it("Does not intersect: at the corner top-right", () => {
		expect(circle(6, 5, 2 * Math.SQRT2 * 0.999)).toBe(false);
		expect(circle(5, 4, Math.SQRT2 * 0.999)).toBe(false);
	});
	it("Does not intersect: at the corner bottom-right", () => {
		expect(circle(6, -5, 2 * Math.SQRT2 * 0.999)).toBe(false);
		expect(circle(5, -4, Math.SQRT2 * 0.999)).toBe(false);
	});
	it("Does not intersect: at the corner bottom-left", () => {
		expect(circle(-6, -5, 2 * Math.SQRT2 * 0.999)).toBe(false);
		expect(circle(-5, -4, Math.SQRT2 * 0.999)).toBe(false);
	});
	it("Does not intersect: at the corner top-left", () => {
		expect(circle(-6, 5, 2 * Math.SQRT2 * 0.999)).toBe(false);
		expect(circle(-5, 4, Math.SQRT2 * 0.999)).toBe(false);
	});
	it("Does intersect: circle is inside entirely, center is inside at 1st quadrant", () => {
		expect(circle(2, 1.5, 1)).toBe(true);
	});
	it("Does intersect: circle is inside entirely, center is inside at 2nd quadrant", () => {
		expect(circle(-2, 1.5, 1)).toBe(true);
	});
	it("Does intersect: circle is inside entirely, center is inside at 3rd quadrant", () => {
		expect(circle(-2, -1.5, 1)).toBe(true);
	});
	it("Does intersect: circle is inside entirely, center is inside at 4th quadrant", () => {
		expect(circle(2, -1.5, 1)).toBe(true);
	});
	it("Does intersect: circle is inside entirely, center touches the edge at 1st quadrant", () => {
		expect(circle(2, 1.5, 1.5)).toBe(true);
		expect(circle(2, 1.5, 2)).toBe(true);
	});
	it("Does intersect: circle is inside entirely, center touches the edge at 2nd quadrant", () => {
		expect(circle(-2, 1.5, 1.5)).toBe(true);
		expect(circle(-2, 1.5, 2)).toBe(true);
	});
	it("Does intersect: circle is inside entirely, center touches the edge at 3rd quadrant", () => {
		expect(circle(-2, -1.5, 1.5)).toBe(true);
		expect(circle(-2, -1.5, 2)).toBe(true);
	});
	it("Does intersect: circle is inside entirely, center touches the edge at 4th quadrant", () => {
		expect(circle(2, -1.5, 1.5)).toBe(true);
		expect(circle(2, -1.5, 2)).toBe(true);
	});
	it("Does intersect: circle's center is inside, but it is larger than boundary", () => {
		expect(circle(2, 1.5, 4)).toBe(true);
		expect(circle(-2, 1.5, 4)).toBe(true);
		expect(circle(-2, -1.5, 4)).toBe(true);
		expect(circle(2, -1.5, 4)).toBe(true);
		expect(circle(0, 0, 10)).toBe(true);
	});
});
