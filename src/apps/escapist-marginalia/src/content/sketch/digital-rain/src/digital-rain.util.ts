import { randomNumberFromRanges } from "utils/random";

const charcodes = {
	digits: [ 48, 57 ],
	math: [ 8704, 8959 ],
	uppercaseLetters: [ 65, 90 ],
	katakana: [ 12449, 12538 ]
};

export const getRandomChar = (options: Array<keyof typeof charcodes>): string => {
	const codes = [];

	for (const option of options) {
		codes.push(charcodes[option]);
	}

	const charcode = randomNumberFromRanges(...codes);
	return String.fromCharCode(charcode);
};
