export function isNullable(value: unknown): value is null | undefined {
	return value === null || typeof value === "undefined";
}

export function isNotNullable<T>(value: null | T | undefined): value is T {
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

export function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.length > 0;
}

export function isClient() {
	return !isNullable(globalThis.window);
}
