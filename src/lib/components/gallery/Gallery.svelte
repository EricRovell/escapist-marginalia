<script context="module" lang="ts">
	import type { GalleryItem, GetSrc } from "./Gallery.types";
</script>

<script lang="ts">
	import Picture from "./GalleryItem.svelte";
	import { Image } from "../Image";
	import Modal from "../modal/Modal.svelte";
	import styles from "./gallery.module.css";

	export let cellScale = 400;
	export let cellSize = 100;
	export let getSrc: GetSrc;
	export let items: GalleryItem[] = [];

	let modalOpened = false;
	let modalImage: GalleryItem;

	const openModal = (index: number) => {
		modalImage = items[index];
		modalOpened = true;
	};
</script>

<!--
	Responsive Gallery
	Idea source: https://www.samdawson.dev/article/auto-flow-dense-varying-image-sizes
-->
<ul class={styles.gallery} style="--cell-size: {cellSize}px;">
	{#each items as item, index}
		{@const { width = 400, height = 400, title } = item}
		<Picture {cellScale} {width} {height} on:click={() => openModal(index)}>
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

<Modal bind:open={modalOpened}>
	<Image
		className={styles["modal-image"]}
		src={getSrc(modalImage)}
		{...modalImage}
	/>
</Modal>