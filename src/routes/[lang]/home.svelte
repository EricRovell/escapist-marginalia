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

<script>
	import { pathBlogpost } from "@paths";
	import { Card, Timeline } from "@components";
	import { locale, lang, _ } from "@core/i18n";
	import { page } from "$app/stores";

	export let posts = [];

	$: $locale = $page.params.lang;
	$: filteredPosts = posts.filter(post => post.lang === $lang);
</script>

<Timeline.Container>
	{#each filteredPosts as { title, date, slug } (slug)}
		<Timeline.Item {date} locale={$lang} action={$_("message.blogpost")}>
			<Card
				{title}
				href={pathBlogpost(slug)}
			/>
		</Timeline.Item>
	{/each}
</Timeline.Container>