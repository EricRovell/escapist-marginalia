/**
 * Fetches a JSON from specific URL.
 */
export async function fetchJSON<T>(url: string, options: RequestInit = {}): Promise<T> {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`An error has occured: ${response.status}`);
		}

		const json: T = await response.json();
		return json;
	} catch(error) {
		console.error(error.message);
	}
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
 * Prevents the page scroll depending on condition.
 */
export function preventPageScroll(condition: boolean) {
	// SSR check
	if (!globalThis.window) return;
		
	if (condition) {
		// prevent page scroll, mostly for safari hack
		document.body.style.cssText = `
			top: -${window.scrollY}px;
			position: fixed;
			overflow-y: scroll;
			overscroll-behavior: none;
		`;
	} else {
		const scrollY: number = parseInt(document.body.style.top as string || "0");
		document.body.style.cssText = "";
		window.scrollTo({
			top: -1 * scrollY,
			behavior: "auto"
		});
	}
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
		console.error(`Sharing was unsuccessful: ${error.message}`);
		return false;
	}
}

/**
 * Derives an array of sequental numbers.
 */
export const range = (start: number, end: number) => {
	const size = end - start + 1;
	return [...Array(size).keys()].map((i) => i + start);
};

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
