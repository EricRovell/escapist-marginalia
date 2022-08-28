export interface RenderOptions {
	context: CanvasRenderingContext2D;
	height: number;
	width: number;
}

export type Render = (options: RenderOptions) => void;
export type { RenderManager } from "./canvas.manager";
