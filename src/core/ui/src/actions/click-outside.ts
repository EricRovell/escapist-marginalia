import type { Action } from "../types";

export interface Config {
	active: boolean;
	callback: (node: HTMLElement) => void;
}

/**
 * Activates callback when user clicks outside a given element.
 */
export const clickOutside: Action<Config> = (node, options) => {
	const handleClick = (e: MouseEvent) => {
		if (!node.contains(e.target as Node)) {
			options.callback(node);
		}
	};

	const setHandler = (active: boolean) => {
		if (active) {
			document.addEventListener("click", handleClick, true);
		} else {
			document.removeEventListener("click", handleClick, true);
		}
	};

	setHandler(options.active);

	return {
		update(newOptions) {
			options = newOptions; 
			setHandler(options.active);
		},
		destroy() {
			setHandler(false);
		}
	};
};
