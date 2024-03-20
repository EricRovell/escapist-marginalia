<script lang="ts">
	import { Button, Drawer } from "ui";

	import { PageMeta, Card } from "$lib/components";
	import { LayoutPage } from "@layout";
	import { t, locale, i18nTemplate } from "@core/i18n";
	import { pathBlogpost } from "@paths";
	import { FilterWriting } from "@views";
	import { find, type QueryItem } from "$lib/utils";
	import styles from "./writing.module.css";

	import type { Blogpost } from "../../../types";
	import type { PageLoad } from "./$types";

	export let data: PageLoad = {};

	let filterQuery = {
		"content-lang": [ $locale ],
		"content-topics": []
	};

	type Query<T> = {
		"content-lang": QueryItem<string[], T>;
		"content-topics": QueryItem<string[], T>;
	}

	$: content = find(data.items, {
		"content-lang": {
			value: filterQuery["content-lang"],
			validator: (value) => Array.isArray(value) && value.length > 0,
			matcher: (value) => (item) => value.includes(item.lang)
		},
		"content-topics": {
			value: filterQuery["content-topics"],
			validator: (value) => Array.isArray(value) && value.length > 0,
			matcher: (value) => (item) => value.every(keyword => item.keywords.includes(keyword))
		}
	} as Query<Blogpost>) ?? [];

	// show filters drawer for small screens
	let show = false;
</script>

<PageMeta route="blog" />

<LayoutPage>
	<svelte:fragment slot="banner">
		<h1 class="headline">
			{$t("pages.blog.title")}
		</h1>
		<p class="headline">
			{$t("pages.blog.description")}
		</p>
	</svelte:fragment>
	<div class={styles.layout}>
		<main class="grid-flexible" style="--item-size: 24ch">
			<aside class={styles.counter}>
				{i18nTemplate($t("message.blogpost-counter"), [ content.length, data.items.length ])}:
			</aside>
			{#each content as { cover, dateCreated, description, keywords, title, slug }}
				<Card
					{cover}
					date="{dateCreated}"
					{description}
					href="{$pathBlogpost(slug)}"
					{keywords}
					{title}
				/>
			{/each}
		</main>
		<Button
			appearance="outline"
			className="{styles["filters-toggle"]}"
			on:click="{() => show = !show}"
		>
			{$t("dict.blogpost-filters")}
		</Button>
		<Drawer bind:show name="filters-writing">
			<h2 slot="header">Filters</h2>
			<FilterWriting
				bind:value="{filterQuery}"
			/>
		</Drawer>
		<aside>
			<h4>Filters</h4>
			<FilterWriting
				bind:value="{filterQuery}"
			/>
		</aside>
	</div>
</LayoutPage>
