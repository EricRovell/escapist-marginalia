type Matcher<T> = (value: T) => boolean;

/**
 * Describes a query option:
 *
 * - value;
 * - validator: validates a query option value;
 * - matcher: a curried function to match an item.
 */
export interface QueryItem<T, Item> {
	value?: T;
	validator: (value: T) => boolean;
	matcher: (value: T) => Matcher<Item>;
}

export interface Query<T> {
	[key: string]: QueryItem<unknown, T>;
}

export interface QueryOptions<T> {
	limit?: number;
	sort?: (a: T, b: T) => 1 | -1;
}

/**
 * Filters an array of items depending on a query.
 */
export function find<T>(items: T[], query: Query<T>, { limit, sort }: QueryOptions<T> = {}) {
	let result: T[] = [];
	const matchers: Matcher<T>[] = [];

	for (const key of Object.keys(query)) {
		const { value, validator, matcher } = query[key];
		if (validator(value)) {
			matchers.push(matcher(value));
		}
	}

	result = items.filter(item => {
		for (const matcher of matchers) {
			if (!matcher(item)) return false;
		}

		return true;
	});

	if (sort) {
		result.sort((a, b) => sort(a, b));
	}

	return limit
		? result.slice(0, limit)
		: result;
}