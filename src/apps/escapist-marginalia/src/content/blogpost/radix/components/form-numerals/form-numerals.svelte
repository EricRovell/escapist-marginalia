<script lang="ts">
	import { getContext } from "svelte";
	import { InputNumber } from "ui";

	import InputNumerals from "./input-numerals.svelte";
	import type { Translation } from "../../translations/types";
	import styles from "./form-numerals.module.css";

	export let number = "0";
	export let radix = 10;
	export let t = getContext<Translation>("t");

	let validNumber = true;
	let validRadix = true;

	const VALIDATORS = [
		(value: number) => ({
			valid: Number.isInteger(value) && value > 1 && value <= 64,
			message: "Number should be a positive integer in range 2 ... 64"
		})
	];

	export let valid = validNumber && validRadix;

	$: {
		validNumber,
		validRadix,
		valid = validNumber && validRadix;
	}
</script>

<form on:submit|preventDefault class="{styles.form}">
	<InputNumerals
		bind:value="{number}"
		bind:valid="{validNumber}"
		min="{0}"
		max="{100000}"
		{radix}
	>
		{t.NUMBER}
	</InputNumerals>
	<InputNumber
		bind:value="{radix}"
		bind:valid="{validRadix}"
		min="{2}"
		max="{64}"
		validators="{VALIDATORS}"
	>
		{t.RADIX}
	</InputNumber>
	<slot />
</form>
