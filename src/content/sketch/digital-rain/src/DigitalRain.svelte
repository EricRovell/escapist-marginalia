<script lang="ts">
	import { Sketch } from "@components";
	import { sketch } from "./digital-rain.render";
	import { default as Controls } from "./DigitalRain.form.svelte";

	export let t: Record<string, string> | undefined = undefined;
</script>

<Sketch
	name="digital-rain"
	controls="{Controls}"
	{sketch}
	{t}
/>
