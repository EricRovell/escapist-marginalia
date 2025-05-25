import { createSignal, type JSX, Show } from "solid-js";
import { createStore, unwrap } from "solid-js/store";
import { classnames } from "utils";

import { Button } from "../../button/button";
import { InputRange } from "../../input-range";
import { getContrast, toColorString } from "../input-color.helpers";
import { t } from "../input-color.translation";

import type { ColorModelHSL } from "../../../types";
import type { InputChangeHandlerValue } from "../input-color";

import styles from "../input-color.module.css";

interface Props extends JSX.HTMLAttributes<HTMLFieldSetElement> {
	initialModel: ColorModelHSL;
	onColorChange?: (value: InputChangeHandlerValue) => void;
	opaque?: boolean;
	pickerID: string;
}

export function InputColorPicker(props: Props) {
	const [ getRef, setRef ] = createSignal<HTMLFieldSetElement>();
	const [ color, setColor ] = createStore<ColorModelHSL>({ ...unwrap(props.initialModel) });

	const handleClose = () => getRef()?.hidePopover();

	const handleSubmit = () => {
		const value = { ...unwrap(color) };
		props.onColorChange?.({
			value,
			valueAsString: toColorString(value)
		});
		handleClose();
	};

	const handleCancel = () => {
		handleClose();
	};

	const handleBeforeToggle = () => {
		setColor({ ...unwrap(props.initialModel) });
	};

	const getColor = () => toColorString(color);
	const colorContrast = () => getContrast(color);

	return (
		<fieldset
			class={classnames(styles.picker)}
			id={props.pickerID}
			onBeforeToggle={handleBeforeToggle}
			popover="auto"
			ref={setRef}
		>
			<header class={styles["picker-header"]}>
				{t.HEADER}:
				<output
					class={styles["picker-swatch"]}
					style={{
						"--button-bg": getColor(),
						border: `4px solid ${colorContrast()}`
					}}
				/>
			</header>
			<InputRange
				label={t.HUE}
				max={360}
				min={0}
				onInput={event => setColor("h", event.target.valueAsNumber)}
				output
				step={1}
				value={color.h}
			/>
			<InputRange
				label={t.SATURATION}
				max={100}
				min={0}
				onInput={event => setColor("s", event.target.valueAsNumber)}
				output
				step={1}
				value={color.s}
			/>
			<InputRange
				label={t.LIGHTNESS}
				max={100}
				min={0}
				onInput={event => setColor("l", event.target.valueAsNumber)}
				step={1}
				value={color.l}
			/>
			<Show when={!props.opaque}>
				<InputRange
					label={t.OPACITY}
					max={100}
					min={0}
					onInput={event => setColor("o", event.target.valueAsNumber)}
					output
					step={1}
					value={color.o}
				/>
			</Show>
			<footer class={styles["picker-footer"]}>
				<Button onClick={handleSubmit} wide>
					{t.SELECT}
				</Button>
				<Button
					appearance="outline"
					onClick={handleCancel}
					variant="danger"
					wide
				>
					{t.CANCEL}
				</Button>
			</footer>
		</fieldset>
	);
}
