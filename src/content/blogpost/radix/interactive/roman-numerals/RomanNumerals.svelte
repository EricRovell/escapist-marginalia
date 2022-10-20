<script lang="ts">
	import { InputNumber } from "@components";
	import { arabic2romans } from "./romans";
	import styles from "./roman-numerals.module.css";

	export let number = 0;
	export let t: Record<string, string>;

	$: roman = arabic2romans(number);
</script>

<section class="wide interactive">
	<h4>{t.title}</h4>
	<output class="{styles.romans}">
		{#if roman}
			{roman}
		{:else}
			N
		{/if}
	</output>
	<form class="{styles.form}" on:submit|preventDefault>
		<InputNumber bind:value="{number}" min="{1}" max="{3999}">
			{t.arabic}
		</InputNumber>
	</form>
</section>
