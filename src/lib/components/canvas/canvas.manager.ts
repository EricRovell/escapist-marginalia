import type { Render } from "./canvas.types";

export class RenderManager {
	drawMap: Map<string, Render>;
	setupMap: Map<string, Render>;
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

	redraw(): void {
		this.shouldRedraw = true;
	}

	resize(): void {
		this.shouldResize = true;
		this.shouldRedraw = true;
	}

	register(id: string, { draw, setup }: { draw?: Render, setup?: Render } = {}): void {
		if (setup) {
			this.setupMap.set(id, setup);
			this.shouldSetup = true;
		}

		if (draw) {
			this.drawMap.set(id, draw);
			this.shouldRedraw = true;
		}

		this.shouldRedraw = true;
	}

	unregister(id: string): void {
		this.setupMap.delete(id);
		this.drawMap.delete(id);
		this.shouldRedraw = true;
	}

	render({ context, height, width }) {
		if (this.shouldResize) {
			this.shouldResize = false;
		}

		if (this.shouldSetup) {
			for (const render of this.setupMap.values()) {
				render({ context, height, width });
			}
			this.shouldSetup = false;
		}

		if (this.shouldRedraw) {
			for (const render of this.drawMap.values()) {
				render({ context, height, width });
			}
			this.shouldRedraw = false;
		}
	}
}
