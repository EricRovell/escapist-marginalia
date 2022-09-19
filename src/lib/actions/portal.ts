import { tick } from "svelte";
import type { ActionAsync } from "./types";

/**
 * Portal action
 * 
 * Renders the DOM Node into the `target` element.
 * 
 * `target` can be a HTMLElement or a css selector that points to an already existing element,
 * defaults to `body`.
 * 
 * ! Note:
 * The `hidden` attrubite on the DOM Element is needed for SSR.
 * When portal has moved to the element to it's location the attribute is removed.
 * 
 * Usage:
 * 
 * ```
 * <script>
 * 	import { portal } from "/portal.ts";
 * </script>
 * 
 * <div use:portal hidden>
 * 	<slot />
 * <div />
 * ```
 * 
 * Parameters:
 * 
 * | Name    | type                  | default | description         |
 * |:--------|:----------------------|:--------|:--------------------|
 * | target  | string OR HTMLElement | body    | The target element. |
 */
export const portal: ActionAsync<string | HTMLElement> = (element, target = "body") => {
	let targetElement: HTMLElement;
	
	async function update(nextTarget: HTMLElement | string) {
		target = nextTarget;
		
		if (typeof target === "string") {
			targetElement = document.querySelector(target);
			
			if (!targetElement) {
				await tick();
				targetElement = document.querySelector(target);
			}
			
			if (!targetElement) {
				throw new Error(`No element found matching css selector: "${target}"`);
			}
			
		} else if (target instanceof HTMLElement) {
			targetElement = target;
		} else {
			throw new TypeError("Unknown portal target type. Allowed types: string ot istance of HTMLElement");
		}
		
		targetElement.appendChild(element);
		element.hidden = false;
	}

	function destroy() {
		if (element.parentElement) {
			element.parentElement.removeChild(element);
		}
	}

	void update(target);

	return {
		update,
		destroy
	};
};
