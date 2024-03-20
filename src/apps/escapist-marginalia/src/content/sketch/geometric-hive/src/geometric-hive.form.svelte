<script lang="ts">
	import { getContext } from "svelte";
	import { InputColor, InputRange } from "ui";

	import { SketchControls } from "$lib/components";
	import { DEFAULT_OPTIONS, IMMUTABLE_OPTIONS } from "./geometric-hive.options";
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
		<InputColor
			bind:value="{state["background"]}"
			name="background"
		>
			{t.BACKGROUND}
		</InputColor>
	</fieldset>
	<fieldset>
		<legend>
			{t.PARTICLES}
		</legend>
		<InputRange
			output
			bind:value="{state["particle-gap"]}"
			name="particle-gap"
			min="{1}"
			max="{4}"
			step="{0.01}"
		>
			{t.PARTICLE_GAP}
		</InputRange>
		<InputRange
			output
			bind:value="{state["particle-size"]}"
			name="particle-size"
			min="{5}"
			max="{40}"
		>
			{t.PARTICLE_SIZE}
		</InputRange>
		<InputRange
			output
			bind:value="{state["particle-speed-base"]}"
			name="particle-speed-base"
			min="{0.05}"
			max="{0.3}"
			step="{0.01}"
		>
			{t.PARTICLE_SPEED_BASE}
		</InputRange>
	</fieldset>
	<fieldset>
		<legend>
			{t.GAPS}
		</legend>
		<InputRange
			output
			bind:value="{state["gap-frequency"]}"
			name="gap-frequency"
			min="{0.80}"
			max="{0.97}"
			step="{0.01}"
		>
			{t.GAP_FREQUENCY}
		</InputRange>
	</fieldset>
</SketchControls>
