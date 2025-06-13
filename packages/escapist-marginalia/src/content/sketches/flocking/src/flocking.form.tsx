import { InputRange, InputToggle } from "ui";

import { Fieldset, Form } from "~/layouts/sketch";

import { t } from "../translations";
import { MODEL_RESTRICTIONS, useModel } from "./flocking.model";

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
					onChange={event => {
						setModel("boids", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.boids}
					{...MODEL_RESTRICTIONS.boids}
				/>
				<InputToggle
					checked={model.bound}
					label={t.BOUND}
					onChange={event => setModel("bound", event.target.checked)}
				/>
				<InputRange
					label={t.ALIGNMENT}
					onChange={event => setModel("align", event.target.valueAsNumber)}
					output
					value={model.align}
					{...MODEL_RESTRICTIONS.align}
				/>
				<InputRange
					label={t.COHESION}
					onChange={event => setModel("cohesion", event.target.valueAsNumber)}
					output
					value={model.cohesion}
					{...MODEL_RESTRICTIONS.cohesion}
				/>
				<InputRange
					label={t.SEPARATION}
					onChange={event => setModel("separate", event.target.valueAsNumber)}
					output
					value={model.separate}
					{...MODEL_RESTRICTIONS.separate}
				/>
			</Fieldset>
			<Fieldset legend={t.APPEARANCE}>
				<InputRange
					label={t.SCALE}
					onChange={event => {
						setModel("scale", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.scale}
					{...MODEL_RESTRICTIONS.scale}
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
					onChange={event => setModel("perception", event.target.valueAsNumber)}
					output
					value={model.perception}
					{...MODEL_RESTRICTIONS.separate}
				/>
			</Fieldset>
		</Form>
	);
}
