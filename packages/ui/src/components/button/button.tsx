import { mergeProps, splitProps } from "solid-js";

import type { JSX } from "solid-js";

import { classnames, setAttr } from "../../utils";

import type { Appearance, Variant } from "../../types";

import styles from "./button.module.css";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	appearance?: Exclude<Appearance, "text">;
	icon?: boolean;
	pending?: boolean;
	variant?: Variant;
}

const DEFAULT_PROPS: ButtonProps = {
	appearance: "fill",
	type: "button",
	variant: "accent"
};

export function Button(allProps: ButtonProps) {
	const mergedProps = mergeProps(DEFAULT_PROPS, allProps);
	const [ props, rest ] = splitProps(mergedProps, [
		"appearance",
		"children",
		"class",
		"icon",
		"pending",
		"variant"
	]);

	return (
		<button
			class={classnames(styles.button, props.class)}
			data-appearance={props.appearance}
			data-icon={setAttr(props.icon)}
			data-pending={setAttr(props.pending)}
			data-variant={props.variant}
			{...rest}
		>
			{props.children}
		</button>
	);
}
