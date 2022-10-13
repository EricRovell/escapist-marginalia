import { describe, expect, it } from "vitest";
import { generateIndexes } from "./pagination.helpers";

const cases = [
	{
		description: "Current page at the beginning, pages fit in limits",
		input: {
			current: 1,
			start: 1,
			end: 10,
			limit: 10,
			siblings: 1
		},
		output: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
	},
	{
		description: "Current page at the end, pages fit in limits",
		input: {
			current: 10,
			start: 1,
			end: 10,
			limit: 10,
			siblings: 1
		},
		output: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
	},
	{
		description: "Current page in between, pages fit in limits",
		input: {
			current: 5,
			start: 1,
			end: 10,
			limit: 10,
			siblings: 1
		},
		output: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
	},
	{
		description: "Current page at the beginning, pages does not fit in limits",
		input: {
			current: 1,
			start: 1,
			end: 10,
			limit: 5,
			siblings: 1
		},
		output: [ 1, 2, 3, 4, 5, -1, 10 ]
	},
	{
		description: "Current page at the end, pages does not fit in limits",
		input: {
			current: 10,
			start: 1,
			end: 10,
			limit: 5,
			siblings: 1
		},
		output: [ 1, -1, 6, 7, 8, 9, 10 ]
	},
	{
		description: "Current page in between, pages does not fit in limits",
		input: {
			current: 5,
			start: 1,
			end: 10,
			limit: 5,
			siblings: 1
		},
		output: [ 1, -1, 4, 5, 6, -1, 10 ]
	}
];

describe("Pagination index generator helper", () => {
	for (const { description, input, output } of cases) {
		it(description, () => {
			expect(generateIndexes(input)).toEqual(output);
		});
	}
});
