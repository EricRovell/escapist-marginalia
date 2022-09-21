<script lang="ts">
	import { Button, Drawer, PageMeta, CardArticle, SwitchGroup } from "@components";
	import { LayoutPage } from "@layout";
	import { t, locale, i18nTemplate } from "@core/i18n";
	import { find } from "@utils/query";
	import { iconPi, iconImg, iconNumberE, iconGlobe } from "@lib/components/icons/default";
	import styles from "./blog.module.css";

	import type { Blogpost } from "../../../types";
	import type { QueryItem } from "@utils/query";
	import type { PageLoad } from "./$types";

	export let data: PageLoad = {};

	type Query<T> = {
		"content-lang": QueryItem<string[], T>;
		"content-topics": QueryItem<string[], T>;
		"content-series": QueryItem<string[], T>;
	}

	const queryOptions: Query<Blogpost> = {
		"content-lang": {
			value: [ $locale ],
			validator: (value) => value.length > 0,
			matcher: (value) => (item) => value.includes(item.lang)
		},
		"content-topics": {
			validator: (value) => value.length > 0,
			matcher: (value) => (item) => value.every(keyword => item.keywords.includes(keyword))
		},
		"content-series": {
			validator: (value) => value.length > 0,
			matcher: (value) => (item) => item.series === value[0]
		}
	};

	$: content = find(data.items, queryOptions);

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
		<main class="grid-flexible" style="--item-size: 25ch">
			<aside class={styles.counter}>
				{i18nTemplate($t("message.blogpost-counter"), [ content.length, data.items.length ])}:
			</aside>
			{#each content as { created, description, keywords, title, slug }}
				<CardArticle
					{created}
					{description}
					{keywords}
					{title}
					{slug}
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
		<Drawer bind:show>
			<form class="{styles.sidebar}" on:submit|preventDefault>
				<h3>Filters</h3>
				<SwitchGroup
					legend={$t("dict.language")}
					name="content-lang"
					options={[
						{ label: "English", value: "en", checked: $locale === "en" },
						{ label: "Русский", value: "ru", checked: $locale === "ru" }
					]}
					bind:group={queryOptions["content-lang"].value}
				/>
				<SwitchGroup
					legend={$t("dict.topics")}
					name="content-topics"
					options={[
						{ label: $t("dict.math"), value: "math", icon: iconPi },
						{ label: $t("dict.photo"), value: "photo", icon: iconImg },
						{ label: $t("dict.web"), value: "web", icon: iconGlobe }
					]}
					bind:group={queryOptions["content-topics"].value}
				/>
				<SwitchGroup
					legend={$t("dict.series")}
					name="content-series"
					options={[
						{ label: $t("dict.project-euler"), value: "project-euler", icon: iconNumberE },
					]}
					bind:group={queryOptions["content-series"].value}
				/>
			</form>
		</Drawer>
	</div>
</LayoutPage>
