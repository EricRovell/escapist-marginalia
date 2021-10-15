<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const res = await fetch("/api/blog/series.json");

		if (res.ok) {
			return {
				props: {
					catalogue: await res.json()
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
	import { Card } from "@components";
	import { pathBlogpost } from "@core/paths";

	export let catalogue = {};

	console.log(Object.entries(catalogue));
</script>

<main>
	{#each Object.entries(catalogue) as [ series, posts ]}
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
		width: 100%;
	}

	h2 {
		background-color: var(--color-surface-300);
		padding: 0.75rem;
		margin-bottom: 1rem;
	}

	section > div {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
		gap: 1rem;
	}
</style>