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
	import { Card, Timeline } from "@components";

	export let posts = [];
</script>

<Timeline.Container>
	{#each posts as { title, date, slug }}
		<Timeline.Item {date}>
			<Card
				{title}
				href={pathBlogpost(slug)}
			/>
		</Timeline.Item>
	{/each}
</Timeline.Container>