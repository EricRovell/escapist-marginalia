<script lang="ts">
	import { Sketch } from "@components";
	import { sketch } from "./digital-rain.render";
	import { default as Controls } from "./DigitalRain.form.svelte";
</script>

<Sketch
	name="digital-rain"
	controls="{Controls}"
	{sketch}
/>


<!-- <script lang="ts">
	import { onMount } from "svelte";
	import { Canvas, CanvasLayer } from "@components";
	import { sketch } from "./digital-rain.render";
	import { options } from "./digital-rain.options";

	let canvasHeight = 350;
	let canvasWidth = 500;
	let timer = null;

	export let loop = true;

	let { draw, setup } = sketch(options);

	const handlePlay = () => {
		loop = true;
		setup = setup;
		timer = setInterval(() => {
			draw = draw;
		}, 1000 / options.frameRate);
	};

	const handleStop = () => {
		loop = false;
		clearInterval(timer);
	};

	const handleResize = (e: CustomEvent<{ height: number, width: number }>) => {
		canvasHeight = e.detail.height;
		canvasWidth = e.detail.width;
	};

	onMount(() => {
		return () => {
			handleStop();
		};
	});

	$: {
		if (loop) {
			handlePlay();
		} else {
			handleStop();
		}
	}
</script>

<Canvas
	height="{canvasHeight}"
	width="{canvasWidth}"
	on:resize="{handleResize}"
>
	<CanvasLayer
		id="the-matrix"
		{setup}
		{draw}
	/>
</Canvas> -->
