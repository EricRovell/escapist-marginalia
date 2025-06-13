import { InputColor, InputRange } from "ui";

import { Fieldset, Form } from "~/layouts/sketch";

import { t } from "../translations";
import { useModel } from "./geometric-hive.model";

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
					max={4}
					min={1}
					onChange={event => {
						setModel("particle_gap", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={0.01}
					value={model.particle_gap}
				/>
				<InputRange
					label={t.PARTICLE_SIZE}
					max={40}
					min={5}
					onChange={event => {
						setModel("particle_size", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={1}
					value={model.particle_size}
				/>
				<InputRange
					label={t.PARTICLE_SPEED_BASE}
					max={0.3}
					min={0.05}
					onChange={event => {
						setModel("particle_speed_base", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={0.01}
					value={model.particle_speed_base}
				/>
			</Fieldset>
			<Fieldset legend={t.GAPS}>
				<InputRange
					label={t.GAP_FREQUENCY}
					max={0.97}
					min={0.8}
					onChange={event => {
						setModel("gap_frequency", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={0.01}
					value={model.gap_frequency}
				/>
			</Fieldset>
		</Form>
	);
}
