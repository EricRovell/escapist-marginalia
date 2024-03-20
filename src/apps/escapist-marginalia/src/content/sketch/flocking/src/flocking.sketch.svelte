<script lang="ts">
	import { Sketch } from "$lib/components";
	import { sketch } from "./flocking.render";
	import { default as Controls } from "./flocking.form.svelte";
</script>

<Sketch
	autoclear
	name="flocking"
	controls="{Controls}"
	{sketch}
/>
