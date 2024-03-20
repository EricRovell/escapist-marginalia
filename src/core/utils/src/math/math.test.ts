import { describe, expect, it } from "vitest";
import { clamp, range } from "./index";

describe("utilities", () => {
	describe("utility/helpers: clamp", () => {
		it("clamps the given value", () => {
			expect(clamp(5, 1, 10)).toBe(5);
			expect(clamp(-5, 1, 10)).toBe(1);
			expect(clamp(15, 1, 10)).toBe(10);
			expect(clamp(5)).toBe(1);
			expect(clamp(-5)).toBe(0);
		});
	});
	describe("utility/math: range", () => {
		it("generates the range", () => {
			expect([ ...range(4) ]).toEqual([ 0, 1, 2, 3 ]);
			expect([ ...range(3, 6) ]).toEqual([ 3, 4, 5 ]);
			expect([ ...range(0, 10, 2) ]).toEqual([ 0, 2, 4, 6, 8 ]);
			expect([ ...range(10, 0, -1) ]).toEqual([ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]);
			expect([ ...range(8, 2, -2) ]).toEqual([ 8, 6, 4 ]);
			expect([ ...range(8, 2) ]).toEqual([]);
			expect([ ...range(8, 2, 2) ]).toEqual([]);
			expect([ ...range(1, 5, -1) ]).toEqual([]);
			expect([ ...range(1, 5, -2) ]).toEqual([]);
		});
	});
});
