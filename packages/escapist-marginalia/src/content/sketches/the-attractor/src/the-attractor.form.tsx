import { InputRange } from "ui";

import { Fieldset, Form } from "~/layouts/sketch";

import { t } from "../translations";
import { useModel } from "./the-attractor.model";

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
					max={15}
					min={1}
					onChange={event => {
						setModel("attractors", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={1}
					value={model.attractors}
				/>
			</Fieldset>
			<Fieldset legend={t.PARTICLES}>
				<InputRange
					label={t.COUNT}
					max={2500}
					min={500}
					onChange={event => {
						setModel("particles", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={1}
					value={model.particles}
				/>
				<InputRange
					label={t.LIFETIME}
					max={3000}
					min={250}
					onChange={event => {
						setModel("lifetime", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={1}
					value={model.lifetime}
				/>
			</Fieldset>
		</Form>
	);
}
