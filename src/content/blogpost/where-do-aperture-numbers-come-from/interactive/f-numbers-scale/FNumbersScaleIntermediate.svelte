<script lang="ts" context="module">
	import { Button, Range } from "@components";
	import { clamp } from "@utils/helpers";
	import { FNumbers } from "../../components";
</script>

<script lang="ts">
	import styles from "./f-numbers-scale.module.css";

	export let t: Record<string, string>;

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
</script>

<!--
	Demonstrates the intermediate f-stop values within a scale.
-->
<section class="wide {styles.wrapper} interactive">
	<h3>{t["title"]}</h3>
	<FNumbers
		{fstopFrom}
		{fstopTo}
		{step}
		{t}
	/>
	<form on:submit|preventDefault>
		<fieldset>
			<legend>{t["f-stop"]}</legend>
			<Button
				on:click={() => handleStopChange(-1)}
				disabled={fstopFrom === fstopMin}
			>
				{t["previous"]}
			</Button>
			<Button
				on:click={() => handleStopChange(1)}
				disabled={fstopTo === fstopMax}
			>
				{t["next"]}
			</Button>
		</fieldset>
		<Range bind:value={step} min={1} max={7} output>
			{t["step"]}
			<svelte:fragment slot="output">
				1 / {step}
			</svelte:fragment>
		</Range>
	</form>
</section>
