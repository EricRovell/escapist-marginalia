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
	import { groupBy } from "@lib/util";
	import type { Blogpost } from "../../types";

	export let posts: Blogpost[] = [];

	$: groupedPosts = Object.entries(groupBy(posts, post => post.series));
</script>

<main>
	{#each groupedPosts as [ series, posts ]}
		<section>
			<h2>{series}</h2>
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
	}

	section > div {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
		gap: var(--space-m);
	}
</style>