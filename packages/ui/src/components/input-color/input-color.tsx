import { InputColorPicker } from "./input-color-picker";
import { InputColorProvider } from "./input-color.context";
import { InputColorSwatch } from "./input-color.swatch";

import type { Classes, ColorModelHSL } from "../../types";

export interface InputColorProps {
	classes?: Classes<"input" | "label" | "root" | "swatch">;
	label: string;
	onChange?: (model: ColorModelHSL) => void;
	opaque?: boolean;
}

export function InputColor(props: InputColorProps) {
	return (
		<InputColorProvider>
			<InputColorSwatch label={props.label} />
			<InputColorPicker onColorChange={props.onChange} opaque={props.opaque} />
		</InputColorProvider>
	);
}
