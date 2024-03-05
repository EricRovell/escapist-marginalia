<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange } from "ui";

	import { ChaosGame } from "../../components/chaos-game";
	import styles from "./chaos-game-steps-demo.module.css";

	export let factor = true;
	const t = getContext<Record<string, string>>("t")["step-rule-values-demo"];

	let n = 4;
	let value = 0.5;
</script>

<!--
	"Chaos Game" step value rule demonstration.
-->
<section class="wide interactive">
	<h3>{t["title"]}</h3>
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
			{t["number-of-sides"]}
		</InputRange>
		{#if factor}
			<InputRange bind:value min={0.1} max={1} step={0.01} output>
				{t["step-factor"]}
			</InputRange>
		{:else}
			<InputRange bind:value min={0} max={300} step={1} output>
				{t["step"]}
			</InputRange>
		{/if}
	</form>
</section>
