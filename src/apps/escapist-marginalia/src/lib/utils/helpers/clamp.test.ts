import { describe, expect, it } from "vitest";
import { clamp } from "./clamp";

describe("utility/helpers: clamp", () => {
	it("clamps the given value", () => {
		expect(clamp(5, 1, 10)).toBe(5);
		expect(clamp(-5, 1, 10)).toBe(1);
		expect(clamp(15, 1, 10)).toBe(10);
		expect(clamp(5)).toBe(1);
		expect(clamp(-5)).toBe(0);
	});
});
