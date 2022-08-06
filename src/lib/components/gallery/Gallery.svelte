<script context="module" lang="ts">
	import type { GalleryItem, GetSrc } from "./Gallery.types";
</script>

<script lang="ts">
	import Picture from "./GalleryImage.svelte";
	import Image from "../image/Image.svelte";
	import Grid from "./Grid.svelte";
	import Switch from "../switch/Switch.svelte";
	import Icon from "../icons/Icon.svelte";
	import { iconMasonry } from "../icons/default";
	import styles from "./gallery.module.css";

	export let getSrc: GetSrc = (item: GalleryItem) => item.thumb.src;
	export let items: GalleryItem[] = [];
	export let masonry = false;
</script>

<section class={styles.container}>
	<aside class={styles["control-panel"]}>
		<Switch bind:checked={masonry} className="card">
			<Icon path={iconMasonry} />
			Masonry
		</Switch>
	</aside>
	<Grid {items} {masonry} let:item>
		{@const { id, title, description } = item}
		<Picture {id} dominant="rgb({item.dominant}, 0.65)">
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
		</Picture>
	</Grid>
</section>
