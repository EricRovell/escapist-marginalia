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
