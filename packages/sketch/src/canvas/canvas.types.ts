export interface RenderArguments {
	context: CanvasRenderingContext2D;
	height: number;
	width: number;
}

export interface CanvasRender extends RenderArguments {
	autoclear: boolean;
	loop: boolean;
	pixelRatio: number;
}

export type Renderer = (args: RenderArguments) => void;

export interface Sketch {
	draw?: Renderer;
	setup?: Renderer;
}
