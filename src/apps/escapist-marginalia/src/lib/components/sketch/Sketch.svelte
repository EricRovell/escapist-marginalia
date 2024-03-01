<script lang="ts">
	import { Button, Details, Icon, Modal } from "@components";
	import { default as Canvas } from "./Sketch.canvas.svelte";
	import { shortcut } from "$lib/actions";
	import { iconPause, iconPlay, iconFullscreen, iconReset } from "@icons";
	import { t as tr } from "@core/i18n";
	import type { ComponentType } from "svelte";
	import type { Sketch } from "./sketch.types";
	import styles from "./sketch.module.css";

	type Options = $$Generic;

	export let autoclear = false;
	export let controls: ComponentType | undefined = undefined;
	export let fullscreen = false;
	export let loop = true;
	export let name: string;
	export let sketch: Sketch<Options>;
	export let t: Record<string, string> | undefined = undefined;

	let options: Options = undefined;

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

<article
	class="{styles.wrapper}"
	use:shortcut={{ code: "Space", callback: handleToggle }}
	use:shortcut={{ code: "F11", callback: handleFullscreen }}
	use:shortcut={{ code: "KeyR", callback: handleReset }}
>
	<figure class="{styles.sketch}">
		{#key sketch}
			<Canvas
				{autoclear}
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
					{$tr("dict.settings")}
				</p>
				<svelte:component
					this="{controls}"
					bind:state="{options}"
					on:reset="{handleReset}"
					{t}
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
		{autoclear}
		loop
		{name}
		{sketch}
		{options}
		on:resize={handleReset}
	/>
</Modal>
