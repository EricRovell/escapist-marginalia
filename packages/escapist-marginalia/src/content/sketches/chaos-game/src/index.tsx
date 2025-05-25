import { createRenderSignal, Sketch, SketchProvider } from "sketch";

import { SketchForm } from "./chaos-game.form";
import { ModelProvider } from "./chaos-game.model";
import { sketch } from "./chaos-game.render";

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
