<script lang="ts">
	import { Range } from "@components";
	import { ChaosGame } from "../../components";
	import styles from "./chaos-game-steps-demo.module.css";

	export let factor = true;
	export let t: Record<string, string>;

	let n = 4;
	let value = 0.5;
</script>

<!--
	"Chaos Game" step value rule demonstration.
-->
<section class="wide interactive">
	<h3>{t["title"]}</h3>
	<ChaosGame
		points="{3500}"
		polygon="{n}"
		scale="{factor ? 150 : 100}"
		pointSize="{1}"
		step="{{ value, factor }}"
	/>
	<form class="{styles.form}" on:submit|preventDefault>
		<Range bind:value={n} min={3} max={9} output>
			{t["number-of-sides"]}
		</Range>
		{#if factor}
			<Range bind:value min={0.1} max={1} step={0.01} output>
				{t["step-factor"]}
			</Range>
		{:else}
			<Range bind:value min={0} max={300} step={1} output>
				{t["step"]}
			</Range>
		{/if}
	</form>
</section>
