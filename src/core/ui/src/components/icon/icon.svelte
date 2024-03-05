<script lang="ts">
	export let title: string | undefined = undefined;
	export let viewBox = "0 0 100 100";
	export let path: string;
</script>

<svelte:options namespace="svg" />

<svg
	aria-labelledby={title ?? null}
	role="presentation"
	{viewBox}
>
		{#if title}
			<title>{title}</title>
		{/if}
		<path d={path} />
</svg>

<style>
	svg {
		aspect-ratio: 1 / 1;
		width: var(--icon-size, 1em);
		height: var(--icon-size, 1em);
		fill: var(--icon-color, currentColor);
	}
</style>
