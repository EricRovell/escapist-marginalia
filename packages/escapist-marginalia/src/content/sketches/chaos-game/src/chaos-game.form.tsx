import { InputColor, InputRange, InputToggle } from "ui";

import { Fieldset, Form } from "~/layouts/sketch";

import { t } from "../translations";
import { InputChaosRestrictions } from "./chaos-game-restrictions-input";
import { useModel } from "./chaos-game.model";

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
			<Fieldset legend={t.POLYGON}>
				<InputToggle
					checked={model.polygon_visible}
					label={t.POLYGON_VISIBLE}
					onChange={event => {
						setModel("polygon_visible", event.target.checked);
						props.onReset?.();
					}}
				/>
				<InputRange
					label={t.POLYGON_SIDES}
					max={12}
					min={3}
					onChange={event => {
						setModel("polygon_sides", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={1}
					value={model.polygon_sides}
				/>
				<InputRange
					label={t.POLYGON_SCALE}
					max={2}
					min={0.1}
					onChange={event => {
						setModel("polygon_scale", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={0.01}
					value={model.polygon_scale}
				/>
				<InputRange
					label={t.POLYGON_ORIGIN_THETA}
					max={360}
					min={0}
					onChange={event => {
						setModel("polygon_origin_theta", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={0.01}
					value={model.polygon_scale}
				/>
				<InputRange
					disabled={!model.polygon_visible}
					label={t.POLYGON_LINE_WIDTH}
					max={5}
					min={0.5}
					onChange={event => {
						setModel("polygon_line_width", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={0.5}
					value={model.polygon_line_width}
				/>
				<InputColor
					disabled={model.polygon_visible}
					label={t.POLYGON_COLOR}
					onChange={({ valueAsString }) => {
						setModel("polygon_color", valueAsString);
						props.onReset?.();
					}}
					value={model.polygon_color}
				/>
			</Fieldset>
			<Fieldset legend={t.POINTS}>
				<InputRange
					label={t.POINTS_LIMIT}
					max={500000}
					min={10}
					onChange={event => {
						setModel("points_limit", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={1}
					value={model.points_limit}
				/>
				<InputRange
					label={t.POINT_SCALE}
					max={5}
					min={0.1}
					onChange={event => setModel("point_scale", event.target.valueAsNumber)}
					output
					step={0.1}
					value={model.point_scale}
				/>
				<InputRange
					label={t.SPEED}
					max={150}
					min={1}
					onChange={event => setModel("speed", event.target.valueAsNumber)}
					output
					step={1}
					value={model.speed}
				/>
				<InputToggle
					checked={model.points_color_wheel}
					label={t.POINTS_COLOR_WHEEL}
					onChange={event => {
						setModel("points_color_wheel", event.target.checked);
						props.onReset?.();
					}}
				/>
				<InputColor
					disabled={model.points_color_wheel}
					label={t.POINTS_COLOR}
					onChange={({ valueAsString }) => setModel("points_color", valueAsString)}
					value={model.points_color}
				/>
			</Fieldset>
			<Fieldset legend={t.STEP}>
				<InputToggle
					checked={model.step_factor}
					label={t.STEP_FACTOR}
					onChange={event => {
						setModel("step_factor", event.target.checked);
						props.onReset?.();
					}}
				/>
				<InputRange
					disabled={!model.step_factor}
					label={t.STEP_COEF}
					max={1.5}
					min={0.01}
					onChange={event => {
						setModel("step_coef", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={0.01}
					value={model.step_coef}
				/>
				<InputRange
					disabled={!model.step_factor}
					label={t.STEP_DISTANCE}
					max={1000}
					min={0.1}
					onChange={event => {
						setModel("step_distance", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={0.1}
					value={model.step_distance}
				/>
			</Fieldset>
			<InputChaosRestrictions onReset={props.onReset} />
		</Form>
	);
}
