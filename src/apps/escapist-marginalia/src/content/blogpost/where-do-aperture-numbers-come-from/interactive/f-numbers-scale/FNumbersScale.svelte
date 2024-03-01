<script lang="ts" context="module">
	import { Range } from "@components";
	import { FNumbers } from "../../components";
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import styles from "./f-numbers-scale.module.css";

	const t: Record<string, string> = getContext("t")["f-stops"];

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
	<h3>{t["title"]}</h3>
	<FNumbers
		{fstopFrom}
		{fstopTo}
		{t}
	/>
	<form on:submit|preventDefault>
		<Range
			on:change={handleChange}
			min={fstopMin + 1}
			max={fstopMax}
			value="{fstopTo}"
		>
			{t["f-numbers"]}
		</Range>
	</form>
</section>
