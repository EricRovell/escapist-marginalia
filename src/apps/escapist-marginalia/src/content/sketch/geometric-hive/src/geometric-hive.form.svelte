<script lang="ts">
	import { Range, InputColor } from "@components";
	import { SketchControls } from "@components";
	import { options, optionsImmutable } from "./geometric-hive.options";

	export let t: Record<string, string>;
	export let state: typeof options = {
		...options
	};
</script>

<SketchControls bind:state on:reset {optionsImmutable} {options}>
	<fieldset>
		<legend>
			{t.field}
		</legend>
		<InputColor
			bind:value="{state["background"]}"
			name="background"
		>
			{t["background"]}
		</InputColor>
	</fieldset>
	<fieldset>
		<legend>
			{t.particles}
		</legend>
		<Range
			output
			bind:value="{state["particle-gap"]}"
			name="particle-gap"
			min="{1}"
			max="{4}"
			step="{0.01}"
		>
			{t["particle-gap"]}
		</Range>
		<Range
			output
			bind:value="{state["particle-size"]}"
			name="particle-size"
			min="{5}"
			max="{40}"
		>
			{t["particle-size"]}
		</Range>
		<Range
			output
			bind:value="{state["particle-speed-base"]}"
			name="particle-speed-base"
			min="{0.05}"
			max="{0.3}"
			step="{0.01}"
		>
			{t["particle-speed-base"]}
		</Range>
	</fieldset>
	<fieldset>
		<legend>
			{t.gaps}
		</legend>
		<Range
			output
			bind:value="{state["gap-frequency"]}"
			name="gap-frequency"
			min="{0.80}"
			max="{0.97}"
			step="{0.01}"
		>
			{t["gap-frequency"]}
		</Range>
	</fieldset>
</SketchControls>
