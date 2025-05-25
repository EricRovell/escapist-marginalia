import { isNullable } from "utils/validators";

import type { CanvasRender, Renderer, Sketch } from "./canvas.types";

export function createRenderService() {
	let frameId: null | number = null;
	let params: CanvasRender = {} as CanvasRender;
	let draw: null | Renderer = null;
	let setup: null | Renderer = null;
	let shouldRedraw: boolean;
	let shouldResize: boolean;
	let shouldSetup: boolean;
	let shouldClear = true;

	function start() {
		frameId = requestAnimationFrame(() => {
			render(params);
		});
	}

	function stop() {
		if (frameId) {
			cancelAnimationFrame(frameId);
			frameId = null;
		}
	}

	function clear({ context, height, pixelRatio, width }: Omit<CanvasRender, "autoclear" | "frameRate" | "loop" | "updateParams">) {
		context.save();
		context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		context.clearRect(0, 0, width, height);
		context.restore();
	}

	function register(renderers: Sketch = {}) {
		if (renderers.setup) {
			setup = renderers.setup;
			shouldSetup = true;
		}

		if (renderers.draw) {
			draw = renderers.draw;
		}

		shouldRedraw = true;
		shouldClear = true;

		stop();
		start();
	}

	function render({ autoclear, context, height, loop, pixelRatio, width }: CanvasRender) {
		if (shouldClear) {
			clear({ context, height, pixelRatio, width });
			shouldClear = false;
		}

		if (shouldResize) {
			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			shouldResize = false;
		}

		if (shouldRedraw && autoclear) {
			clear({ context, height, pixelRatio, width });
		}

		if (shouldSetup && setup) {
			setup({ context, height, width });
			shouldSetup = false;
		}

		if (shouldRedraw && draw) {
			draw({ context, height, width });
			shouldRedraw = params.loop;
		}

		// is static canvas?
		if (isNullable(draw)) {
			return;
		}

		if (loop) {
			start();
		}
	}

	function updateParams(nextParams: Partial<CanvasRender>) {
		params = { ...params, ...nextParams };
		shouldRedraw = true;
		shouldResize = true;

		stop();
		start();
	}

	function unregister(): void {
		setup = null;
		draw = null;
		shouldRedraw = true;
		shouldSetup = true;

		stop();
	}

	function setLoop(state: boolean) {
		params.loop = state;
		shouldRedraw = true;

		stop();
		start();
	}

	return {
		clear,
		register,
		render,
		setLoop,
		unregister,
		updateParams
	};
}
