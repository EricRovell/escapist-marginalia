<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const res = await fetch("/api/blog/posts.json?sort=-1");

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
	import { pathBlogpost } from "@paths";
	import { Link, Timeline, Datetime } from "@components";
	import { lang, _ } from "@core/i18n";
	import { groupBy } from "@lib/util";
	import type { Blogpost } from "../../types";

	export let posts: Blogpost[] = [];

	let filteredPosts: Blogpost[];
	let groupedByYear: Record<number, Blogpost[]>;

	$: filteredPosts = posts.filter(post => post.lang === $lang);
	$: groupedByYear = groupBy(filteredPosts, post => new Date(post.date).getFullYear());
</script>

<!--
	Note:
	
	Posts from API are sorted by date. Nevertheless, after gouping them by a year,
	object keys are sorted ASC. Have to reverse the entries.
-->
<main>
	<Timeline.Container>
	{#each Object.entries(groupedByYear).reverse() as [ year, posts ]}
		<Timeline.Section>
			<svelte:fragment slot="header">
				<Datetime date={year} options={{ year: "numeric" }} />
			</svelte:fragment>
			{#each posts as { title, slug, date } (slug)}
				<Timeline.Item>
					<article>
						<footer>
							<Datetime {date} locale={$lang} options={{ month: "long", day: "numeric" }} />, {$_("message.blogpost")}
						</footer>
						<Link	href={pathBlogpost(slug)}>
							{title}
						</Link>
					</article>
				</Timeline.Item>
			{/each}
		</Timeline.Section>
	{/each}
	</Timeline.Container>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 0 var(--space-m);
	}

	article {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	article > footer {
		font-size: var(--font-size-2);
    color: hsl(var(--gray-h) var(--gray-s-700) var(--gray-l-700));
	}
</style>