/**
 * Groups list of objects by common key.
 *
 * This implementation:
 *
 * - The key getter function used for TS inferring capabilities inorder to avoid typing the generic every use.
 * - By using the `K extends keyof any` type constraint, we are telling the TS
 * 	 that the key being used needs to be something that can be a `key string | number | symbol`;
 */
export function groupBy<T, K extends keyof unknown>(items: T[], getKey: (item: T) => K): Record<K, T[]> {
	return items.reduce((previous, current) => {
		const group = getKey(current);

		if (!previous[group]) {
			previous[group] = [];
		}

		previous[group].push(current);
		return previous;
	}, {} as Record<K, T[]>);
}
