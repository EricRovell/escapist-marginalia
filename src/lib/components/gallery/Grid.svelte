<script context="module" lang="ts">
	import type { GalleryItem } from "./Gallery.types";

	import { getMasonryItemSpan } from "./Gallery.helpers";
</script>

<script lang="ts">
	import styles from "./grid.module.css";

	export let items: GalleryItem[] = [];
	export let masonry = false;
	export let masonryScale: number | undefined = 100;
</script>

<!--
	Responsive Gallery
	Idea source: https://www.samdawson.dev/article/auto-flow-dense-varying-image-sizes
-->
<ul class={styles.gallery} class:masonry>
	{#each items as item}
		{@const masonryItemSpan = masonry ? getMasonryItemSpan(item.thumb, masonryScale) : undefined}
		<li class={styles["gallery-item"]} style={masonryItemSpan}>
			<slot {item} />
		</li>
	{/each}
</ul>
