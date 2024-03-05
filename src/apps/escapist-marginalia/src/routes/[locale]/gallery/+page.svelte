<script lang="ts">
	import { Gallery } from "ui";

	import { PageMeta } from "@components";
	import { t } from "@core/i18n";
	import { LayoutPage } from "@layout";
	import type { PageData } from "./$types";

	export let data: PageData = {
		items: []
	};
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
	<Gallery items={data.items}	/>
</LayoutPage>
