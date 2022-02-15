<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ fetch }) => {
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
	};
</script>

<script lang="ts">
	import styles from "@styles/pages/home.module.css";
	import { pathBlogpost } from "@paths";
	import { PageMeta, Link, Timeline, Datetime } from "@components";
	import { ContentFilter } from "@lib/layout";
	import { locale, t } from "@core/i18n";
	import { groupBy } from "@lib/util";
	import type { Blogpost } from "../../types";

	export let posts: Blogpost[] = [];

	let contentLanguage: string[] = [ $locale ];
	let filteredPosts: Blogpost[];
	let groupedByYear: Record<number, Blogpost[]>;

	$: filteredPosts = posts.filter(post => contentLanguage.includes(post.lang));
	$: groupedByYear = groupBy(filteredPosts, post => new Date(post.created).getFullYear());
</script>

<PageMeta route="home" />

<!--
	Note:
	
	Posts from API are sorted by date. Nevertheless, after gouping them by a year,
	object keys are sorted ASC. Have to reverse the entries.
-->
<div class={styles.layout}>
	<ContentFilter bind:contentLanguage>
		<Timeline.Container>
			{#each Object.entries(groupedByYear).reverse() as [ year, posts ]}
				<Timeline.Section>
					<svelte:fragment slot="header">
						<Datetime date={year} options={{ year: "numeric" }} />
					</svelte:fragment>
					{#each posts as { title, slug, created } (slug)}
						<Timeline.Item>
							<article>
								<footer>
									<Datetime
										date={created}
										locale={$locale}
										options={{ month: "long", day: "numeric" }} />, {$t("message.blogpost")}
								</footer>
								<Link	href={$pathBlogpost(slug)}>
									{title}
								</Link>
							</article>
						</Timeline.Item>
					{/each}
				</Timeline.Section>
			{/each}
		</Timeline.Container>
	</ContentFilter>
</div>

<style>
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