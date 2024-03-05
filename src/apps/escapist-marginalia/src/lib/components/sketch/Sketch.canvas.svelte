<script lang="ts">
	import { afterUpdate } from "svelte";
	import { Canvas, CanvasLayer } from "ui";
	import type { Sketch } from "./sketch.types";

	type Options = $$Generic;

	export let autoclear = false;
	export let height = 350;
	export let loop = false;
	export let name: string;
	export let sketch: Sketch<Options>;
	export let width = 500;
	export let options: Options = undefined;

	let render = sketch();

	const handleResize = (e: CustomEvent<{ height: number, width: number }>) => {
		height = e.detail.height;
		width = e.detail.width;
		render = sketch();
	};

	afterUpdate(() => {
		render.update(options);
	});
</script>

<Canvas
	{loop}
	{autoclear}
	{height}
	{width}
	on:resize="{handleResize}"
>
	{#key render}
		<CanvasLayer
			draw="{render.draw}"
			id="{name}"
			setup="{render.setup}"
		/>
	{/key}
</Canvas>
