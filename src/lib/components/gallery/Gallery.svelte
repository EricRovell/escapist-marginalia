<script context="module" lang="ts">
	import type { GalleryItem, GetSrc } from "./Gallery.types";
</script>

<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import Picture from "./GalleryItem.svelte";
	import Modal from "../modal/Modal.svelte";
	import Image from "../image/Image.svelte";
	import styles from "./gallery.module.css";

	export let cellScale = 400;
	export let cellSize = 100;
	export let getSrc: GetSrc;
	export let items: GalleryItem[] = [];

	let preview: GalleryItem | null = null;

	afterNavigate(() => {
		const photoID = new URLSearchParams(window.location.search).get("id") ?? null;
		if (photoID) {
			preview = items.filter(({ id }) => id === photoID)[0];
		}
	});
</script>

<!--
	Responsive Gallery
	Idea source: https://www.samdawson.dev/article/auto-flow-dense-varying-image-sizes
-->
<ul class={styles.gallery} style="--cell-size: {cellSize}px;">
	{#each items as item}
		{@const { id, width = 400, height = 400, title } = item}
		<Picture {id} {cellScale} {width} {height}>
			<Image
				src={getSrc(item)}
				{...item}
			/>
			<svelte:fragment slot="caption">
				{title}
			</svelte:fragment>
		</Picture>
	{/each}
</ul>

<!--
	Fullscreen Preview
-->
<Modal open={Boolean(preview)} on:close={() => window.history.go(-1)}>
	<Image
		className={"modal-image"}
		src={`${preview.path}.${preview.format}`}
		{...preview}
	/>
</Modal>