import { createRenderSignal, Sketch, SketchProvider } from "sketch";

import { SketchForm } from "./the-attractor.form";
import { ModelProvider } from "./the-attractor.model";
import { sketch } from "./the-attractor.render";

export default function View() {
	const { getSketch, resetSketch } = createRenderSignal(sketch);

	return (
		<ModelProvider>
			<SketchProvider>
				<Sketch createSketch={getSketch()} />
				<SketchForm onReset={resetSketch} />
			</SketchProvider>
		</ModelProvider>
	);
}
