<script lang="ts">
	import { getContext } from "svelte";
	import { Button, InputRange } from "ui";
	import { clamp } from "utils/math";

	import { FNumbers } from "../../components";
	import type { Translation } from "../../translations/types";
	import styles from "./f-numbers-scale.module.css";

	const t = getContext<Translation>("t");

	/**
	 * range of fstops to display
	 */
	export let fstopFrom = 3;
	export let fstopTo = 4;

	const fstopMin = 0;
	const fstopMax = 12;

	/**
	 * display a number of steps between {fstopFrom} and {fstopTo}
	 */
	export let step = 3;

	const handleStopChange = (inc: number) => {
		fstopFrom = clamp(fstopFrom + inc, fstopMin, fstopMax - 1);
		fstopTo = clamp(fstopTo + inc, fstopMin + 1, fstopMax);
	};

	const handleChange = (event: InputEvent) => {
		const target = event.target as HTMLInputElement;
		step = Number(target.value);
	};
</script>

<!--
	Demonstrates the intermediate f-stop values within a scale.
-->
<section class="wide {styles.wrapper} interactive">
	<h3>{t.TITLE_F_STOPS_STEPS}</h3>
	<FNumbers
		{fstopFrom}
		{fstopTo}
		{step}
	/>
	<form on:submit|preventDefault>
		<fieldset>
			<legend>{t.F_STOP}</legend>
			<Button
				on:click={() => handleStopChange(-1)}
				disabled={fstopFrom === fstopMin}
			>
				{t.PREV_F_STOP}
			</Button>
			<Button
				on:click={() => handleStopChange(1)}
				disabled={fstopTo === fstopMax}
			>
				{t.NEXT_F_STOP}
			</Button>
		</fieldset>
		<InputRange
			min={1}
			max={7}
			on:change={handleChange}
			output
			value="{step}"
		>
			{t.STEP}
			<svelte:fragment slot="output">
				1 / {step}
			</svelte:fragment>
		</InputRange>
	</form>
</section>
