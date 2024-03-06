<script lang="ts" context="module">
	export type FStop = "F_NUMBER" | "VALUE" | "PROGRESSION";
</script>

<script lang="ts">
	import MathExp from "../math.svelte";

	export let type: FStop = "F_NUMBER";
	export let fstop = 0;
	export let step = [ 1, 1 ];
</script>

{#if step[1] === 1}
	<!-- F-number -->
	{#if type === "F_NUMBER"}
		{Math.trunc((2 ** (fstop / 2)) * 10) / 10}
	{/if}
	<!-- Calculated f-number value-->
	{#if type === "VALUE"}
		{(2 ** (fstop / 2)).toPrecision(4)}
	{/if}
	<!-- f-number as progression member -->
	{#if type === "PROGRESSION"}
		<MathExp math={`(\\sqrt{2})^{${fstop}}`} inline={true} />
	{/if}
{:else}
	<!-- f-number step -->
	{#if type === "F_NUMBER"}
		{@const value = 2 ** (fstop / 2 + (step[0]) / (2 * step[1]))}
		{value.toPrecision(2)}
	{/if}

	<!-- Calculated f-number step value-->
	{#if type === "VALUE"}
		{@const value = 2 ** (fstop / 2 + (step[0]) / (2 * step[1]))}
		{value.toPrecision(4)}
	{/if}

	<!-- f-number-step as progression member -->
	{#if type === "PROGRESSION"}
		<MathExp math={`(\\sqrt{2})^{${fstop}\\frac{${step[0]}}{${step[1]}}}`} inline={true} />
	{/if}
{/if}





