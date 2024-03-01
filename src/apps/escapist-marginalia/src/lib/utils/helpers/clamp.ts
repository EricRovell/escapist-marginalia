/**
 * Clamps a value between an upper and lower bound.
 * NaN is clamped to the lower bound
 */
export function clamp(number: number, min = 0, max = 1): number {
	return number > max
		? max
		: number > min
			? number
			: min;
}

/**
 * Round the number up to the desired precision.
 */
export function round(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.round(number * base) / base + 0;
}
