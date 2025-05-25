import type { Renderer } from "../canvas";

export type { Renderer } from "../canvas";

interface Sketch {
	draw: Renderer;
	setup: Renderer;
}

export type CreateSketch = () => Sketch;
export type SketchConstructor = () => CreateSketch;
