<script context="module" lang="ts">
	import type { GalleryItem as GalleryItemType, GetSrc } from "./Gallery.types";
</script>

<script lang="ts">
	import GalleryItem from "./GalleryItem.svelte";
	import Image from "../image/Image.svelte";
	import styles from "./gallery.module.css";

	export let getSrc: GetSrc = (item: GalleryItemType) => item.thumb.src;
	export let items: GalleryItem[] = [];
</script>

<ul class={styles.gallery}>
	{#each items as item}
	{@const { id, title, description } = item}
		<li class={styles["gallery-item"]}>
			<GalleryItem {id} dominant="rgb({item.dominant}, 0.65)">
				<Image
					alt={description}
					height={item.thumb.height}
					lazy
					src={getSrc(item)}
					width={item.thumb.width}
				/>
				<svelte:fragment slot="caption">
					{title}
				</svelte:fragment>
			</GalleryItem>
		</li>
	{/each}
</ul>
