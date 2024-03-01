<script lang="ts">
	import { Sketch } from "@components";
	import { sketch } from "./chaos-game.render";
	import { default as Controls } from "./chaos-game.form.svelte";

	export let t: Record<string, string>;
</script>

<Sketch
	name="the-attractor"
	controls="{Controls}"
	{sketch}
	{t}
/>
