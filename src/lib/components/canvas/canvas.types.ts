export interface RenderArguments {
	context: CanvasRenderingContext2D;
	height: number;
	width: number;
}

export interface CanvasRender extends RenderArguments {
	autoclear: boolean;
	pixelRatio: number;
}

export type RenderFunction = (args: RenderArguments) => void;

export interface LayerRender {
	setup?: RenderFunction;
	draw?: RenderFunction;
}

export type { RenderManager } from "./canvas.manager";