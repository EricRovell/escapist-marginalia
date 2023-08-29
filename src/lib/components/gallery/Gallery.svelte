<script context="module" lang="ts">
	import type { GalleryItem as GalleryItemType, GetSrc } from "./Gallery.types";
</script>

<script lang="ts">
	import GalleryItem from "./GalleryItem.svelte";
	import Image from "../image/Image.svelte";
	import styles from "./gallery.module.css";

	export let getSrc: GetSrc = (item: GalleryItemType) => `${item.thumbnail.src}.jpeg`;
	export let items: GalleryItem[] = [];
</script>

<ul class={styles.gallery}>
	{#each items as item}
	{@const { title, description, dominant, slug } = item}
		<li class={styles["gallery-item"]}>
			<GalleryItem {slug} dominant="rgb({dominant.r} {dominant.g} {dominant.b} / 0.65)">
				<Image
					alt={description}
					height={item.thumbnail.height}
					lazy
					src="{getSrc(item)}"
					sources="{[
						{
							srcset: `${item.thumbnail.src}.webp`,
							type: "image/webp"
						},
						{
							srcset: `${item.thumbnail.src}.jpeg`,
							type: "image/jpeg"
						}
					]}"
					width={item.thumbnail.width}
				/>
				<svelte:fragment slot="caption">
					<p class="ellipsis">{title}</p>
				</svelte:fragment>
			</GalleryItem>
		</li>
	{/each}
</ul>
