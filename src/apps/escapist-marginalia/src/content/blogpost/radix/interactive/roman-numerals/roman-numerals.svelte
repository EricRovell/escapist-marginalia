<script lang="ts">
	import { getContext } from "svelte";
	import { InputNumber } from "ui";

	import { arabic2romans } from "./romans";
	import type { Translation } from "../../translations/types";
	import styles from "./roman-numerals.module.css";

	export let number = 0;

	const t = getContext<Translation>("t");

	let valid = true;

	const VALIDATORS = [
		(value: number) => ({
			valid: value > 0 && value < 4000,
			message: t["invalid-value-message"]
		})
	];

	$: roman = arabic2romans(number);
</script>

<section class="wide interactive">
	<h4>{t.TITLE_ROMAN_NUMERALS}</h4>
	<output class="{styles.romans} wide">
		{#if roman && valid}
			{roman}
		{:else}
			N
		{/if}
	</output>
	<form class="{styles.form}" on:submit|preventDefault>
		<InputNumber
			bind:value="{number}"
			bind:valid
			min="{1}"
			max="{3999}"
			validators="{VALIDATORS}"
		>
			{t.ARABIC}
		</InputNumber>
	</form>
</section>
