<script lang="ts" context="module">
	export type FStop = "f-number" | "value" | "progression";
</script>

<script lang="ts">
	import { MathExp } from "@components";

	export let type: FStop = "f-number";
	export let fstop = 0;
	export let step = [ 1, 1 ];
</script>

{#if step[1] === 1}

	<!-- F-number -->
	{#if type === "f-number"}
		{Math.trunc((2 ** (fstop / 2)) * 10) / 10}
	{/if}

	<!-- Calculated f-number value-->
	{#if type === "value"}
		{(2 ** (fstop / 2)).toPrecision(4)}
	{/if}

	<!-- f-number as progression member -->
	{#if type === "progression"}
		<MathExp math={`(\\sqrt{2})^{${fstop}}`} inline={true} />
	{/if}

{:else}

	<!-- f-number step -->
	{#if type === "f-number"}
		{@const value = 2 ** (fstop / 2 + (step[0]) / (2 * step[1]))}
		{value.toPrecision(2)}
	{/if}

	<!-- Calculated f-number step value-->
	{#if type === "value"}
		{@const value = 2 ** (fstop / 2 + (step[0]) / (2 * step[1]))}
		{value.toPrecision(4)}
	{/if}

	<!-- f-number-step as progression member -->
	{#if type === "progression"}
		<MathExp math={`(\\sqrt{2})^{${fstop}\\frac{${step[0]}}{${step[1]}}}`} inline={true} />
	{/if}

{/if}





