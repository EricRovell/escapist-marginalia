<script lang="ts">
	import items from "@core/gallery.json";
	import { Gallery } from "@components";
</script>

<main>
	<Gallery {items} />
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