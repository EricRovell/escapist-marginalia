<script lang="ts">
	import { SketchCanvas } from "$lib/components/sketch";
	import { sketch, DEFAULT_OPTIONS, type Options } from "@content/sketch/chaos-game";
	import styles from "./chaos-game.module.css";

	export let height = 450;
	export let id: string;
	export let options: Partial<Options> = {};
	export let style: string | undefined = undefined;
	export let width = 450;
</script>

<figure class="{styles.figure}" {style}>
	{#key options}
		<SketchCanvas
			loop
			name="{id}"
			{sketch}
			{width}
			{height}
			options={{
				...DEFAULT_OPTIONS,
				...options
			}}
		/>
	{/key}
	{#if $$slots.default}
		<figcaption>
			<slot />
		</figcaption>
	{/if}
</figure>
