<script context="module">
	export async function load({ params }) {
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
	}
</script>

<script>
	export let Post;
</script>

<Post />