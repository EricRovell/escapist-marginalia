<script context="module" lang="ts">
	export interface GalleryItem {
		path: string;
		format: string;
		width: number;
		height: number;
		alt: string;
	}

	export type GetSrc = (item: GalleryItem) => string;

	function getItemsSpan({ width, height }: Pick<GalleryItem, "width" | "height">, cellSize = 400): string {
		const columnSpan = Math.floor(width / cellSize);
		const rowSpan = Math.floor(height / cellSize);
		return `--column-end: span ${columnSpan}; --row-end: span ${rowSpan};`;
	}
</script>

<script lang="ts">
	import Image from "@lib/components/Image.svelte";
	import Modal from "../modal/Modal.svelte";
	import styles from "./gallery.module.css";

	export let items: GalleryItem[] = [];
	export let cellScale = 400;
	export let cellSize = 100;
	export let getSrc: GetSrc;

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
		<li style={getItemsSpan(item, cellScale)} on:click={() => openModal(index)}>
			<Image
				src={getSrc(item)}
				{...item}
			/>
		</li>
	{/each}
</ul>

<Modal bind:open={modalOpened}>
	<Image
		src={getSrc(modalImage)}
		{...modalImage}
		className={styles["modal-image"]}
	/>
</Modal>