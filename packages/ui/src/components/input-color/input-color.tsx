import { createMemo, createUniqueId } from "solid-js";
import { isNullable } from "utils/validators";

import { InputColorPicker } from "./components/input-color-picker";
import { InputColorSwatch } from "./components/input-color-swatch";
import { DEFAULT_MODEL, parseColorString } from "./input-color.helpers";

import type { Classes, ColorModelHSL, ColorStringHSL } from "../../types";

export interface InputChangeHandlerValue {
	value: ColorModelHSL;
	valueAsString: ColorStringHSL;
}

export interface InputColorProps {
	classes?: Classes<"input" | "label" | "root" | "swatch">;
	disabled?: boolean;
	label: string;
	onChange?: (value: InputChangeHandlerValue) => void;
	opaque?: boolean;
	value?: ColorModelHSL | ColorStringHSL;
}

export function InputColor(props: InputColorProps) {
	const pickerID = createUniqueId();
	const swatchID = createUniqueId();

	const model = createMemo(() => {
		if (isNullable(props.value)) {
			return DEFAULT_MODEL;
		}

		if (typeof props.value === "string") {
			return parseColorString(props.value);
		}

		return props.value;
	});

	return (
		<>
			<InputColorSwatch
				disabled={props.disabled}
				initialModel={model()}
				label={props.label}
				pickerID={pickerID}
				swatchID={swatchID}
			/>
			<InputColorPicker
				initialModel={model()}
				onColorChange={props.onChange}
				opaque={props.opaque}
				pickerID={pickerID}
			/>
		</>
	);
}
