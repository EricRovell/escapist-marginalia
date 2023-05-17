<script lang="ts" context="module">
	export type Theme = "auto" | "light" | "dark";
</script>

<script lang="ts">
	import { theme } from "@stores";
	import ThemeIcon from "./ThemeIcon.svelte";
	import styles from "./theme-select.module.css";

	export let labeled = false;
	export let title = "Click to switch theme";
	export let maskID: string | undefined = undefined;
</script>

<!--
	@component
	Theme Toggle component.
	Toggles the web site color mode: between light and dark.
	
	Usage:
		```
			<ThemeToggle size="50px" />
		```
	
	Props:
		
		| Name      | type | default                   | description                            |
		|:----------|:-------|:------------------------|:---------------------------------------|
		| title     | string | "Click to switch theme" | The toggle's title                     |
		| size      | string | 1em                     | The toggle's size                      |
		| sunSize   | number | 25                      | The sun's radius                       |
		| raySize   | number | 5                       | The ray's radius                       |
		| rayOffset | number | 40                      | The rays' offset from the sun's center |
		| rays      | number | 8                       | the number of rays                     |
-->
<button
	class="{styles.switcher}"
	class:labeled
	{title}
	on:click={theme.change}
>
	{#if labeled}
		<span class="label">
			{$theme}
		</span>
	{/if}
	<ThemeIcon
		theme={$theme}
		{maskID}
	/>
</button>
