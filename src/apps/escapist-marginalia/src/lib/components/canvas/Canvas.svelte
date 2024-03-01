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
	export let style = "";
	export let width = 300;

	// should be a prop to trigger `afterUpdate`
	export let visible = false;

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

		const intersectionObserver = new IntersectionObserver((entries) => {
			visible = entries[0].isIntersecting;
		});

		resizeObserver.observe(canvas);
		intersectionObserver.observe(canvas);

		return () => {
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
		};
	});

	onMount(() => {
		context = canvas.getContext("2d");

		return () => {
			manager.stop();
		};
	});

	afterUpdate(() => {
		manager.setParams({
			autoclear,
			context,
			height,
			loop: visible && loop,
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
	{style}
	width="{pixelRatio * width}"
>
	{#if context}
		<Context key="canvas" value="{manager}">
			<slot />
		</Context>
	{/if}
</canvas>
