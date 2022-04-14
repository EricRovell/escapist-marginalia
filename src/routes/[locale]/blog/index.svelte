<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ fetch }) => {
		const res = await fetch("/api/blog/posts.json");

		if (res.ok) {
			return {
				props: {
					posts: await res.json()
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
	import { PageMeta, Card, SwitchGroup } from "@components";
	import { LayoutPage } from "@layout";
	import { pathBlogpost } from "@core/paths";
	import { t, locale } from "@core/i18n";
	import { find } from "@utils/query";
	import { iconPi, iconImg, iconNumberE, iconGlobe } from "@lib/components/icons/default";
	import styles from "./.blog.module.css";	

	import type { Blogpost } from "../../../types";
	import type { QueryOption } from "@utils/query";

	export let posts: Blogpost[] = [];

	type Query<T> = {
		"content-lang": QueryOption<string[], T>;
		"content-topics": QueryOption<string[], T>;
		"content-series": QueryOption<string[], T>;
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

	$: content = find(posts, queryOptions);
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
		<main class="grid-flexible">
			{#each content as { title, slug, created }}
				<Card
					{title}
					href={$pathBlogpost(slug)}
					date={created}
				/>
			{/each}
		</main>
		<aside class={styles.sidebar}>
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
		</aside>
	</div>
</LayoutPage>