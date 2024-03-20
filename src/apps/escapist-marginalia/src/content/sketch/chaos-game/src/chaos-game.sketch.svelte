<script lang="ts">
	import { Sketch } from "$lib/components";
	import { sketch } from "./chaos-game.render";
	import { default as Controls } from "./chaos-game.form.svelte";
</script>

<Sketch
	name="chaos-game"
	controls="{Controls}"
	{sketch}
/>
