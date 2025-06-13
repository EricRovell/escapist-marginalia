import { For, type JSX } from "solid-js";
import { Button, Input, InputToggle } from "ui";
import { clamp } from "utils/math";

import { Fieldset } from "~/layouts/sketch";

import { t } from "../translations";
import { useModel } from "./chaos-game.model";

import styles from "./chaos-game-restrictions-input.module.css";

const Description = () => (
	<aside class={styles.message}>
		<p>{t.MESSAGE_RESTRICTIONS_1}</p>
		<p>{t.MESSAGE_RESTRICTIONS_2}</p>
	</aside>
);

interface Props {
	/**
	 * Reset renderer.
	 */
	onReset?: VoidFunction;
}

export function InputChaosRestrictions(props: Props) {
	const { model, setModel } = useModel();

	const handleAddRule = () => {
		if (model.restrictions.length >= model.polygon_sides) {
			return;
		}

		setModel("restrictions", model.restrictions.length, {
			forbidden: false,
			index: -1 -1 * model.restrictions.length,
			values: []
		});
	};

	const handleRemoveRule = (event: Event) => {
		const target = event.target as HTMLButtonElement;
		const index = Number(target.dataset.index);

		setModel("restrictions", state => state.filter((_, i) => i !== index));
	};

	const handleResetRules = () => {
		setModel("restrictions", []);
	};

	const handleChange: JSX.HTMLAttributes<HTMLFieldSetElement>["onChange"] = (event) => {
		const target = event.target as HTMLInputElement;
		const index = Number(target.dataset.index);

		if (target.type === "checkbox") {
			setModel("restrictions", index, "forbidden", target.checked);
		} else if (target.type === "text") {
			const distances = target.value.split(",").map(value => clamp(Number(value), 1, model.polygon_sides));
			setModel("restrictions", index, "values", [ ...new Set(distances) ]);
		} else {
			setModel("restrictions", index, "index", Number(target.value));
		}

		props.onReset?.();
	};

	return (
		<Fieldset legend={t.RESTRICTIONS} onChange={handleChange}>
			<For each={model.restrictions} fallback={<Description />}>
				{(rule, i) => (
					<div class={styles.rule}>
						<Input
							data-index={i()}
							label={t.VERTICE}
							max={-1}
							min={-model.polygon_sides}
							type="number"
							value={rule.index}
						/>
						<Input
							data-index={i()}
							label={t.DISTANCES}
							placeholder={t.PLACEHOLDER_DISTANCES}
							value={rule.values.join(",")}
						/>
						<InputToggle
							checked={rule.forbidden}
							data-index={i()}
							label={t.FORBIDDEN}
						/>
						<Button
							data-index={i()}
							onClick={handleRemoveRule}
							variant="danger"
							wide
						>
							{t.DELETE}
						</Button>
					</div>
				)}
			</For>
			<div class={styles.controls}>
				<Button
					disabled={model.restrictions.length === model.polygon_sides}
					onClick={handleAddRule}
				>
					{t.ADD_RULE}
				</Button>
				<Button
					disabled={model.restrictions.length === 0}
					onClick={handleResetRules}
				>
					{t.RESET}
				</Button>
			</div>
		</Fieldset>
	);
}
