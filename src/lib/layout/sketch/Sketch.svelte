<script lang="ts">
	import { Button, Icon, Modal } from "@components";
	import { iconPause, iconPlay, iconFullscreen, iconReset } from "$lib/components/icons/default";
	import styles from "./sketch.module.css";
	import type { SvelteComponentTyped } from "svelte/internal";

	export let loop = true;
	export let fullscreen = false;
	export let sketch: typeof SvelteComponentTyped;

	const handleToggle = () => loop = !loop;
	const handleFullscreen = () => fullscreen = !fullscreen;
	const handleReset = () => sketch = sketch;
</script>

<!--
	Passes `loop` and `fullscreen` state into the sketch and provides the controls.
-->
<figure class="{styles.sketch}">
	{#key sketch}
		<svelte:component
			this="{sketch}"
			loop="{fullscreen ? false : loop}"
		/>
	{/key}
</figure>
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

<Modal bind:open="{fullscreen}" className="{styles.fullscreen}">
	<svelte:component
		this="{sketch}"
		loop
		{fullscreen}
	/>
</Modal>
