<script context="module" lang="ts">
	export let KEY = "canvas";
</script>

<script lang="ts">
	import { onMount, setContext } from "svelte";
	import { RenderManager } from "./canvas.manager";
	import styles from "./canvas.module.css";

	export let autoclear = false;
	export let className = "";
	export let height = 400;
	export let pixelRatio: number | undefined = undefined;
	export let width = 400;

	export let canvas: HTMLCanvasElement | undefined = undefined;
	export let context: CanvasRenderingContext2D | undefined = undefined;

	let frameId: number;

	if (!pixelRatio) {
		pixelRatio = globalThis.window
			? devicePixelRatio
			: 1;
	}

	const manager = new RenderManager();
	setContext<RenderManager>(KEY, manager);

	const render = () => {
		manager.render({ autoclear, context, height, pixelRatio, width });
		frameId = requestAnimationFrame(render);
	};

	onMount(() => {
		context = canvas.getContext("2d");
		render();

		return () => {
			cancelAnimationFrame(frameId);
		};
	});

	// resize on these props change
	$: autoclear, height, pixelRatio, width, manager.resize();
</script>

<canvas
	bind:this="{canvas}"
	class="{styles.canvas} {className}"
	height="{height * pixelRatio}"
	width="{width * pixelRatio}"
/>
<slot />
