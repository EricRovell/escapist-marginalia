import type { Action } from "../../types";

/**
 * Creates panStart, panMove, panEnd events so you can drag elements.
 * 
 * Demo: https://svelte.dev/tutorial/actions
 * 
 */
export function pannable(node: HTMLElement): ReturnType<Action> {
	let x: number;
	let y: number;

	function handleMousedown(event: MouseEvent) {
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(new CustomEvent("panstart", {
			detail: { x, y }
		}));

		window.addEventListener("pointermove", handleMousemove);
		window.addEventListener("pointerup", handleMouseup);
	}

	function handleMousemove(event: MouseEvent) {
		const dx = event.clientX - x;
		const dy = event.clientY - y;
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(new CustomEvent("panmove", {
			detail: { x, y, dx, dy }
		}));
	}

	function handleMouseup(event: MouseEvent) {
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(new CustomEvent("panend", {
			detail: { x, y }
		}));

		window.removeEventListener("pointermove", handleMousemove);
		window.removeEventListener("pointerup", handleMouseup);
	}

	node.addEventListener("pointerdown", handleMousedown);

	return {
		destroy() {
			node.removeEventListener("pointerdown", handleMousedown);
		}
	};
}