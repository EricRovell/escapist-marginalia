<script lang="ts">
	import styles from "./image.module.css";

	export let alt: string;
	export let className = "";
	export let height: number;
	export let lazy = false;
	export let src: string;
	export let style = "";
	export let width: number;

	let error = false;
</script>

<picture class={styles.picture} {style}>
	<img
		{alt}
		class={className}
		class:error
		{height}
		loading={lazy ? "lazy" : undefined}
		on:error={() => error = true}
		{src}
		{width}
		{...$$restProps}
	/>
</picture>