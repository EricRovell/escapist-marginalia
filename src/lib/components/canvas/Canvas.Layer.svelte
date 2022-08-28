<script context="module" lang="ts">
	import type { RenderManager, Render } from "./canvas.types";
</script>

<script lang="ts">
	import { getContext, onMount } from "svelte";

	export let id: string;
	export let draw: Render | undefined = undefined;
	export let setup: Render | undefined = undefined;

	const manager = getContext<RenderManager>("canvas");

	onMount(() => {
		manager.register(id, {
			setup,
			draw
		});

		return () => {
			manager.unregister(id);
		};
	});
</script>
