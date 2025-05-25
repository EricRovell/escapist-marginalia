import { createRenderSignal, Sketch, SketchProvider } from "sketch";

import { SketchForm } from "./digital-rain.form";
import { ModelProvider } from "./digital-rain.model";
import { sketch } from "./digital-rain.render";

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
