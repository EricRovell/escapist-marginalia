import type { RenderFunction, LayerRender, CanvasRender } from "./canvas.types";

export class RenderManager {
	drawMap: Map<string, RenderFunction>;
	setupMap: Map<string, RenderFunction>;
	shouldRedraw: boolean;
	shouldResize: boolean;
	shouldSetup: boolean;

	constructor() {
		this.drawMap = new Map();
		this.setupMap = new Map();
		this.shouldRedraw = true;
		this.shouldResize = true;
		this.shouldSetup = false;
	}

	get staticCanvas() {
		return this.drawMap.size === 0;
	}

	redraw(): void {
		this.shouldRedraw = true;
	}

	resize(): void {
		this.shouldResize = true;
		this.shouldRedraw = true;
	}

	register(id: string, { draw, setup }: LayerRender = {}) {
		if (setup) {
			this.setupMap.set(id, setup);
			this.shouldSetup = true;
		}

		if (draw) {
			this.drawMap.set(id, draw);
		}

		this.shouldRedraw = true;
	}

	unregister(id: string): void {
		this.setupMap.delete(id);
		this.drawMap.delete(id);
		this.shouldRedraw = true;
	}

	clear({ context, height, pixelRatio, width }: Omit<CanvasRender, "autoclear">) {
		context.save();
		context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		context.clearRect(0, 0, width, height);
		context.restore();
	}

	render({ autoclear, context, height, pixelRatio, width }: CanvasRender) {
		console.log("raf");

		if (this.shouldResize) {
			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			this.shouldResize = false;
		}

		if (this.shouldSetup) {
			for (const setup of this.setupMap.values()) {
				setup({ context, height, width });
			}
			this.shouldSetup = false;
		}

		if (this.shouldRedraw) {
			if (autoclear) {
				this.clear({ context, height, pixelRatio, width });
			}

			for (const draw of this.drawMap.values()) {
				draw({ context, height, width });
			}
			this.shouldRedraw = false;
		}
	}
}
