<script lang="ts">
	import { Switch, Range, SketchControls } from "@components";
	import { options, optionsImmutable } from "./flocking.options";

	export let t: Record<string, string>;
	export let state: typeof options = {
		...options
	};
</script>

<SketchControls bind:state on:reset {optionsImmutable} {options}>
	<fieldset>
		<legend>
			{t.behavior}
		</legend>
		<Range output bind:value="{state.boids}" name="boids" min="{10}" max="{250}">
			{t.boids}
		</Range>
		<Switch bind:checked="{state.bound}" name="bound">
			{t.bound}
		</Switch>
		<Range output bind:value="{state.align}" name="align" min="{0.1}" max="{2.5}" step="{0.01}">
			{t.alignment}
		</Range>
		<Range output bind:value="{state.cohesion}" name="cohesion" min="{0.01}" max="{2}" step="{0.01}">
			{t.cohesion}
		</Range>
		<Range output bind:value="{state.separate}" name="separate" min="{0.1}" max="{2.5}" step="{0.01}">
			{t.separation}
		</Range>
	</fieldset>
	<fieldset>
		<legend>
			{t.appearance}
		</legend>
		<Range output bind:value="{state.scale}" name="scale" min="{1}" max="{5}" step="{0.1}">
			{t.scale}
		</Range>
	</fieldset>
	<fieldset>
		<legend>
			{t.quadtree}
		</legend>
		<Switch bind:checked="{state.qtree}" name="qtree">
			{t["qtree-optimization"]}
		</Switch>
		<Switch bind:checked="{state.showQTree}" disabled="{!state.qtree}" name="showQTree">
			{t["qtree-appearance"]}
		</Switch>
		<Switch bind:checked="{state.showPerception}" disabled="{!state.qtree}" name="showPerception">
			{t["perception-appearance"]}
		</Switch>
		<Range output bind:value="{state.perception}" disabled="{!state.qtree}" name="perception" min="{50}" max="{250}">
			{t.perception}
		</Range>
	</fieldset>
</SketchControls>
