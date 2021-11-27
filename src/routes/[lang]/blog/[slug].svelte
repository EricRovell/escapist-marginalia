<script context="module">
	export async function load({ page }) {
		try {
			let post = await import(`../../../content/${page.params.slug}.svx`);
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