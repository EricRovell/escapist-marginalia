import { type JSX, splitProps  } from "solid-js";
import { classnames } from "utils";

import type { Classes } from "../../types";

import styles from "./input-toggle.module.css";

export interface InputToggleProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class"> {
	classes?: Classes<"input" | "label" | "root">;
	error?: boolean;
	label?: string;
}

export function InputToggle(allProps: InputToggleProps) {
	const [ props, rest ] = splitProps(allProps, [ "classes", "label", "error" ]);

	return (
		<label class={classnames(styles.root, props.classes?.root)}>
			<span class={classnames(styles.label, props.classes?.label)}>
				{props.label}
			</span>
			<input
				class={classnames(styles.input, props.classes?.input)}
				role="switch"
				type="checkbox"
				{...rest}
			/>
		</label>
	);
}
