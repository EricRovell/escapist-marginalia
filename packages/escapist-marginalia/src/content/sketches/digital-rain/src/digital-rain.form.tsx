import { InputColor, InputRange, InputToggle } from "ui";

import { Fieldset, Form } from "~/layouts/sketch";

import { t } from "../translations";
import { useModel } from "./digital-rain.model";

import type { CharType } from "./digital-rain.model";

interface Props {
	/**
	 * Reset renderer.
	 */
	onReset?: VoidFunction;
}

export function SketchForm(props: Props) {
	const { model, resetModel, setModel } = useModel();

	const handleChars = (state: boolean, chartype: CharType) => {
		if (state) {
			setModel("chars", model.chars.length, chartype);
		} else {
			setModel("chars", chars => chars.filter(item => item !== chartype));
		}
	};

	const handleReset = () => {
		resetModel();
		props.onReset?.();
	};

	return (
		<Form onReset={handleReset}>
			<Fieldset legend={t.GENERAL}>
				<InputRange
					label={t.SCALE}
					max={25}
					min={1}
					onChange={event => {
						setModel("scale", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					step={1}
					value={model.scale}
				/>
				<InputRange
					label={t.DEPTH}
					max={1}
					min={0.01}
					onChange={event => {
						setModel("depth", event.target.valueAsNumber);
						props.onReset?.();
					}}
					output
					value={model.depth}
				/>
				<InputColor
					disabled={model.random_colors}
					label={t.COLOR}
					onChange={({ valueAsString }) => setModel("color", valueAsString)}
					opaque
					value={model.color}
				/>
				<InputColor
					label={t.BACKGROUND}
					onChange={({ valueAsString }) => {
						setModel("background", valueAsString);
						props.onReset?.();
					}}
					value={model.background}
				/>
			</Fieldset>
			<Fieldset legend={t.BEHAVIOR}>
				<InputToggle
					checked={model.distributed}
					label={t.DISTRIBUTED}
					onChange={event => setModel("distributed", event.target.checked)}
				/>
				<InputToggle
					checked={model.random_colors}
					label={t.RANDOM_COLORS}
					onChange={event => setModel("random_colors", event.target.checked)}
				/>
			</Fieldset>
			<Fieldset legend={t.SYMBOLS}>
				<InputToggle
					checked={model.chars.includes("digits")}
					disabled={model.chars.length === 1 && model.chars[0] === "digits"}
					label={t.DIGITS}
					onChange={event => handleChars(event.target.checked, "digits")}
				/>
				<InputToggle
					checked={model.chars.includes("katakana")}
					disabled={model.chars.length === 1 && model.chars[0] === "katakana"}
					label={t.KATAKANA}
					onChange={event => handleChars(event.target.checked, "katakana")}
				/>
				<InputToggle
					checked={model.chars.includes("math")}
					disabled={model.chars.length === 1 && model.chars[0] === "math"}
					label={t.MATH}
					onChange={event => handleChars(event.target.checked, "math")}
				/>
				<InputToggle
					checked={model.chars.includes("uppercase_letters")}
					disabled={model.chars.length === 1 && model.chars[0] === "uppercase_letters"}
					label={t.UPPERCASE}
					onChange={event => handleChars(event.target.checked, "uppercase_letters")}
				/>
			</Fieldset>
		</Form>
	);
}
