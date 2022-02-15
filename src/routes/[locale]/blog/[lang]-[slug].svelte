<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ params }) => {
		const { lang = "en", slug } = params;

		try {
			let post = await import(`../../../content/blogpost/${slug}/index-${lang}.svx`);
			return {
				props: {
					Post: post.default
				}
			};
		} catch (error) {
			return {
				status: 404,
				error: "Page Not Found"
			};
		}
	};
</script>

<script>
	export let Post;
</script>

<Post />