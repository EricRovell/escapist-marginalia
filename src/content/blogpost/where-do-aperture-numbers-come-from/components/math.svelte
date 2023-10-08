<script lang="ts">
	import katex from "katex";

	export let math: string;
	export let inline = false;

	$: rendered = katex.renderToString(math, {
		throwOnError: false,
		displayMode: inline
	});
</script>

{@html rendered}
