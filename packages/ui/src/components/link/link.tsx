import { type JSX, mergeProps, splitProps } from "solid-js";
import { isNullable } from "utils/validators";

import type { ParentProps} from "solid-js";

import { classnames, setAttr } from "../../utils";

import type { Appearance, Variant } from "../../types";

import styles_button from "../button/button.module.css";
import styles from "./link.module.css";

export interface LinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement>, ParentProps {
	appearance?: Appearance;
	icon?: boolean;
	variant?: Variant;
	wide?: boolean;
}

const DEFAULT_PROPS: LinkProps = {
	appearance: "text",
	variant: "accent"
};

export function Link(allProps: LinkProps) {
	const mergedProps = mergeProps(DEFAULT_PROPS, allProps);
	const [ props, rest ] = splitProps(mergedProps, [
		"class",
		"children",
		"icon",
		"wide",
		"variant",
		"appearance"
	]);

	const external = () => !isNullable(rest.href) && rest.href.includes("://");

	return (
		<a
			class={classnames(styles_button.button, styles.link, props.class)}
			data-appearance={props.appearance}
			data-icon={setAttr(props.icon)}
			data-variant={props.variant}
			data-wide={setAttr(props.wide)}
			target={setAttr(external(), "_blank")}
			{...rest}
		>
			{props.children}
		</a>
	);
}
