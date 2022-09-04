export interface RenderArguments {
	context: CanvasRenderingContext2D;
	height: number;
	width: number;
}

export interface CanvasRender extends RenderArguments {
	autoclear: boolean;
	pixelRatio: number;
}

export type Renderer = (args: RenderArguments) => void;

export interface LayerRenderers {
	setup?: Renderer;
	draw?: Renderer;
}

export interface LayerParams extends LayerRenderers {
	id: string;
}

export type { RenderManager } from "./canvas.manager";