<script lang="ts">
	import { Range, SketchControls } from "@components";
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
		<Range output bind:value="{state.attractors}" name="attractors" min="{1}" max="{15}">
			{t.attractors}
		</Range>
	</fieldset>
	<fieldset>
		<legend>
			{t.particles}
		</legend>
		<Range output bind:value="{state.particles}" name="particles" min="{500}" max="{2500}">
			{t.count}
		</Range>
		<Range output bind:value="{state.lifetime}" name="lifetime" min="{250}" max="{3000}">
			{t.lifetime}
		</Range>
	</fieldset>
</SketchControls>
