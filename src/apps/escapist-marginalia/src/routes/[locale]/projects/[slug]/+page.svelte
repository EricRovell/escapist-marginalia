<script>
	import { ProjectLayout } from "@layout";

	export let data;
</script>

<ProjectLayout metadata={data.metadata}>
	<svelte:component this={data.page} />
</ProjectLayout>
