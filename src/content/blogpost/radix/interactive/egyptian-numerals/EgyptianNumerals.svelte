<script lang="ts">
	import { numerals } from "./egyptian.constants";
	import styles from "./egyptian-numerals.module.css";
</script>

<ol class="{styles.numerals}">
	{#each numerals as numeral, i}
		<li>
			<span class="{styles.icon}">{@html numeral}</span>
			<span class="{styles.value}">{10 ** i}</span>
		</li>
	{/each}
</ol>
