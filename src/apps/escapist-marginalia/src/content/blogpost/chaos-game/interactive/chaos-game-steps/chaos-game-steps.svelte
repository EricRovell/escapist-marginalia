<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange } from "ui";

	import { ChaosGame } from "../../components/chaos-game";
	import type { Translation } from "../../translations/types";
	import styles from "./chaos-game-steps.module.css";

	export let factor = true;
	const t = getContext<Translation>("t");

	let n = 4;
	let value = 0.5;
</script>

<!--
	"Chaos Game" step value rule demonstration.
-->
<section class="wide interactive">
	<h3>{t.TITLE_STEP_RULE_VALUES}</h3>
	<ChaosGame
		id="chaos-game-step-demo"
		options={{
			"points-limit": 10000,
			"polygon-sides": n,
			"polygon-visible": false,
			"step-coef": value,
			"step-factor": factor,
			"step-distance": value
		}}
	/>
	<form class="{styles.form}" on:submit|preventDefault>
		<InputRange bind:value={n} min={3} max={9} output>
			{t.NUMBER_OF_SIDES}
		</InputRange>
		{#if factor}
			<InputRange bind:value min={0.1} max={1} step={0.01} output>
				{t.STEP_FACTOR}
			</InputRange>
		{:else}
			<InputRange bind:value min={0} max={300} step={1} output>
				{t.STEP_VALUE}
			</InputRange>
		{/if}
	</form>
</section>
