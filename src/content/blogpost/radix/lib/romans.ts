const dict: Array<[ arabic: number, roman: string ]> = [
	[ 1000, "M" ],
	[ 900, "CM" ],
	[ 500, "D" ],
	[ 400, "CD" ],
	[ 100, "C" ],
	[ 90, "XC" ],
	[ 50, "L" ],
	[ 40, "XL" ],
	[ 10, "X" ],
	[ 9, "IX" ],
	[ 5, "V" ],
	[ 4, "IV" ],
	[ 1, "I" ]
];

/**
 * Converts an arabic number into roman numerals representation.
 * Supports values not greater than 3999.
 */
export const arabic2romans = (number: number): string => {
	let result = "";

	if (!Number.isInteger(number) && number < 1 && number > 3999) {
		return result;
	}

	for (const [ arabic, roman ] of dict) {
		while (number >= arabic) {
			result += roman;
			number -= arabic;
		}

		if (!number) {
			break;
		}
	}

	return result;
};
