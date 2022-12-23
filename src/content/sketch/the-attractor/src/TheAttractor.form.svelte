<script lang="ts">
	import { Range, SketchControls } from "@components";
	import { options, optionsImmutable } from "./the-attractor.options";

	export let state: typeof options = {
		...options
	};
</script>

<SketchControls bind:state on:reset {optionsImmutable} {options}>
	<fieldset>
		<legend>
			Field
		</legend>
		<Range output bind:value="{state.attractors}" name="attractors" min="{1}" max="{15}">
			Attractors
		</Range>
	</fieldset>
	<fieldset>
		<legend>
			Particles
		</legend>
		<Range output bind:value="{state.particles}" name="particles" min="{500}" max="{2500}">
			Particles
		</Range>
		<Range output bind:value="{state.lifetime}" name="lifetime" min="{250}" max="{3000}">
			Lifetime
		</Range>
	</fieldset>
</SketchControls>
