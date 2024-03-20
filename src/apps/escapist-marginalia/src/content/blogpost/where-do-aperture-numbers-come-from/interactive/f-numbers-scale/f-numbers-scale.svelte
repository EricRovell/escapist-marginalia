<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange } from "ui";

	import { FNumbers } from "../../components";
	import type { Translation } from "../../translations/types";
	import styles from "./f-numbers-scale.module.css";

	const t = getContext<Translation>("t");

	/**
	 * range of fstops to display
	 */
	export let fstopFrom = 0;
	export let fstopTo = 7;

	const fstopMin = 0;
	const fstopMax = 12;

	const handleChange = (event: InputEvent) => {
		const target = event.target as HTMLInputElement;
		fstopTo = Number(target.value);
	};
</script>

<!--
	Demonstrates the f-numbers scale.
-->
<section class="wide {styles.wrapper} interactive">
	<h3>{t.TITLE_F_STOPS}</h3>
	<FNumbers
		{fstopFrom}
		{fstopTo}
	/>
	<form on:submit|preventDefault>
		<InputRange
			on:change={handleChange}
			min={fstopMin + 1}
			max={fstopMax}
			value="{fstopTo}"
		>
			{t.F_NUMBERS}
		</InputRange>
	</form>
</section>
