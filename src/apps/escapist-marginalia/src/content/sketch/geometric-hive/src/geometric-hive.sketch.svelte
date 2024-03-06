<script lang="ts">
	import { Sketch } from "$lib/components";
	import { sketch } from "./geometric-hive.render";
	import { default as Controls } from "./geometric-hive.form.svelte";
</script>

<Sketch
	name="switch"
	controls="{Controls}"
	{sketch}
/>
