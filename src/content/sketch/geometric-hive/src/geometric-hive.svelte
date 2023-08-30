<script lang="ts">
	import { Sketch } from "@components";
	import { sketch } from "./geometric-hive.render";
	import { default as Controls } from "./geometric-hive.form.svelte";

	export let t: Record<string, string>;
</script>

<Sketch
	name="switch"
	controls="{Controls}"
	{sketch}
	{t}
/>
