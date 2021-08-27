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

<script>
	import { pathBlogpost } from "@paths";
	import { Card } from "@components";

	export let posts = [];
</script>

<ul class="posts">
	{#each posts as { title, date, slug }}
		<li class="post">
			<Card
				{title}
				{date}
				href={pathBlogpost(slug)}
			/>
		</li>
	{/each}
</ul>

<style>
	.posts {
		display: grid;
		justify-self: center;
		gap: var(--spacing-4);
	}
</style>