<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ fetch }) => {
		const res = await fetch("/api/photos");
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
	import { t } from "@core/i18n";
	import { PageMeta, Gallery } from "@components";
	import { LayoutPage } from "@layout";
	import type { GalleryItem } from "@components";

	export let photos: GalleryItem[] = [];
</script>

<PageMeta route="gallery" />

<LayoutPage>
	<svelte:fragment slot="banner">
		<h1 class="headline">
			{$t("pages.gallery.title")}
		</h1>
		<p class="headline">
			{$t("pages.gallery.description")}
		</p>
	</svelte:fragment>
	<Gallery items={photos}	/>
</LayoutPage>