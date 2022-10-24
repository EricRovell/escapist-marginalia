<script lang="ts">
	import { radix } from "@ericrovell/radix";
	import { MathExp } from "@components";
	import { FormNumerals, Numerals } from "../../components";
	import { decoder } from "../../util";
	import styles from "./number-into-decimal.module.css";

	export let radixInput = 2;
	export let inputNumber = "10010";
	export let t: Record<string, string>;
	export let valid = true;

	$: number = radix(inputNumber.split(""), radixInput, { decode: decoder });
	$: numberOutput = number.setRadix(10);
</script>

<!--
	Disassembling the number into radix powers demonstration.
-->
<section class="wide interactive {styles.wrapper}">
	<h4>{t.title}</h4>
	{#if valid && number.valid}
		<div class="{styles["number-wrapper"]}">
			<output class="{styles.number}">
				{number.toString()}<sub>{radixInput}</sub>
			</output>
			<MathExp math={String.raw`\to`} />
			<output class="{styles.number}">
				{numberOutput.decimal}<sub>10</sub>
			</output>
		</div>
		<Numerals
			numerals="{[ ...number ]}"
			radix="{radixInput}"
			showZeroRanks
			showPower
		/>
	{:else}
		<span>Invalid input</span>
	{/if}
	<FormNumerals
		bind:number="{inputNumber}"
		bind:radix="{radixInput}"
		bind:valid
		{t}
	/>
</section>
