<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
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
	}
</script>

<script lang="ts">
	import styles from "@styles/pages/blog.module.css";
	import { Card } from "@components";
	import { ContentFilter } from "@lib/layout";
	import { pathBlogpost } from "@core/paths";
	import { _, lang } from "@core/i18n";
	import { groupBy } from "@lib/util";
	import type { Blogpost } from "../../../types";

	export let posts: Blogpost[] = [];

	let contentLanguage: string[] = [ $lang ];
	let filteredPosts: Blogpost[];
	let groupedPosts: Array<[ string, Blogpost[]]>;

	$: filteredPosts = posts.filter(post => contentLanguage.includes(post.lang));
	$: groupedPosts = Object.entries(groupBy(filteredPosts, post => post.series));
</script>

<div class={styles.layout}>
	<ContentFilter bind:contentLanguage>
		{#each groupedPosts as [ series, posts ]}
			<section>
				<h2>{$_(`categories.${series}`)}</h2>
				<div class={styles.posts}>
					{#each posts as { title, slug, date }}
						<Card
							{title}
							href={pathBlogpost(slug)}
							{date}
						/>
					{/each}
				</div>
			</section>
		{/each}
	</ContentFilter>
</div>