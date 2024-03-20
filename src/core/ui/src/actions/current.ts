import type { Action } from "../types";

export interface Options {
	pattern: RegExp | string;
	pathname: string;
}

/**
 * Action for marking active links via "aria-current" attribute.
 * 
 * Important: `pathname` is used as $page.url.pathname instead of location
 * for reactivity purposes (to restart the action on:navigate).
 */
export const current: Action<Options> = (node, options) => {
	/**
	 * We cannot pass the action inside the component,
	 * this might help to get the node through wrapper.
	 */
	const anchor = node.nodeName === "A"
		? node
		: node.firstElementChild;

	const test = ({ pathname, pattern }: Options) => {
		if (pattern instanceof RegExp) {
			return pattern.test(pathname);
		}

		if (typeof pattern === "string") {
			return pattern === pathname;
		}
	};

	function markAnchor(element: Element | null ,options: Options): void {
		if (!element) {
			return;
		}

		test(options)
			? element.setAttribute("aria-current", "page")
			: element.removeAttribute("aria-current");
	}
	
	markAnchor(anchor, options);
	
	return {
		update(options) {
			markAnchor(anchor, options);
		}
	};
};
