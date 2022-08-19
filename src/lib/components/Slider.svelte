<script lang="ts">
	export let name: string;
	export let value: number;
	export let min: number;
	export let max: number;
	export let step: number | undefined = undefined;
</script>

<input
	class="slider"
	type="range"
	{name}
	bind:value
	{min}
	{max}
	{step}
/>

<style>
	.slider {
		width: 100%;
	}

	.slider:hover {
		cursor: grab;
	}

	.slider:active {
		cursor: grabbing;
	}
</style>