<script lang="ts">
	import styles from "./image.module.css";

	interface Sources {
		srcset: string;
		type: string;
	}

	export let alt: string;
	export let className = "";
	export let height: number;
	export let lazy = false;
	export let sources: Sources[] = [];
	export let src: string;
	export let style = "";
	export let width: number;

	let error = false;
</script>

<picture class={styles.picture} {style} on:click role="presentation">
	<slot />
	{#each sources as { srcset, type }}
		<source {srcset} {type} />
	{/each}
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
