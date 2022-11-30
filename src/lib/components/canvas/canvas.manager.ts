import type { Renderer, LayerRenderers, CanvasRender } from "./canvas.types";

export class RenderManager {
	drawMap: Map<string, Renderer>;
	frameId: number;
	params: CanvasRender;
	setupMap: Map<string, Renderer>;
	shouldRedraw: boolean;
	shouldResize: boolean;
	shouldSetup: boolean;

	constructor() {
		this.drawMap = new Map();
		this.frameId;
		this.params;
		this.setupMap = new Map();
		this.shouldRedraw = true;
		this.shouldResize = true;
		this.shouldSetup = false;
	}

	get staticCanvas() {
		return this.drawMap.size === 0;
	}

	clear({ context, height, pixelRatio, width }: Omit<CanvasRender, "autoclear" | "loop" | "frameRate">) {
		context.save();
		context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		context.clearRect(0, 0, width, height);
		context.restore();
	}

	draw({ context, height, width }) {
		for (const draw of this.drawMap.values()) {
			draw({ context, height, width });
		}

		this.shouldRedraw = this.params.loop;
	}

	register(id: string, { draw, setup }: LayerRenderers = {}) {
		if (setup) {
			this.setupMap.set(id, setup);
			this.shouldSetup = true;
		}

		if (draw) {
			this.drawMap.set(id, draw);
		}

		cancelAnimationFrame(this.frameId);

		this.shouldRedraw = true;
		this.frameId = requestAnimationFrame(() => this.render(this.params));
	}

	render({ autoclear, context, loop, height, pixelRatio, width }: CanvasRender) {
		//console.log("raf");
		if (this.shouldResize) {
			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			this.shouldResize = false;
		}

		if (this.shouldRedraw && autoclear) {
			this.clear({ context, height, pixelRatio, width });
		}

		if (this.shouldSetup) {
			this.setup({ context, height, width });
		}

		if (this.shouldRedraw) {
			this.draw({ context, height, width });
		}

		if (this.staticCanvas) {
			return;
		}

		if (loop) {
			this.frameId = requestAnimationFrame(() => {
				this.render(this.params);
			});
		}
	}

	resize() {
		this.shouldResize = true;
		this.shouldSetup = true;
		cancelAnimationFrame(this.frameId);
	}

	setParams(params: CanvasRender) {
		this.params = params;
		this.shouldRedraw = true;
		this.frameId = requestAnimationFrame(() => this.render(this.params));
	}

	setup({ context, height, width }) {
		for (const setup of this.setupMap.values()) {
			setup({ context, height, width });
		}

		this.shouldSetup = false;
	}

	stop() {
		this.clear(this.params);
		if (this.frameId) {
			cancelAnimationFrame(this.frameId);
		}
	}

	unregister(id: string): void {
		this.setupMap.delete(id);
		this.drawMap.delete(id);
		this.shouldRedraw = true;
		cancelAnimationFrame(this.frameId);
		this.frameId = requestAnimationFrame(() => this.render(this.params));
	}
}
