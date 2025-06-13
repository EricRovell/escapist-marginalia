import { InputColor, InputRange } from "ui";

import { Fieldset, Form } from "~/layouts/sketch";

import { t } from "../translations";
import { MODEL_RESTRICTIONS, useModel } from "./geometric-hive.model";

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
			<Fieldset legend={t.FIELD}>
				<InputColor
					label={t.BACKGROUND}
					onChange={({ valueAsString }) => setModel("background", valueAsString)}
					value={model.background}
				/>
			</Fieldset>
			<Fieldset legend={t.PARTICLES}>
				<InputRange
					label={t.PARTICLE_GAP}
					onChange={event => {
						setModel("particle_gap", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.particle_gap}
					{...MODEL_RESTRICTIONS.particle_gap}
				/>
				<InputRange
					label={t.PARTICLE_SIZE}
					onChange={event => {
						setModel("particle_size", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.particle_size}
					{...MODEL_RESTRICTIONS.particle_size}
				/>
				<InputRange
					label={t.PARTICLE_SPEED_BASE}
					onChange={event => {
						setModel("particle_speed_base", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.particle_speed_base}
					{...MODEL_RESTRICTIONS.particle_speed_base}
				/>
			</Fieldset>
			<Fieldset legend={t.GAPS}>
				<InputRange
					label={t.GAP_FREQUENCY}
					onChange={event => {
						setModel("gap_frequency", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.gap_frequency}
					{...MODEL_RESTRICTIONS.gap_frequency}
				/>
			</Fieldset>
		</Form>
	);
}
