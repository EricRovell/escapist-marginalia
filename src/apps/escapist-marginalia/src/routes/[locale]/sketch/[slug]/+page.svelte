<script>
	import { SketchLayout } from "@layout";

	export let data;
</script>

<SketchLayout metadata={data.metadata}>
	<svelte:fragment slot="sketch">
		<svelte:component this={data.sketch} t={data.translation} />
	</svelte:fragment>
	<svelte:component this={data.page} />
</SketchLayout>
