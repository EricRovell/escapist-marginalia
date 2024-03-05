<script lang="ts">
	import type { Appearance } from "./button.types";
	import styles from "./button.module.css";

	export let appearance: Appearance = "outline";
	export let className = "";
	export let disabled = false;
	export let id: string | undefined = undefined;
	export let icon = false;
	export let title: string | undefined = undefined;
	export let type: HTMLButtonElement["type"] = "button";
	export let wide = false;
</script>

<button
	class="{styles.button} {styles[appearance]} {className}"
	class:disabled
	class:icon
	class:wide
	{id}
	{type}
	{disabled}
	{title}
	on:click
	on:mousedown
	{...$$restProps}
>
	<slot />
</button>
