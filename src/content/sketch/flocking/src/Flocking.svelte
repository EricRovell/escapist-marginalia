<script lang="ts">
	import { Canvas, CanvasLayer } from "@components";
	import { sketch } from "./flocking.render";
	import { options } from "./flocking.options";

	let canvasHeight = 350;
	let canvasWidth = 500;

	export let loop = true;

	let render = sketch(options);

	const handleResize = (e: CustomEvent<{ height: number, width: number }>) => {
		canvasHeight = e.detail.height;
		canvasWidth = e.detail.width;
		render = sketch(options);
	};
</script>

<Canvas
	{loop}
	autoclear
	height="{canvasHeight}"
	style="--canvas-bg: var(--surface-2);"
	width="{canvasWidth}"
	on:resize="{handleResize}"
>
	{#key render}
		<CanvasLayer id="boids" {...render} />
	{/key}
</Canvas>
