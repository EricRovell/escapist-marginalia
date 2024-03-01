import type { Renderer } from "@components/canvas";

interface SketchReturn<Options = undefined> {
	draw: Renderer;
	setup: Renderer;
	update: (options?: Options) => void;
}

export type Sketch<Options> = (options?: Options) => SketchReturn<Options>;
