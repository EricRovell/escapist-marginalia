/**
 * Prevents the page scroll depending on condition.
 */
export function preventPageScroll(condition: boolean) {
	if (!globalThis.window) {
		return;
	}

	if (condition) {
		// prevent page scroll, mostly for safari hack
		document.body.style.cssText = `
			top: -${window.scrollY}px;
			position: fixed;
			overflow-y: scroll;
			overscroll-behavior: none;
		`;

		return;
	}

	const scrollY: number = parseInt(document.body.style.top || "0");
	document.body.style.cssText = "";
	window.scrollTo({
		top: -1 * scrollY,
		behavior: "auto"
	});
}

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

/**
 * Shares a data using `Web Share API` if supported.
 */
export async function share(data: ShareData): Promise<boolean> {
	if (!navigator.share || !navigator.canShare) {
		return false;
	}

	if (!navigator.canShare(data)) {
		console.error("Specified data cannot be shared.");
		return false;
	}

	try {
		await navigator.share(data);
		return true;
	} catch (error) {
		console.error(`Sharing was unsuccessful: ${error}`);
		return false;
	}
}
