<script lang="ts">
	import styles from "./numerals.module.css";

	export let codes: string[] = [];
	export let calcValue = (i: number) => 10 ** i;
</script>

<!--
	Renders the Unicode HTML codes.
-->
<ol class="{styles.numerals}">
	{#each codes as numeral, i}
		<li>
			<span class="{styles.icon}">{@html numeral}</span>
			<span class="{styles.value}">
				{calcValue(i)}
			</span>
		</li>
	{/each}
</ol>
