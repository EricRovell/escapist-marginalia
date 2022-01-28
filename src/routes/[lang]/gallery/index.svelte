<script lang="ts">
	import { PageMeta, Gallery } from "@components";

	import items from "@core/gallery.json";
</script>

<PageMeta route="gallery" />

<main>
	<Gallery
		{items}
		getSrc={({ href, format }) => `${href}.${format}`}
	/>
</main>

<style>
	main {
		display: flex;
		justify-self: center;
		justify-items: center;
		padding: var(--space-l);
		width: min(100%, 1800px);
	}

	@media screen and (max-width: 599px) {
		main {
			padding: var(--space-s);
		}
	}
</style>