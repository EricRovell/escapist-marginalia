import type { Renderer } from "ui";

interface SketchReturn<Options = undefined> {
	draw: Renderer;
	setup: Renderer;
	update: (options?: Options) => void;
}

export type Sketch<Options> = (options?: Options) => SketchReturn<Options>;
