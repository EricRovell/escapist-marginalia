import { InputRange } from "ui";

import { Fieldset, Form } from "~/layouts/sketch";

import { t } from "../translations";
import { MODEL_RESTRICTIONS, useModel } from "./the-attractor.model";

interface Props {
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
			<Fieldset legend={t.FIELD}>
				<InputRange
					label={t.ATTRACTORS}
					onChange={event => {
						setModel("attractors", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.attractors}
					{...MODEL_RESTRICTIONS.attractors}
				/>
			</Fieldset>
			<Fieldset legend={t.PARTICLES}>
				<InputRange
					label={t.COUNT}
					onChange={event => {
						setModel("particles", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.particles}
					{...MODEL_RESTRICTIONS.particles}
				/>
				<InputRange
					label={t.LIFETIME}
					onChange={event => {
						setModel("lifetime", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.lifetime}
					{...MODEL_RESTRICTIONS.lifetime}
				/>
			</Fieldset>
		</Form>
	);
}
