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
