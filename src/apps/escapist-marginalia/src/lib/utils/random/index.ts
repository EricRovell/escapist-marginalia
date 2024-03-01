/**
 * Generates a random float in range [ min, max ).
 */
export function randFloat(min: number, max: number) {
	if (max === undefined) {
		return Math.random() * min;
	}

	return Math.random() * (max - min) + min;
}

/**
 * Generates a random integer in range: [ min, max ].
 */
export function randInt(min: number, max: number) {
	const a = Math.ceil(min);
	const b = Math.floor(max);
	return Math.floor(Math.random() * (b - a + 1)) + a;
}

/**
 * Returns a random boolean value with a given chance.
 */
export function randBool(chance = 0.5) {
	return Math.random() < chance;
}

/**
 * Returns a random item from a list.
 */
export function randItem<T>(items: T[]): [T, number] {
	const randIndex = randInt(0, items.length - 1);
	return [ items[randIndex], randIndex ];
}

/**
 * Returns a random number from specified ranges.
 */
export const randomNumberFromRanges = (...items: Array<number[]>) => {
	const magnitude = Array.from(items)
		.reduce((acc, [ min, max ]) => acc + max - min + 1, 0);
	// generate random int in [ 0, total ]
	let randomInt = randInt(0, magnitude);

	// find the range this random int is located
	for (const [ min, max ] of items) {
		if (randomInt < max - min + 1) {
			return min + randomInt;
		}

		randomInt -= max - min + 1;
	}
};

/**
 * Generates a random HEX Color string in #RRGGBB format.
 */
export const randColor = (): string => {
	return "#" + [ randInt(0, 255), randInt(0, 255), randInt(0, 255) ]
		.map(item => item.toString(16).toUpperCase())
		.join("");
};
