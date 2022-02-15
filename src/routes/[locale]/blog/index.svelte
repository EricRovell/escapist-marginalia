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
	import styles from "@styles/pages/blog.module.css";
	import { PageMeta, Card } from "@components";
	import { ContentFilter } from "@lib/layout";
	import { pathBlogpost } from "@core/paths";
	import { t, locale } from "@core/i18n";
	import { groupBy } from "@lib/util";
	import type { Blogpost } from "../../../types";

	export let posts: Blogpost[] = [];

	let contentLanguage: string[] = [ $locale ];
	let filteredPosts: Blogpost[];
	let groupedPosts: Array<[ string, Blogpost[]]>;

	$: filteredPosts = posts.filter(post => contentLanguage.includes(post.lang));
	$: groupedPosts = Object.entries(groupBy(filteredPosts, post => post.series));
</script>

<PageMeta route="blog" />

<div class={styles.layout}>
	<ContentFilter bind:contentLanguage>
		{#each groupedPosts as [ series, posts ]}
			<section>
				<h2>{$t(`categories.${series}`)}</h2>
				<div class={styles.posts}>
					{#each posts as { title, slug, created }}
						<Card
							{title}
							href={$pathBlogpost(slug)}
							date={created}
						/>
					{/each}
				</div>
			</section>
		{/each}
	</ContentFilter>
</div>