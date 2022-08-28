<!--
	Still WIP, learning from:

	- https://svelte.dev/repl/a8b479b299614f21b8e6a97fd62dc7a0?version=3.49.0
	- https://www.thisdot.co/blog/declarative-canvas-with-svelte
	- https://github.com/dnass/svelte-canvas
-->
<script context="module" lang="ts">
	export const key = "canvas";
</script>

<script lang="ts">
	import { onMount, setContext } from "svelte";
	import { RenderManager } from "./canvas.manager";
	import styles from "./canvas.module.css";

	export let className = "";
	export let height = 400;
	export let pixelRatio = undefined;
	export let width = 400;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	const manager = new RenderManager();
	let frameId: number;

	if (!pixelRatio) {
		pixelRatio = (globalThis.window)
			? window.devicePixelRatio
			: 2;
	}

	setContext(key, manager);

	onMount(() => {
		context = canvas.getContext("2d");
		frameId = requestAnimationFrame(() => {
			manager.render({
				context,
				width,
				height,
			});
		});

		return () => {
			if (frameId) {
				cancelAnimationFrame(frameId);
			}
		};
	});

	$: width, height, pixelRatio, manager.resize();
</script>

<canvas
	bind:this="{canvas}"
	class="{styles.canvas} {className}"
	{height}
	{width}
/>
<slot />
