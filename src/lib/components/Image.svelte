<script lang="ts">
	export let src: string;
	export let width: number;
	export let height: number;
	export let alt: string;
	export let lazy = false;
	export let style = "";
</script>

<picture {style}>
	<img
		{src}
		{width}
		{height}
		{alt}
		loading={lazy ? "lazy" : undefined}
		{...$$restProps}
	/>
</picture>