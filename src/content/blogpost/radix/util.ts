import { range } from "@utils/helpers";
import type { Decoder } from "@ericrovell/radix";

/**
 * Decodes the string into numeral representation according to the radix (numeral base).
 * 1 ... 10, A ... Z
 * Supports radix value up till 36.
 */
export const decoder: Decoder = (char: string) => {
	const code = char.toString().toLowerCase().charCodeAt(0);

	// number 0 ... 9
	if (code >= 48 && code <= 57) {
		return code - 48;
	}

	// letter a ... z
	if (code >= 97 && code <= 122) {
		return code - 87;
	}
};

/**
 * Constructs a regular expression for latin-letter based numerals for bases between 2 ... 36.
 */
export const buildPattern = (radix: number) => {
	if (radix > 1 && radix <= 10) {
		return new RegExp(`^[0-${radix - 1}]+$`, "i");
	} else if (radix === 11) {
		return new RegExp("^[0-9a]+$", "i");
	} else if (radix > 11 && radix < 37) {
		return new RegExp(`^[0-9a-${String.fromCharCode(86 + radix)}]+$`, "i");
	} else {
		return null;
	}
};

/**
 * Generates a latin-letter (base 36) alphabet for a given radix.
 */
export const radix36 = (radix: number) => {
	if (radix < 2 || radix > 36) {
		return [];
	}

	return Array.from(range(0, radix))
		.map(value => {
			if (value < 10) return value;
			return String.fromCharCode(value + 55);
		});
};
