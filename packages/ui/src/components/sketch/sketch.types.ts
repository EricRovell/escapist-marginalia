import type { Renderer } from "../canvas";

interface Sketch<Options = undefined> {
	draw: Renderer;
	setup: Renderer;
	update: (options?: Options) => void;
}

export type CreateSketch<Options = undefined> = (options?: Options, pause?: VoidFunction) => Sketch<Options>;
