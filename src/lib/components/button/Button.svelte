<script lang="ts" context="module">
	export type ButtonType = "submit" | "reset" | "button" | undefined;
	export type Appearance = "fill" | "outline" | "ghost";
</script>

<script lang="ts">
	import styles from "./button.module.css";

	export let appearance: Appearance = "fill";
	export let className = "";
	export let disabled = false;
	export let id: string | undefined = undefined;
	export let icon = false;
	export let title: string | undefined = undefined;
	export let type: ButtonType = undefined;
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
