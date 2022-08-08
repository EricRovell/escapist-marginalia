import type { Action } from "../../types";

/**
 * Creates panStart, panMove, panEnd events so you can drag elements.
 */
export function pannable(node: HTMLElement): ReturnType<Action> {
	let scale = 1;
	let x = 0;
	let y = 0;
	let zoomTimeout: null | number = null;

	const touchData = {
		touches: [],
		pinchDistance: 0,
		lastEvent: null,
	};

	function handleMousedown(event: MouseEvent) {
		node.style.cursor = "all-scroll";

		node.dispatchEvent(new CustomEvent("panstart", {
			detail: {
				x: event.clientX,
				y: event.clientY
			}
		}));

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", handlePointerUp);
	}

	function handleWheel(event: WheelEvent) {
		const zoomStep = 0.3;
		event.preventDefault();
		const delta = Math.sign(-1 * event.deltaY) * zoomStep;
		scale = Math.min(Math.max(0.75, scale + delta), 4);

		if (zoomTimeout) {
			window.clearTimeout(zoomTimeout);
		}

		if (scale < 1) {
			zoomTimeout = window.setTimeout(resetScale, 125);
		}

		recenter();

		node.dispatchEvent(new CustomEvent("panmove", {
			detail: { x, y, spring: true }
		}));

		node.dispatchEvent(new CustomEvent("zoomchange", {
			detail: { scale, spring: true }
		}));
	}

	function resetScale() {
		scale = 1;
		node.dispatchEvent(new CustomEvent("zoomchange", {
			detail: { scale, spring: true }
		}));
	}

	function handlePointerMove(event: PointerEvent) {
		x += event.movementX / scale;
		y += event.movementY / scale;

		node.dispatchEvent(new CustomEvent("panmove", {
			detail: { x, y, spring: false }
		}));
	}

	function handlePointerUp(event: PointerEvent) {
		node.style.cursor = "unset";
		recenter();

		node.dispatchEvent(new CustomEvent("panend", {
			detail: {
				x: event.clientX,
				y: event.clientY
			}
		}));

		node.dispatchEvent(new CustomEvent("panmove", {
			detail: {x, y, spring: true}
		}));

		window.removeEventListener("pointermove", handlePointerMove);
		window.removeEventListener("pointerup", handlePointerUp);
	}

	function recenter() {
		const w = node.clientWidth * scale;
		const h = node.clientHeight * scale;
		const dw = w - window.innerWidth;
		const dh = h - window.innerHeight;

		if (dw > 0) {
			if (Math.abs(x * scale) > dw / 2) {
				x = dw / 2 / scale * Math.sign(x);
			}
		} else {
			x = 0;
		}

		if (dh > 0) {
			if (Math.abs(y * scale) > dh / 2) {
				y = dh / 2 / scale * Math.sign(y);
			}
		} else {
			y = 0;
		}

		node.dispatchEvent(new CustomEvent("panmove", {
			detail: { x, y, spring: true }
		}));
	}

	function handleTouchstart(e: TouchEvent) {
		if (e.touches.length == 2) {
			touchData.touches.push(e.touches[0]);
			touchData.touches.push(e.touches[1]);
		}
	}

	const calcDistance = (p1: Touch, p2: Touch) => (
		Math.sqrt(Math.abs(p1.clientX - p2.clientX) ** 2 + Math.abs(p1.clientY - p2.clientY) ** 2)
	);

	function handleTouchmove(e: TouchEvent) {
		e.preventDefault();

		if (e.touches.length == 1 && e.changedTouches.length == 1) {
			if (!touchData.lastEvent) {
				touchData.lastEvent = e.changedTouches[0];
			}

			const dx = e.changedTouches[0].clientX - touchData.lastEvent.clientX;
			const dy = e.changedTouches[0].clientY - touchData.lastEvent.clientY;

			x += dx / scale;
			y += dy / scale;

			node.dispatchEvent(new CustomEvent("panmove", {
				detail: { x, y, spring: false }
			}));

			touchData.lastEvent = e.changedTouches[0];
		}

		if (e.touches.length == 2 && e.changedTouches.length == 2) {
		// Check if the two target touches are the same ones that started the 2-touch
			let point1 = -1, point2 = -1;

			for (let i = 0; i < touchData.t.length; i++) {
				if (touchData.touches[i].identifier == e.touches[0].identifier) {
					point1 = i;
				}
				if (touchData.touches[i].identifier == e.touches[1].identifier) {
					point2 = i;
				}
			}

			if (point1 >= 0 && point2 >= 0) {
				// Calculate the difference between the start and move coordinates
				const dist1 = calcDistance(touchData.touches[point1], touchData.touches[point2]);
				const dist2 = calcDistance(e.touches[0], e.touches[1]);

				if (touchData.pinchDistance === 0) {
					touchData.pinchDistance = dist1;
				}

				const diff = touchData.pinchDistance - dist2;
				touchData.pinchDistance = dist2;
				scale = Math.min(Math.max(1, scale - diff / 100), 4);

				node.dispatchEvent(new CustomEvent("zoomchange", {
					detail: {scale, spring: false}
				}));

			}	else {
				touchData.touches = [];
				touchData.pinchDistance = 0;
			}
		}
	}

	function handleTouchend() {
		touchData.pinchDistance = 0;
		touchData.lastEvent = null;

		if (scale < 1.02) {
			resetScale();
		}

		recenter();
	}
	
	window.addEventListener("wheel", handleWheel, { passive: false });
	node.addEventListener("pointerdown", handleMousedown);
	node.addEventListener("touchstart", handleTouchstart, { passive: true });
	node.addEventListener("touchmove", handleTouchmove, { passive: true });
	node.addEventListener("touchend", handleTouchend, { passive: true });

	return {
		destroy() {
			window.clearTimeout(zoomTimeout);
			window.removeEventListener("wheel", handleWheel);
			node.removeEventListener("pointerdown", handleMousedown);
			node.removeEventListener("touchstart", handleTouchstart);
			node.removeEventListener("touchmove", handleTouchmove);
			node.removeEventListener("touchend", handleTouchend);
		}
	};
}