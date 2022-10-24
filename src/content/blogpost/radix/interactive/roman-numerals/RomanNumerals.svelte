<script lang="ts">
	import { InputNumber } from "@components";
	import { arabic2romans } from "./romans";
	import styles from "./roman-numerals.module.css";

	export let number = 0;
	export let t: Record<string, string>;

	let valid = true;

	$: roman = arabic2romans(number);
</script>

<section class="wide interactive">
	<h4>{t.title}</h4>
	<output class="{styles.romans}">
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
			validators="{[
				(value) => ({
					valid: value > 0 && value < 4000,
					message: t["invalid-value-message"]
				})
			]}"
		>
			{t.arabic}
		</InputNumber>
	</form>
</section>
