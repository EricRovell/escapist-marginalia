import type { Action } from "./types";

export interface Config {
	active: boolean;
	selector: string;
}

/* const defaultSelector = [
	"a[href]",
	"button",
	"textarea",
	"input[type=text]",
	"input[type=radio]",
	"input[type=checkbox]",
	"select"
].reduce((acc, curr) => `${acc}, ${curr}:not([disabled])`); */

/**
 * Activates callback when user clicks outside a given element.
 */
export const trapFocus: Action<Config> = (node, options) => {
	const elements = node.querySelectorAll(options.selector);
	const firstFocusable = elements[0] as HTMLElement;
	const lastFocusable = elements[elements.length - 1] as HTMLElement;

	const handleFocus = (e: KeyboardEvent) => {
		if (e.key !== "Tab") {
			return;
		}

		if (e.shiftKey) {
			if (document.activeElement === firstFocusable) {
				lastFocusable.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusable) {
				firstFocusable.focus();
				e.preventDefault();
			}
		}
	};

	const setHandler = (active: boolean) => {
		if (active) {
			node.addEventListener("keydown", handleFocus);
		} else {
			node.removeEventListener("keydown", handleFocus);
		}
	};

	return {
		update(newOptions) {
			// "selector" is not reactive
			if (options.active === newOptions.active) {
				return;
			}

			options = newOptions;
			setHandler(options.active);
		},
		destroy() {
			setHandler(false);
		}
	};
};
