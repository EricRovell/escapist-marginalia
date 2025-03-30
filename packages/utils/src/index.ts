import { isNullable } from "./validators";

export { classnames } from "./classnames";

/**
 * Prevents the page scroll depending on condition.
 */
export function preventPageScroll(condition: boolean) {
	if (isNullable(globalThis.window)) {
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
		behavior: "auto",
		top: -1 * scrollY
	});
}

/**
 * Shares a data using `Web Share API` if supported.
 */
export async function share(data: ShareData): Promise<boolean> {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	if (isNullable(navigator.share) || isNullable(navigator.canShare)) {
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

/**
 * Sets the boolean attribute depending on state.
 */
export function setAttribute(state = false, value = "") {
	return state ? value : undefined;
}
