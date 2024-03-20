<script lang="ts">
	import { getContext } from "svelte";

	import { FormNumerals, MathExp } from "../../components";
	import { getConversionStages, getRanks } from "./decimal-conversion-stages.helpers";
	import { buildMathDifferences, buildMathPowerInequalities, buildMathRanks } from "./decimal-conversion-stages.katex";
	import type { Translation } from "../../translations/types";
	import styles from "./decimal-conversion-stages.module.css";

	export let number = "101";
	export let outputRadix = 2;

	const t = getContext<Translation>("t");

	let valid = true;

	$: stages = getConversionStages(+number, outputRadix);
</script>

<!--
	Decimal number conversion stages demonstration.
-->
<section class="wide interactive {styles.wrapper}">
	<h4>{t.TITLE_DECIMAL_CONVERSION_STAGES}</h4>
	<FormNumerals
		bind:number
		bind:radix="{outputRadix}"
		bind:valid
		{t}
	/>
	{#if valid}
		<div class="{styles.table}">
			<MathExp math={buildMathRanks(getRanks(+number, outputRadix), outputRadix)} />
		</div>
		<div class="{styles.math}">
			<MathExp math={buildMathPowerInequalities(stages, outputRadix)} />
			<MathExp math={buildMathDifferences(stages, outputRadix)} />
		</div>
	{/if}
</section>
