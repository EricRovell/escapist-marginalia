<script lang="ts">
	import { getContext } from "svelte";
	import { radix } from "@ericrovell/radix";

	import { FormNumerals, Number, Numerals, MathExp } from "../../components";
	import { decoder } from "../../util";
	import type { Translation } from "../../translations/types";
	import styles from "./number-into-decimal.module.css";

	export let radixInput = 2;
	export let inputNumber = "10010";
	export let valid = true;

	const t = getContext<Translation>("t");

	$: number = radix(inputNumber.split(""), radixInput, { decode: decoder });
	$: numberOutput = number.setRadix(10);
</script>

<!--
	Disassembling the number into radix powers demonstration.
-->
<section class="wide interactive {styles.wrapper}">
	<h4>{t.TITLE_NUMBER_INTO_DECIMAL}</h4>
	{#if valid && number.valid}
		<div class="{styles["number-wrapper"]}">
			<Number
				number="{number.toString()}"
				radix="{radixInput}"
			/>
			<MathExp math={String.raw`\to`} />
			<Number
				number="{numberOutput.toString()}"
				radix="{10}"
			/>
		</div>
		<Numerals
			numerals="{[ ...number ]}"
			radix="{radixInput}"
			showZeroRanks
			showPower
		/>
	{/if}
	<FormNumerals
		bind:number="{inputNumber}"
		bind:radix="{radixInput}"
		bind:valid
		{t}
	/>
</section>
