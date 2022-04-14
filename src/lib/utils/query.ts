type Matcher<T> = (value: T) => boolean;

/**
 * Describes a query option:
 * 
 * - value;
 * - validator: validates a query option value;
 * - matcher: a curried function to match an item.
 */
export interface QueryOption<T, Item> {
	value?: T;
	validator: (value: T) => boolean;
	matcher: (value: T) => Matcher<Item>;
}

export interface QueryOptions<T> {
	[key: string]: QueryOption<unknown, T>;
}

/**
 * Filters an array of items depending on a query.
 */
export function find<T>(query: T[], options: QueryOptions<T>) {
	const matchers: Matcher<T>[] = [];

	for (const key of Object.keys(options)) {
		const { value, validator, matcher } = options[key];
		if (value && validator(value)) {
			matchers.push(matcher(value));
		}
	}

	return query.filter(item => {
		for (const matcher of matchers) {
			if (!matcher(item)) return false;
		}

		return true;
	});
}