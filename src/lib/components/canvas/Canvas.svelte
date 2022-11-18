<script lang="ts">
	import { afterUpdate, createEventDispatcher, onMount } from "svelte";
	import Context from "../Context.svelte";
	import { RenderManager } from "./canvas.manager";
	import styles from "./canvas.module.css";

	export let autoclear = false;
	export let className = "";
	export let height = 150;
	export let loop = false;
	export let pixelRatio: number | undefined = undefined;
	export let width = 300;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	const dispatch = createEventDispatcher();
	const manager = new RenderManager();

	if (globalThis.window && !pixelRatio) {
		pixelRatio = devicePixelRatio || 1;
	}

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				dispatch("resize", {
					height: entry.borderBoxSize[0].blockSize,
					width: entry.borderBoxSize[0].inlineSize
				});
			}

			manager.resize();
		});

		resizeObserver.observe(canvas);

		return () => {
			resizeObserver.disconnect();
		};
	});

	onMount(() => {
		context = canvas.getContext("2d");
		manager.setParams({
			autoclear,
			context,
			height,
			loop,
			pixelRatio,
			width
		});

		return () => {
			manager.stop();
		};
	});

	afterUpdate(() => {
		manager.setParams({
			autoclear,
			context,
			height,
			loop,
			pixelRatio,
			width
		});
	});

	/* component methods */

	export const clear = () => {
		manager.clear({ context, height, pixelRatio, width });
	};

	export const resize = () => {
		manager.resize();
	};
</script>

<canvas
	bind:this="{canvas}"
	class="{styles.canvas} {className}"
	height="{pixelRatio * height}"
	width="{pixelRatio * width}"
>
	{#if context}
		<Context key="canvas" value="{manager}">
			<slot />
		</Context>
	{/if}
</canvas>
