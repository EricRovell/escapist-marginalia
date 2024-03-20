<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange } from "ui";

	import { SketchControls } from "$lib/components";
	import { DEFAULT_OPTIONS, IMMUTABLE_OPTIONS } from "./the-attractor.options";
	import type { Translation } from "../translations/types";

	export let state: typeof DEFAULT_OPTIONS = {
		...DEFAULT_OPTIONS
	};

	const t = getContext<Translation>("t");
</script>

<SketchControls
	bind:state
	on:reset
	options="{DEFAULT_OPTIONS}"
	optionsImmutable="{IMMUTABLE_OPTIONS}"
>
	<fieldset>
		<legend>
			{t.FIELD}
		</legend>
		<InputRange output bind:value="{state.attractors}" name="attractors" min="{1}" max="{15}">
			{t.ATTRACTORS}
		</InputRange>
	</fieldset>
	<fieldset>
		<legend>
			{t.PARTICLES}
		</legend>
		<InputRange output bind:value="{state.particles}" name="particles" min="{500}" max="{2500}">
			{t.COUNT}
		</InputRange>
		<InputRange output bind:value="{state.lifetime}" name="lifetime" min="{250}" max="{3000}">
			{t.LIFETIME}
		</InputRange>
	</fieldset>
</SketchControls>
