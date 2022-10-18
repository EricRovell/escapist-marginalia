<script lang="ts">
	import { radix } from "@ericrovell/radix";
	import { numerals } from "./egyptian.constants";

	export let number = 1234;

	$: ranks = radix(number).getRanks();
</script>

<ol class="number">
	{#each ranks as rank, i}
		{#if rank}
			<li class="rank">
				{#each { length: rank } as _}
					<span>
						{@html numerals[ranks.length - i - 1]}
					</span>
				{/each}
			</li>
		{/if}
	{/each}
</ol>

<style>
	.number {
		display: flex;
		gap: var(--space-2-rel);
		justify-content: center;
		height: min-content;
	}

	.rank {
		display: flex;
		font-size: 4rem;
	}
</style>
