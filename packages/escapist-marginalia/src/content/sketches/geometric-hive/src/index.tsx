import { createRenderSignal, Sketch, SketchProvider } from "sketch";

import { SketchForm } from "./geometric-hive.form";
import { ModelProvider } from "./geometric-hive.model";
import { sketch } from "./geometric-hive.render";

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
