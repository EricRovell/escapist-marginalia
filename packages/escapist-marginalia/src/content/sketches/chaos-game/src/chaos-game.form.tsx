import { InputColor, InputRange, InputToggle } from "ui";

import { Fieldset, Form } from "~/layouts/sketch";

import { t } from "../translations";
import { InputChaosRestrictions } from "./chaos-game-restrictions-input";
import { MODEL_RESTRICTIONS, useModel } from "./chaos-game.model";

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
					onChange={event => {
						setModel("polygon_sides", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.polygon_sides}
					{...MODEL_RESTRICTIONS.polygon_sides}
				/>
				<InputRange
					label={t.POLYGON_SCALE}
					onChange={event => {
						setModel("polygon_scale", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.polygon_scale}
					{...MODEL_RESTRICTIONS.polygon_scale}
				/>
				<InputRange
					label={t.POLYGON_ORIGIN_THETA}
					onChange={event => {
						setModel("polygon_origin_theta", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.polygon_origin_theta}
					{...MODEL_RESTRICTIONS.polygon_origin_theta}
				/>
				<InputRange
					disabled={!model.polygon_visible}
					label={t.POLYGON_LINE_WIDTH}
					onChange={event => {
						setModel("polygon_line_width", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.polygon_line_width}
					{...MODEL_RESTRICTIONS.polygon_line_width}
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
					onChange={event => {
						setModel("points_limit", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.points_limit}
					{...MODEL_RESTRICTIONS.points_limit}
				/>
				<InputRange
					label={t.POINT_SCALE}
					onChange={event => setModel("point_scale", event.target.valueAsNumber)}
					output
					value={model.point_scale}
					{...MODEL_RESTRICTIONS.polygon_scale}
				/>
				<InputRange
					label={t.SPEED}
					onChange={event => setModel("speed", event.target.valueAsNumber)}
					output
					value={model.speed}
					{...MODEL_RESTRICTIONS.speed}
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
					onChange={event => {
						setModel("step_coef", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.step_coef}
					{...MODEL_RESTRICTIONS.step_coef}
				/>
				<InputRange
					disabled={!model.step_factor}
					label={t.STEP_DISTANCE}
					onChange={event => {
						setModel("step_distance", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.step_distance}
					{...MODEL_RESTRICTIONS.step_distance}
				/>
			</Fieldset>
			<InputChaosRestrictions onReset={props.onReset} />
		</Form>
	);
}
