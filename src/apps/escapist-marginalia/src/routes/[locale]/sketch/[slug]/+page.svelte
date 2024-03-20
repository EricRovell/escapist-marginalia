<script>
	import { Context } from "ui";
	import { SketchLayout } from "@layout";

	export let data;
</script>

<Context key="t" value="{data.translation}">
	<SketchLayout metadata={data.metadata}>
		<svelte:fragment slot="sketch">
			<svelte:component this={data.sketch} t={data.translation} />
		</svelte:fragment>
		<svelte:component this={data.page} />
	</SketchLayout>
</Context>
