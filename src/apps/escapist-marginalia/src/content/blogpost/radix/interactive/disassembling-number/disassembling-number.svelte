<script lang="ts">
	import { getContext } from "svelte";
	import { radix } from "@ericrovell/radix";
	import { InputSwitch } from "ui";

	import { FormNumerals, Number, Numerals } from "../../components";
	import type { Translation } from "../../translations/types";
	import styles from "./disassembling-number.module.css";

	export let radixOutput = 10;
	export let inputNumber = "1234";
	export let showPower = false;

	const t = getContext<Translation>("t");

	let valid = true;

	$: number = radix(inputNumber, 10);
	$: numberOutput = number.setRadix(radixOutput);
</script>

<!--
	Disassembling the number into radix powers demonstration.
-->
<section class="wide interactive {styles.wrapper}">
	<h4>{t.TITLE_DISASSEMBLING_NUMBER}</h4>
	{#if valid}
		<Number
			number="{number.toString()}"
			radix="{radixOutput}"
		/>
		<Numerals
			numerals="{[ ...numberOutput ]}"
			radix="{radixOutput}"
			{showPower}
		/>
	{/if}
	<FormNumerals
		bind:number="{inputNumber}"
		bind:radix="{radixOutput}"
		bind:valid
		{t}
	>
		<InputSwitch bind:checked="{showPower}">
			{t.POWER}
		</InputSwitch>
	</FormNumerals>
</section>
