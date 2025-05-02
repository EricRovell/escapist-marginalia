import { type JSX, mergeProps, splitProps  } from "solid-js";

import { classnames, setAttr } from "../../utils";

import type { Classes } from "../../types";

import styles from "./input-range.module.css";

export interface InputRangeProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class"> {
	classes?: Classes<"input" | "label" | "output" | "root">;
	error?: boolean;
	label?: string;
	output?: boolean;
}

export function InputRange(allProps: InputRangeProps) {
	const mergedProps = mergeProps({ max: 1, min: 0, step: 0.01, value: 0.5 }, allProps);
	const [ props, rest ] = splitProps(mergedProps, [ "classes", "label", "error", "output", "value" ]);

	return (
		<label class={classnames(styles.root, props.classes?.root)}>
			<span class={classnames(styles.label, props.classes?.label)}>
				{props.label}
			</span>
			<output class={classnames(styles.output, props.classes?.output)} data-visible={setAttr(props.output)}>
				{props.value}
			</output>
			<input
				class={classnames(styles.input, props.classes?.input)}
				type="range"
				value={props.value}
				{...rest}
			/>
		</label>
	);
}
