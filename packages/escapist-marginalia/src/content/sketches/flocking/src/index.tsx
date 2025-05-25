import { createRenderSignal, Sketch, SketchProvider } from "sketch";

import { SketchForm } from "./flocking.form";
import { ModelProvider } from "./flocking.model";
import { sketch } from "./flocking.render";

export default function View() {
	const { getSketch, resetSketch } = createRenderSignal(sketch);

	return (
		<ModelProvider>
			<SketchProvider>
				<Sketch autoclear createSketch={getSketch()} />
				<SketchForm onReset={resetSketch} />
			</SketchProvider>
		</ModelProvider>
	);
}
