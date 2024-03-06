<script>
	import { Context } from "ui";

	import { BlogpostLayout } from "@layout";

	export let data;
</script>

<BlogpostLayout metadata={data.metadata}>
	<Context key="t" value="{data.translation}">
		<svelte:component this={data.page} />
	</Context>
</BlogpostLayout>
