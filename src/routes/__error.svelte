<script context="module" lang="ts">
	import type { ErrorLoad } from "@sveltejs/kit";

	export const load: ErrorLoad = ({ error, status }) => {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	};
</script>

<script lang="ts">
	import { Meta } from "@components";

	export let title: string;
</script>

<Meta
	title={title}
	meta={{
		robots: "noindex, nofollow"
	}}
/>

<h1>{title}</h1>