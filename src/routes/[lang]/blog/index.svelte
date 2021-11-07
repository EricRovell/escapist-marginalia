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
	import { Card } from "@components";
	import { pathBlogpost } from "@core/paths";
	import { _, lang } from "@core/i18n";
	import { groupBy } from "@lib/util";
	import type { Blogpost } from "../../../types";

	export let posts: Blogpost[] = [];

	let filteredPosts: Blogpost[];
	let groupedPosts: Array<[ string, Blogpost[]]>;

	$: filteredPosts = posts.filter(post => post.lang === $lang);
	$: groupedPosts = Object.entries(groupBy(filteredPosts, post => post.series));
</script>

<main>
	{#each groupedPosts as [ series, posts ]}
		<section>
			<h2>
				{$_(`categories.${series}`)}
			</h2>
			<div>
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
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: var(--space-l);
		width: 100%;
	}

	h2 {
		font-size: var(--font-size-6);
		margin-bottom: var(--space-m);
		text-transform: capitalize;
	}

	section > div {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
		gap: var(--space-m);
	}
</style>