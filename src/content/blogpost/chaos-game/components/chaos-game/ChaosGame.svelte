<script lang="ts">
	import { SketchCanvas } from "@components/sketch";
	import { sketch, options as defaultOptions, type Options } from "@content/sketch/chaos-game/index";
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
				...defaultOptions,
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
