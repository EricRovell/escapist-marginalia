<script lang="ts">
	import { t } from "@core/i18n";
	import { PageMeta, Gallery } from "@components";
	import { LayoutPage } from "@layout";
	import type { GalleryItem } from "@components";

	export let items: GalleryItem[] = [];
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
	<Gallery {items}	/>
</LayoutPage>
