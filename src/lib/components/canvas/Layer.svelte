<script lang="ts">
	import { useLayerAction } from "./canvas.action";
	import type { Renderer } from "./canvas.types";

	export let id: string;
	export let draw: Renderer | undefined = undefined;
	export let setup: Renderer | undefined = undefined;

	useLayerAction(() => {
		return {
			draw,
			id,
			setup
		};
	});
</script>
