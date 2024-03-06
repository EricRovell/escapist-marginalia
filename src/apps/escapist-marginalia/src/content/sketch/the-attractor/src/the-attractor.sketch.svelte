<script lang="ts">
	import { Sketch } from "$lib/components";
	import { sketch } from "./the-attractor.render";
	import { default as Controls } from "./the-attractor.form.svelte";
</script>

<Sketch
	name="the-attractor"
	controls="{Controls}"
	{sketch}
/>
