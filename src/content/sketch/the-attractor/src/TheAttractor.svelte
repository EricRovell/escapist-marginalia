<script lang="ts">
	import { Canvas, CanvasLayer } from "@components";
	import { sketch } from "./the-attractor.render";
	import { options } from "./the-attractor.options";

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
	height="{canvasHeight}"
	width="{canvasWidth}"
	on:resize="{handleResize}"
>
	{#key render}
		<CanvasLayer id="the-attractor" {...render} />
	{/key}
</Canvas>
