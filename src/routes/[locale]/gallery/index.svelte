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
	import { PageMeta, Gallery } from "@components";
	import type { GalleryItem } from "@components";

	export let photos: GalleryItem[] = [];
</script>

<PageMeta route="gallery" />

<main>
	<Gallery
		items={photos}
		getSrc={({ path, format }) => `${path}.${format}`}
	/>
</main>

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