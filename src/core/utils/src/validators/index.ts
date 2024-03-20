export function isNullable(value: unknown): value is null | undefined {
	return value === null || typeof value === "undefined";
}

export function isNotNullable<T>(value: T | undefined | null): value is T {
	return !isNullable(value);
}

export function isRealNumber(value: unknown): value is number {
	return typeof value === "number" && !Number.isNaN(value);
}

export function isNonNegativeInteger(value: unknown): value is number {
	return (
		typeof value === "number" &&
		Number.isInteger(value) &&
		value >= 0
	);
}
