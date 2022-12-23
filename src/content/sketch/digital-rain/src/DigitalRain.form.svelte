<script lang="ts">
	import { Range, SketchControls } from "@components";
	import { options, optionsImmutable } from "./digital-rain.options";

	export let state: typeof options = {
		...options
	};
</script>

<SketchControls bind:state on:reset {optionsImmutable} {options}>
	<fieldset>
		<legend>
			Letters
		</legend>
		<Range output bind:value="{state.scale}" name="scale" min="{1}" max="{25}">
			Font Size
		</Range>
		<Range output bind:value="{state.depthRange[0]}" name="depthRange" min="{25}" max="{1000}">
			Minimum depth
		</Range>
		<Range output bind:value="{state.depthRange[1]}" name="depthRange" min="{50}" max="{10000}">
			Maximum Depth
		</Range>
	</fieldset>
</SketchControls>
