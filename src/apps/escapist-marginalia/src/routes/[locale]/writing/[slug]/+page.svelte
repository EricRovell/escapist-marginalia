<script>
	import { BlogpostLayout } from "@layout";

	export let data;
</script>

<BlogpostLayout metadata={data.metadata}>
	<svelte:component this={data.page} />
</BlogpostLayout>
