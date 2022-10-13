import { describe, expect, it } from "vitest";
import { arabic2romans } from "./romans";

const cases: Array<[ arabic: number, roman: string ]> = [
	[ 1, "I" ],
	[ 2, "II" ],
	[ 3, "III" ],
	[ 4, "IV" ],
	[ 5, "V" ],
	[ 6, "VI" ],
	[ 7, "VII" ],
	[ 8, "VIII" ],
	[ 9, "IX" ],
	[ 10, "X" ],
	[ 11, "XI" ],
	[ 12, "XII" ],
	[ 13, "XIII" ],
	[ 14, "XIV" ],
	[ 15, "XV" ],
	[ 16, "XVI" ],
	[ 17, "XVII" ],
	[ 18, "XVIII" ],
	[ 19, "XIX" ],
	[ 20, "XX" ],
	[ 30, "XXX" ],
	[ 40, "XL" ],
	[ 50, "L" ],
	[ 60, "LX" ],
	[ 70, "LXX" ],
	[ 80, "LXXX" ],
	[ 90, "XC" ],
	[ 100, "C" ],
	[ 200, "CC" ],
	[ 300, "CCC" ],
	[ 400, "CD" ],
	[ 500, "D" ],
	[ 600, "DC" ],
	[ 700, "DCC" ],
	[ 800, "DCCC" ],
	[ 900, "CM" ],
	[ 1000, "M" ],
	[ 2000, "MM" ],
	[ 3000, "MMM" ],
	[ 3999, "MMMCMXCIX" ]
];

describe("Arabic to Romans numerals conversion", () => {
	for(const [ input, output ] of cases) {
		it(`Convert ${input} to ${output}`, () => {
			expect(arabic2romans(input)).toBe(output);
		});
	}
});
