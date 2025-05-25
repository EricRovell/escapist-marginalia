import { createMemo, type JSX } from "solid-js";
import { classnames } from "utils";

import { setAttr } from "../../../utils";
import { Button } from "../../button/button";
import { getContrast, toColorString } from "../input-color.helpers";

import type { Classes, ColorModelHSL } from "../../../types";

import styles from "../input-color.module.css";

export interface InputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class"> {
	classes?: Classes<"input" | "label" | "root" | "swatch">;
	initialModel: ColorModelHSL;
	label?: string;
	pickerID: string;
	swatchID: string;
}

export function InputColorSwatch(props: InputProps) {
	const color = createMemo(() => toColorString(props.initialModel, true));
	const colorContrast = () => getContrast(props.initialModel);

	return (
		<label class={classnames(styles.root, props.classes?.root)} style={{ "--input-color-anchor": `--anchor-${props.swatchID}`}}>
			<span class={classnames(styles.label, props.classes?.label)}>
				{props.label}
			</span>
			<Button
				class={classnames(styles.swatch, props.classes?.swatch)}
				data-transparent={setAttr(props.initialModel.o === 0)}
				disabled={props.disabled}
				id={props.swatchID}
				popoverTarget={props.pickerID}
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
