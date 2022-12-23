<script lang="ts">
	import { Sketch } from "@components";
	import { sketch } from "./flocking.render";
	import { default as Controls } from "./Flocking.form.svelte";
</script>

<Sketch
	name="flocking"
	controls="{Controls}"
	{sketch}
/>
