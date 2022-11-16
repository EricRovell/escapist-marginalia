<script lang="ts">
	import { t } from "@core/i18n";
	import { CardSketch, PageMeta } from "@components";
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
			<main class="grid-flexible" style="--item-size: 25ch">
				{#each data.items as { title, slug, cover, description }}
					<CardSketch
						{cover}
						{description}
						{title}
						url="{slug}"
					/>
				{/each}
			</main>
		</div>
</LayoutPage>
