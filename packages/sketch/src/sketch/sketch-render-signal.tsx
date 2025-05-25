import { createSignal } from "solid-js";

import type { SketchConstructor } from "./sketch.types";

export function createRenderSignal(sketch: SketchConstructor) {
	const createSketch = sketch();

	const [ getSketch, setSketch ] = createSignal(() => createSketch());

	const resetSketch = () => {
		setSketch(() => () => createSketch());
	};

	return {
		getSketch,
		resetSketch
	};
}

