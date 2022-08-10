import type { Action } from "../../types";

type Direction = "up" | "right" | "down" | "left";
type EventName = `swipe-${Direction}`;

export interface SwipeEvent {
	direction: Direction;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

interface Options {
	threshold: number;
	timeout: number;
}

const defaults: Options = {
	threshold: 25,
	timeout: 750
};

/**
 * Creates panStart, panMove, panEnd events so you can drag elements.
 */
export function swipable(node: HTMLElement, { threshold = 25, timeout = 750 }: Partial<Options> = defaults): ReturnType<Action> {
	let x: number | null = null;
	let y: number | null = null;
	let dx: number | null = null;
	let dy: number | null = null;
	let touchTime: number = null;

	function handleTouchstart(event: TouchEvent) {
		touchTime = Date.now();
		x = event.touches[0].clientX;
		y = event.touches[0].clientY;
		dx = 0;
		dy = 0;
	}

	function handleTouchmove(event: TouchEvent) {
		if (!x || !y) {
			return;
		}

		dx = x - event.touches[0].clientX;
		dy = y - event.touches[0].clientY;
	}

	function handleTouchend(event: TouchEvent) {
		const dt = Date.now() - touchTime;
		let eventType: EventName | null = null;
		const changedTouches =
			event.changedTouches ||
			event.touches ||
			[];

		if (Math.abs(dx) > Math.abs(dy)) {
			if (Math.abs(dx) > threshold && dt < timeout) {
				eventType = (dx > 0)
					? "swipe-left"
					: "swipe-right";
			}
		}

		else if (Math.abs(dy) > threshold && dt < timeout) {
			eventType = (dy > 0)
				? "swipe-up"
				: "swipe-down";
		}

		if (eventType) {
			const lastTouch = changedTouches[0];

			const [ x2, y2 ] = lastTouch
				? [ lastTouch.clientX, lastTouch.clientY ]
				: [ -1, -1 ];

			const detail = {
				direction: eventType.replace(/swipe-/, ""),
				x1: Math.round(x),
				y1: Math.round(y),
				x2,
				y2,
			};

			node.dispatchEvent(new CustomEvent("swipe", { cancelable: true, detail }));
			node.dispatchEvent(new CustomEvent(eventType, { cancelable: true, detail }));
		}

		x = null;
		y = null;
		touchTime = null;
	}

	node.addEventListener("touchstart", handleTouchstart, { passive: true });
	node.addEventListener("touchmove", handleTouchmove, { passive: true });
	node.addEventListener("touchend", handleTouchend, { passive: true });

	return {
		destroy() {
			node.removeEventListener("touchstart", handleTouchstart);
			node.removeEventListener("touchmove", handleTouchmove);
			node.removeEventListener("touchend", handleTouchend);
		}
	};
}
