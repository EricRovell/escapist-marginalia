<script lang="ts">
	import { Sketch } from "@components";
	import { sketch } from "./the-attractor.render";
	import { default as Controls } from "./the-attractor.form.svelte";

	export let t: Record<string, string>;
</script>

<Sketch
	name="the-attractor"
	controls="{Controls}"
	{sketch}
	{t}
/>
