<script context="module" lang="ts">
	import { Slidy, classNames } from "@slidy/svelte";
	import type { GalleryItem, GetSrc } from "./Gallery.types";
</script>

<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import Picture from "./GalleryImage.svelte";
	import Modal from "../modal/Modal.svelte";
	import Image from "../image/Image.svelte";
	import Grid from "./Grid.svelte";
	import Switch from "../switch/Switch.svelte";
	import Icon from "../icons/Icon.svelte";
	import { iconMasonry } from "../icons/default";
	import styles from "./gallery.module.css";

	export let getSrc: GetSrc = (item: GalleryItem) => item.src;
	export let items: GalleryItem[] = [];
	export let masonry = false;

	let preview: number | null = null;

	afterNavigate(() => {
		const photoID = new URLSearchParams(window.location.search).get("id") ?? null;
		if (photoID) {
			for (let i = 0; i < items.length; i++) {
				if (items[i].id === photoID) {
					preview = i;
				}
			}
		}
	});
</script>

<section class={styles.container}>
	<aside class={styles["control-panel"]}>
		<Switch bind:checked={masonry} className="card">
			<Icon path={iconMasonry} />
			Masonry
		</Switch>
	</aside>
	<Grid {items} {masonry} let:item>
		{@const { id, title } = item}
		<Picture {id}>
			<Image src={getSrc(item)}	{...item} />
			<svelte:fragment slot="caption">
				{title}
			</svelte:fragment>
		</Picture>
	</Grid>
</section>

<!--
	Fullscreen Preview
-->
<Modal open={Number.isInteger(preview)} on:close={() => window.history.go(-1)}>
	<Slidy
		classNames={{
			...classNames,
			root: `${classNames.root} ${styles.modal}`
		}}
		slides={items}
		index={preview}
		snap="center"
		thumbnail
	/>
</Modal>