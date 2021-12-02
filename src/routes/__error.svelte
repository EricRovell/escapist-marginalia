<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	import { Meta } from "@components";

	export let title;
</script>

<Meta
	title={title}
	meta={{
		robots: "noindex, nofollow"
	}}
/>

<h1>{title}</h1>