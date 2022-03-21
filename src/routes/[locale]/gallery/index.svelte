<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ fetch }) => {
		const res = await fetch("/api/photos.json");
		const photos: GalleryItem[] = await res.json();

		if (res.ok) {
			return {
				props: {
					photos
				}
			};
		}

		return {
			status: res.status,
			error: new Error("Could not load URL")
		};
	};
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import { PageMeta, Gallery, Image, Modal } from "@components";
	import { fetchJSON } from "@lib/util";
	import type { GalleryItem } from "@components";

	export let photos: GalleryItem[] = [];

	$: id = $page.url.searchParams.get("id");

	const getModalImage = async (id: string) => (
		await fetchJSON<GalleryItem>(`/api/photos/${id}.json`)
	);
</script>

<PageMeta route="gallery" />

<main>
	<Gallery
		items={photos}
		getSrc={({ path, format }) => `${path}.${format}`}
	/>
</main>

<Modal open={Boolean(id)} on:close={() => window.history.go(-1)}>
	{#await getModalImage(id) then photo}
		<Image
			className={"modal-image"}
			src={`${photo.path}.${photo.format}`}
			{...photo}
		/>
	{/await}
</Modal>

<style>
	main {
		display: flex;
		justify-self: center;
		justify-items: center;
		padding: var(--space-l);
		width: min(100%, 1800px);
	}

	@media screen and (max-width: 599px) {
		main {
			padding: var(--space-s);
		}
	}
</style>