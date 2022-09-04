import type { Renderer, LayerRenderers, CanvasRender } from "./canvas.types";

export class RenderManager {
	drawMap: Map<string, Renderer>;
	frameId: number;
	params: CanvasRender;
	setupMap: Map<string, Renderer>;
	shouldRedraw: boolean;
	shouldResize: boolean;
	shouldSetup: boolean;
	state: "pause" | "play" | "stop";

	constructor() {
		this.drawMap = new Map();
		this.frameId;
		this.params;
		this.setupMap = new Map();
		this.shouldRedraw = true;
		this.shouldResize = true;
		this.shouldSetup = false;
		this.state = "play";
	}

	get staticCanvas() {
		return this.drawMap.size === 0;
	}

	clear({ context, height, pixelRatio, width }: Omit<CanvasRender, "autoclear">) {
		context.save();
		context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		context.clearRect(0, 0, width, height);
		context.restore();
	}

	pause() {
		this.state = "pause";
		if (this.frameId) {
			cancelAnimationFrame(this.frameId);
		}
	}

	play() {
		this.state = "play";
		this.render();
	}

	redraw({ autoclear, context, height, pixelRatio, width }) {
		if (autoclear) {
			this.clear({ context, height, pixelRatio, width });
		}

		for (const draw of this.drawMap.values()) {
			draw({ context, height, width });
		}
		this.shouldRedraw = false;
	}

	register(id: string, { draw, setup }: LayerRenderers = {}) {
		if (setup) {
			this.setupMap.set(id, setup);
			this.shouldSetup = true;
		}

		if (draw) {
			this.drawMap.set(id, draw);
		}

		this.shouldRedraw = true;
		this.render();
	}

	render() {
		if (this.staticCanvas) {
			this.renderer(this.params);
		} else {
			this.frameId = requestAnimationFrame(() => {
				this.renderer(this.params);
			});
		}
	}

	renderer({ autoclear, context, height, pixelRatio, width }: CanvasRender) {
		//console.log("raf");
		if (this.shouldResize) {
			this.resize({ context, pixelRatio });
		}

		if (this.shouldSetup) {
			this.setup({ context, height, width });
		}

		if (this.shouldRedraw) {
			this.redraw({ autoclear, context, height, pixelRatio, width });
		}
	}

	resize({ context, pixelRatio }) {
		context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		this.shouldResize = false;
	}

	setParams(params: CanvasRender) {
		this.params = params;
	}

	setup({ context, height, width }) {
		for (const setup of this.setupMap.values()) {
			setup({ context, height, width });
		}
		this.shouldSetup = false;
	}

	stop() {
		this.state = "stop";
		this.clear(this.params);
		if (this.frameId) {
			cancelAnimationFrame(this.frameId);
		}
	}

	unregister(id: string): void {
		this.setupMap.delete(id);
		this.drawMap.delete(id);
		this.shouldRedraw = true;
		this.render();
	}
}
