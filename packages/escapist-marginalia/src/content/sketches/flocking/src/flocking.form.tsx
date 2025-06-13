import { InputRange, InputToggle } from "ui";

import { Fieldset, Form } from "~/layouts/sketch";

import { t } from "../translations";
import { useModel } from "./flocking.model";

interface Props {
	/**
	 * Reset renderer.
	 */
	onReset?: VoidFunction;
}

export function SketchForm(props: Props) {
	const { model, resetModel, setModel } = useModel();

	const handleReset = () => {
		resetModel();
		props.onReset?.();
	};

	return (
		<Form onReset={handleReset}>
			<Fieldset legend={t.BEHAVIOR}>
				<InputRange
					label={t.BOIDS}
					max={250}
					min={10}
					onChange={event => {
						setModel("boids", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={1}
					value={model.boids}
				/>
				<InputToggle
					checked={model.bound}
					label={t.BOUND}
					onChange={event => setModel("bound", event.target.checked)}
				/>
				<InputRange
					label={t.ALIGNMENT}
					max={2.5}
					min={0.1}
					onChange={event => setModel("align", event.target.valueAsNumber)}
					output
					step={0.01}
					value={model.align}
				/>
				<InputRange
					label={t.COHESION}
					max={2}
					min={0.01}
					onChange={event => setModel("cohesion", event.target.valueAsNumber)}
					output
					step={0.01}
					value={model.cohesion}
				/>
				<InputRange
					label={t.SEPARATION}
					max={2.5}
					min={0.1}
					onChange={event => setModel("separate", event.target.valueAsNumber)}
					output
					step={0.01}
					value={model.separate}
				/>
			</Fieldset>
			<Fieldset legend={t.APPEARANCE}>
				<InputRange
					label={t.SCALE}
					max={5}
					min={1}
					onChange={event => {
						setModel("scale", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={0.1}
					value={model.scale}
				/>
			</Fieldset>
			<Fieldset legend={t.QTREE}>
				<InputToggle
					checked={model.qtree}
					label={t.QTREE_OPTIMIZATION}
					onChange={event => setModel("qtree", event.target.checked)}
				/>
				<InputToggle
					checked={model.show_qtree}
					disabled={!model.qtree}
					label={t.QTREE_APPEARANCE}
					onChange={event => setModel("show_qtree", event.target.checked)}
				/>
				<InputToggle
					checked={model.show_perception}
					disabled={!model.qtree}
					label={t.PERCEPTION_APPEARANCE}
					onChange={event => setModel("show_perception", event.target.checked)}
				/>
				<InputRange
					label={t.PERCEPTION}
					max={250}
					min={50}
					onChange={event => setModel("perception", event.target.valueAsNumber)}
					output
					step={1}
					value={model.perception}
				/>
			</Fieldset>
		</Form>
	);
}
