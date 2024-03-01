<script lang="ts">
	import { InputNumber } from "@components";
	import InputNumerals from "./InputNumerals.svelte";
	import styles from "./form-numerals.module.css";

	export let number = "0";
	export let radix = 10;
	export let t: Record<string, string>;

	let validNumber = true;
	let validRadix = true;

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
		{t.number}
	</InputNumerals>
	<InputNumber
		bind:value="{radix}"
		bind:valid="{validRadix}"
		min="{2}"
		max="{64}"
		validators="{[
			(value) => ({
				valid: Number.isInteger(value) && value > 1 && value <= 64,
				message: "Number should be a positive integer in range 2 ... 64"
			})
		]}"
	>
		{t.radix}
	</InputNumber>
	<slot />
</form>
