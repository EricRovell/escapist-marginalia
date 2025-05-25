import { randomNumberFromRanges } from "utils/random";

const charcodes = {
	digits: [ 48, 57 ],
	katakana: [ 12449, 12538 ],
	math: [ 8704, 8959 ],
	uppercase_letters: [ 65, 90 ]
};

export const getRandomChar = (options: (keyof typeof charcodes)[]): string => {
	const codes = [];

	for (const option of options) {
		codes.push(charcodes[option]);
	}

	const charcode = randomNumberFromRanges(...codes);

	// @ts-expect-error TODO check func
	return String.fromCharCode(charcode);
};
