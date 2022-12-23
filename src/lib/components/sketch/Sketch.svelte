<script lang="ts">
	import { Button, Details, Icon, Modal } from "@components";
	import { default as Canvas } from "./Sketch.canvas.svelte";
	import { iconPause, iconPlay, iconFullscreen, iconReset } from "../icons/default";
	import type { SvelteComponent } from "svelte";
	import type { Sketch } from "./sketch.types";
	import styles from "./sketch.module.css";

	type Options = $$Generic;

	export let controls: typeof SvelteComponent | undefined = undefined;
	export let loop = true;
	export let fullscreen = false;
	export let sketch: Sketch<Options>;
	export let name: string;

	let options: Options | undefined = undefined;

	const handleToggle = () => {
		loop = !loop;
	};

	const handleFullscreen = () => {
		fullscreen = !fullscreen;
	};

	const handleReset = () => {
		sketch = sketch;
	};
</script>

<article class="{styles.wrapper}">
	<figure class="{styles.sketch}">
		{#key sketch}
			<Canvas
				autoclear
				loop="{fullscreen ? false : loop}"
				{name}
				{sketch}
				{options}
				on:resize={handleReset}
			/>
		{/key}
	</figure>
	<footer class="{styles.footer}">
		{#if controls}
			<Details className="{styles.settings}">
				<p slot="title">
					Settings
				</p>
				<svelte:component
					this="{controls}"
					bind:state="{options}"
					on:reset="{handleReset}"
				/>
			</Details>
		{/if}
		<form on:submit|preventDefault class="{styles.controls}">
			<Button on:click="{handleFullscreen}" icon appearance="outline">
				<Icon
					path="{iconFullscreen}"
					title="Fullscreen View"
				/>
			</Button>
			<Button on:click="{handleToggle}" icon appearance="outline">
				<Icon
					path="{loop ? iconPause : iconPlay}"
					title="{loop ? "Pause" : "Play"}"
				/>
			</Button>
			<Button on:click="{handleReset}" icon appearance="outline">
				<Icon
					path="{iconReset}"
					title="Reset"
				/>
			</Button>
		</form>
	</footer>
</article>

<Modal bind:open="{fullscreen}" className="{styles.fullscreen}">
	<Canvas
		autoclear
		loop
		{name}
		{sketch}
		{options}
		on:resize={handleReset}
	/>
</Modal>
