<script lang="ts">
	import { InputNumber, MathExp } from "@components";
	import { getConversionStages, getRanks } from "./decimal-conversion-stages.helpers";
	import { buildMathDifferences, buildMathPowerInequalities, buildMathRanks } from "./decimal-conversion-stages.katex";
	import styles from "./decimal-conversion-stages.module.css";

	export let number = 101;
	export let outputRadix = 2;
	export let t: Record<string, string>;

	$: stages = getConversionStages(number, outputRadix);
</script>

<!--
	Decimal number conversion stages demonstration.
-->
<section class="wide interactive {styles.wrapper}">
	<h4>{t.title}</h4>
	<form class="{styles.form}" on:submit|preventDefault>
		<InputNumber bind:value="{number}" min="{0}" max="{10 ** 6}">
			{t.number}
		</InputNumber>
		<InputNumber bind:value="{outputRadix}" min="{2}" max="{1024}">
			{t.radix}
		</InputNumber>
	</form>
	<div class="{styles.table}">
		<MathExp math={buildMathRanks(getRanks(number, outputRadix), outputRadix)} />
	</div>
	<div class="{styles.math}">
		<MathExp math={buildMathPowerInequalities(stages, outputRadix)} />
		<MathExp math={buildMathDifferences(stages, outputRadix)} />
	</div>
</section>
