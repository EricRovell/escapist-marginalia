<script lang="ts">
	import { t } from "@core/i18n";
	import { Card, PageMeta } from "$lib/components";
	import { LayoutPage } from "@layout";
	import type { PageLoad } from "./$types";
	import styles from "./sketch.module.css";

	export let data: PageLoad = {};
</script>

<PageMeta route="sketch" />

<LayoutPage>
	<svelte:fragment slot="banner">
		<h1 class="headline">
			{$t("pages.sketch.title")}
		</h1>
		<p class="headline">
			{$t("pages.sketch.description")}
		</p>
	</svelte:fragment>
		<div class="{styles.layout}">
			<main class="grid-flexible" style="--item-size: 15rem">
				{#each data.items as { cover, dateUpdated, title, description, slug }}
					<Card
						{cover}
						date="{dateUpdated}"
						{description}
						href="{slug}"
						{title}
					/>
				{/each}
			</main>
		</div>
</LayoutPage>
