import type { Action } from "../types";

interface TouchData {
	touches: Touch[];
	pinchDistance: number;
	lastEvent: Touch | null;
}

/**
 * Creates panStart, panMove, panEnd events so you can drag elements.
 */
export const pannable: Action = (node) => {
	let scale = 1;
	let x = 0;
	let y = 0;
	let zoomTimeout: number | null = null;

	const touchData: TouchData = {
		touches: [],
		pinchDistance: 0,
		lastEvent: null
	};

	function handleMousedown(event: MouseEvent) {
		node.style.cursor = "all-scroll";
		node.setAttribute("draggable", "false");
		node.dispatchEvent(new CustomEvent("panstart", {
			detail: {
				x: event.clientX,
				y: event.clientY
			}
		}));

		window.addEventListener("mousemove", handleMousemove);
		window.addEventListener("mouseup", handleMouseup);
	}

	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		const delta = 0.3 *  Math.sign(-1 * event.deltaY);
		scale = Math.min(Math.max(0.85, scale + delta), 4);

		if (zoomTimeout) {
			window.clearTimeout(zoomTimeout);
		}

		if (scale < 1) {
			zoomTimeout = window.setTimeout(resetScale, 150);
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

	function handleMousemove(event: MouseEvent) {
		x += event.movementX / scale;
		y += event.movementY / scale;

		node.dispatchEvent(new CustomEvent("panmove", {
			detail: { x, y, spring: false }
		}));
	}

	function handleMouseup(event: MouseEvent) {
		recenter();

		node.style.cursor = "unset";
		node.removeAttribute("draggable");
		node.dispatchEvent(new CustomEvent("panend", {
			detail: {
				x: event.clientX,
				y: event.clientY
			}
		}));
		node.dispatchEvent(new CustomEvent("panmove", {
			detail: { x, y, spring: true }
		}));

		window.removeEventListener("mousemove", handleMousemove);
		window.removeEventListener("mouseup", handleMouseup);
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

	function handleTouchstart(event: TouchEvent) {
		if (event.touches.length == 2) {
			for (let i = 0; i < event.touches.length; i++) {
				touchData.touches.push(event.touches[i]);
			}
		}
	}

	const pointsDistance = (p1: Touch, p2: Touch) => {
		const a = Math.abs(p1.clientX - p2.clientX);
		const b = Math.abs(p1.clientY - p2.clientY);
		return Math.sqrt(a ** 2 + b ** 2);
	};

	function handleTouchmove(event: TouchEvent) {
		//event.preventDefault();

		if (event.touches.length == 1 && event.changedTouches.length == 1) {
			if (!touchData.lastEvent) {
				touchData.lastEvent = event.changedTouches[0];
			}

			const diffX = event.changedTouches[0].clientX - touchData.lastEvent.clientX;
			const diffY = event.changedTouches[0].clientY - touchData.lastEvent.clientY;

			x += diffX / scale;
			y += diffY / scale;

			node.dispatchEvent(new CustomEvent("panmove", {
				detail: { x, y, spring: false }
			}));

			touchData.lastEvent = event.changedTouches[0];
		}

		if (event.touches.length == 2 && event.changedTouches.length == 2) {
			// Check if the two target touches are the same ones that started the 2-touch
			let point1 = -1;
			let point2 = -1;

			for (let i = 0; i < touchData.touches.length; i++) {
				if (touchData.touches[i].identifier == event.touches[0].identifier) {
					point1 = i;
				}
				if (touchData.touches[i].identifier == event.touches[1].identifier) {
					point2 = i;
				}
			}

			if (point1 >= 0 && point2 >= 0) {
				// Calculate the difference between the start and move coordinates
				const dist1 = pointsDistance(touchData.touches[point1], touchData.touches[point2]);
				const dist2 = pointsDistance(event.touches[0], event.touches[1]);

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
		if (scale < 1.05) {
			resetScale();
		}
		recenter();
	}

	window.addEventListener("wheel", handleWheel, { passive: false });
	node.addEventListener("mousedown", handleMousedown);	
	node.addEventListener("touchstart", handleTouchstart, { passive: true });
	node.addEventListener("touchmove", handleTouchmove, { passive: true });
	node.addEventListener("touchend", handleTouchend, { passive: true });

	return {
		destroy() {
			window.removeEventListener("wheel", handleWheel);
			node.removeEventListener("mousedown", handleMousedown);
			node.removeEventListener("touchstart", handleTouchstart);
			node.removeEventListener("touchmove", handleTouchmove);
			node.removeEventListener("touchend", handleTouchend);
		}
	};
};
