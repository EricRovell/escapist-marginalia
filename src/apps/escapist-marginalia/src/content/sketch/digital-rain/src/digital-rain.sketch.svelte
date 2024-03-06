<script lang="ts">
	import { Sketch } from "$lib/components";
	import { sketch } from "./digital-rain.render";
	import { default as Controls } from "./digital-rain.form.svelte";
</script>

<Sketch
	name="digital-rain"
	controls="{Controls}"
	{sketch}
/>
