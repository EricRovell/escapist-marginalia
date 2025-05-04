import { createMemo, type JSX } from "solid-js";
import { classnames } from "utils";

import { setAttr } from "../../utils";
import { Button } from "../button/button";
import { useColorContext } from "./input-color.context";
import { colorToString, getContrast } from "./input-color.helpers";

import type { Classes } from "../../types";

import styles from "./input-color.module.css";

export interface InputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class"> {
	classes?: Classes<"input" | "label" | "root" | "swatch">;
	label?: string;
}

export function InputColorSwatch(props: InputProps) {
	const { model, pickerID, swatchID } = useColorContext();

	const color = createMemo(() => colorToString(model, true));
	const colorContrast = () => getContrast(model);

	return (
		<label class={classnames(styles.root, props.classes?.root)} style={{ "--input-color-anchor": `--anchor-${swatchID}`}}>
			<span class={classnames(styles.label, props.classes?.label)}>
				{props.label}
			</span>
			<Button
				class={classnames(styles.swatch, props.classes?.swatch)}
				data-transparent={setAttr(model.o === 0)}
				id={swatchID}
				popoverTarget={pickerID}
				style={{
					"--button-bg": color(),
					"--button-bg-active": color(),
					"--button-bg-hover": color(),
					"border": `3px solid ${colorContrast()}`
				}}
			/>
		</label>
	);
}
