import { type JSX, splitProps } from "solid-js";
import { Button } from "ui";

import styles from "./layout-sketch.module.css";

interface FieldsetProps extends JSX.HTMLAttributes<HTMLFieldSetElement> {
	legend: string;
}

export function Fieldset(allprops: FieldsetProps) {
	const [ props, rest ] = splitProps(allprops, [ "children", "legend" ]);

	return (
		<fieldset class={styles.fieldset} {...rest}>
			<legend class={styles.legend}>
				{props.legend}
			</legend>
			{props.children}
		</fieldset>
	);
}

interface FormProps extends JSX.HTMLAttributes<HTMLFormElement> {
	onReset?: VoidFunction;
}

export function Form(props: FormProps) {
	return (
		<form class={styles.form}>
			{props.children}
			<Button appearance="outline" onClick={props.onReset} variant="neutral" wide>
				Reset
			</Button>
		</form>
	);
}
