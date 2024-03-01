<script>
	import { PageLayout } from "@layout";

	export let data;
</script>

<PageLayout {...data.metadata}>
	<svelte:component this={data.page} />
</PageLayout>
