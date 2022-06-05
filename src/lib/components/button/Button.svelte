<script lang="ts" context="module">
	export type ButtonType = "submit" | "reset" | "button" | undefined;
	export type Appearance = "fill" | "outline" | "text";
</script>

<script lang="ts">
	import styles from "./button.module.css";

	export let appearance: Appearance = "outline";
	export let className = "";
	export let disabled = false;
	export let id: string | undefined = undefined;
	export let type: ButtonType = undefined;
	export let wide = false;
</script>

<button
	class={`${styles.button} ${className}`}
	class:appearance={appearance}
	class:disabled
	class:wide
	{id}
	{type}
	{disabled}
	on:click
	on:mousedown
	{...$$restProps}
>
	<slot />
</button>
