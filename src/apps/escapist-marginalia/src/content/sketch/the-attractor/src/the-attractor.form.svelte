<script lang="ts">
	import { InputRange } from "ui";

	import { SketchControls } from "@components";
	import { options, optionsImmutable } from "./the-attractor.options";

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
		<InputRange output bind:value="{state.attractors}" name="attractors" min="{1}" max="{15}">
			{t.attractors}
		</InputRange>
	</fieldset>
	<fieldset>
		<legend>
			{t.particles}
		</legend>
		<InputRange output bind:value="{state.particles}" name="particles" min="{500}" max="{2500}">
			{t.count}
		</InputRange>
		<InputRange output bind:value="{state.lifetime}" name="lifetime" min="{250}" max="{3000}">
			{t.lifetime}
		</InputRange>
	</fieldset>
</SketchControls>
