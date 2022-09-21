<script lang="ts" context="module">
	import { Range } from "@components";
	import FNumbers from "../components/FNumbers.svelte";
</script>

<script lang="ts">
	import styles from "./f-numbers-scale.module.css";

	export let t: Record<string, string>;

	/**
	 * range of fstops to display
	 */
	export let fstopFrom = 0;
	export let fstopTo = 7;

	const fstopMin = 0;
	const fstopMax = 12;
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
		<Range bind:value={fstopTo} min={fstopMin + 1} max={fstopMax}>
			{t["f-numbers"]}
		</Range>
	</form>
</section>
