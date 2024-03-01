/**
 * Generates a number sequence: [ a; b ).
 */
export function* range(start: number, end?: number, step = 1): Generator<number> {
	if (typeof end === "undefined") {
		end = start;
		start = 0;
	}

	if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
		return [];
	}

	for (let i = start; step > 0 ? (i < end) : (i > end); i += step) {
		yield i;
	}
}
