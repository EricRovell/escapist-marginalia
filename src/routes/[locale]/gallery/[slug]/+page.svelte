<script>
	import { GalleryItemLayout } from "@layout";

	export let data;
</script>

<GalleryItemLayout metadata={data.metadata}>
	<svelte:component this={data.page} />
</GalleryItemLayout>
