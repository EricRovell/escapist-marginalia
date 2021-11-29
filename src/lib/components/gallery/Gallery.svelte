<script context="module" lang="ts">
	export interface GalleryItem {
		href: string;
		format: string;
		width: number;
		height: number;
		alt: string;
	}

	function getItemsSpan({ width, height }: Pick<GalleryItem, "width" | "height">, cellSize = 400): string {
		const columnSpan = Math.floor(width / cellSize);
		const rowSpan = Math.floor(height / cellSize);
		return `--column-end: span ${columnSpan}; --row-end: span ${rowSpan};`;
	}
</script>

<script lang="ts">
	import styles from "./gallery.module.css";
	import Image from "@lib/components/Image.svelte";

	export let items: GalleryItem[] = [];
	export let cellScale = 400;
	export let cellSize = 100;
</script>

<!--
	Responsive Gallery
	Idea source: https://www.samdawson.dev/article/auto-flow-dense-varying-image-sizes
-->
<ul class={styles.gallery} style="--cell-size: {cellSize}px;">
	{#each items as { href, format, width, height, alt }}
		<li style={getItemsSpan({ width, height }, cellScale)}>
			<Image
				src={`${href}.${format}`}
				{width}
				{height}
				{alt}
			/>
		</li>
	{/each}
</ul>