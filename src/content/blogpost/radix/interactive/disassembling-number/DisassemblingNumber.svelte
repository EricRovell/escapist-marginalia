<script lang="ts">
	import { radix } from "@ericrovell/radix";
	import { Switch } from "@components";
	import { FormNumerals, Number, Numerals } from "../../components";
	import styles from "./disassembling-number.module.css";

	export let radixOutput = 10;
	export let inputNumber = "1234";
	export let showPower = false;
	export let t: Record<string, string>;

	let valid = true;

	$: number = radix(inputNumber, 10);
	$: numberOutput = number.setRadix(radixOutput);
</script>

<!--
	Disassembling the number into radix powers demonstration.
-->
<section class="wide interactive {styles.wrapper}">
	<h4>{t.title}</h4>
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
		<Switch bind:checked="{showPower}">
			{t.power}
		</Switch>
	</FormNumerals>
</section>
