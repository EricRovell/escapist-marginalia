<script lang="ts">
	import styles from "./numerals.module.css";

	export let numerals: number[][];
	export let radix: number;
	export let showPower = false;
	export let showZeroRanks = false;
</script>

<!--
	Disassembling the number into radix powers demonstration.
-->
<div class="{styles.wrapper}">
	<ol class="{styles.ranks} custom-scroll inline">
		{#each numerals as [ rank, power ] (`${power}/${rank}`)}
			{#if showZeroRanks || rank}
				<li class="{styles.rank}" class:zero={rank === 0}>
					<span>
						{#if showPower}
							{radix}<sup>{power}</sup>
						{:else}
							{radix ** power}
						{/if}
					</span>
					<span class="{styles["mult"]}">
						{rank}
					</span>
				</li>
			{/if}
		{/each}
	</ol>
</div>
