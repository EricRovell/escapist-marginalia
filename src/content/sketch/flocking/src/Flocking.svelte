<script lang="ts">
	import { Sketch } from "@components";
	import { sketch } from "./flocking.render";
	import { default as Controls } from "./Flocking.form.svelte";

	export let t: Record<string, string>;
</script>

<Sketch
	autoclear
	name="flocking"
	controls="{Controls}"
	{sketch}
	{t}
/>
