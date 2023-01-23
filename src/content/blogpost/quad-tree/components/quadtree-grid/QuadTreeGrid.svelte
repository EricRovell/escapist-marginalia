<script lang="ts">
	import styles from "./quadtree-grid.module.css";

	export let bounds = [];
	export let element: SVGElement;
	export let height = 1000;
	export let points = [];
	export let pointsQuery = [];
	export let width = 1000;
</script>

<svg
	viewBox="0 0 {width} {height}"
	class="{styles.quadtree}"
	bind:this="{element}"
	on:pointerdown
	on:pointerleave
	on:pointerenter
>
	{#each bounds as { x, y, width, height }}
		<rect
			class="{styles.bound}"
			{x}
			{y}
			{width}
			{height}
			stroke="var(--surface-1)"
			stroke-opacity="0.5"
			stroke-width="2px"
			fill="none"
		/>
	{/each}
	{#each points as { x, y }}
		<circle
			class="{styles.point}"
			cx="{x}"
			cy="{y}"
			r="{5}"
		/>
	{/each}
	{#each pointsQuery as { x, y }}
		<circle
			class="{styles.point} query"
			cx="{x}"
			cy="{y}"
			r="{6}"
			fill="yellow"
		/>
	{/each}
	<g>
		<slot />
	</g>
</svg>
