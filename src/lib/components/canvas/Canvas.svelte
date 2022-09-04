<script lang="ts">
	import { afterUpdate, onMount } from "svelte";
	import Context from "../Context.svelte";
	import { RenderManager } from "./canvas.manager";
	import styles from "./canvas.module.css";

	export let autoclear = false;
	export let className = "";
	export let height = 150;
	export let pixelRatio: number | undefined = undefined;
	export let width = 300;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	const manager = new RenderManager();

	if (globalThis.window && !pixelRatio) {
		pixelRatio = devicePixelRatio || 1;
	}

	onMount(() => {
		context = canvas.getContext("2d");
		manager.setParams({ autoclear, context, height, pixelRatio, width });
		manager.render();

		return () => {
			manager.stop();
		};
	});

	afterUpdate(() => {
		manager.setParams({ autoclear, context, height, pixelRatio, width });
	});

	/* component methods */

	export const clear = () => {
		manager.clear({ context, height, pixelRatio, width });
	};

	export const resize = () => {
		manager.resize({ context, pixelRatio });
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
