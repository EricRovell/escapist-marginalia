<script lang="ts">
	import { InputRange, InputSwitch } from "ui";

	import { SketchControls } from "@components";
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
		<InputRange output bind:value="{state.boids}" name="boids" min="{10}" max="{250}">
			{t.boids}
		</InputRange>
		<InputSwitch bind:checked="{state.bound}" name="bound">
			{t.bound}
		</InputSwitch>
		<InputRange output bind:value="{state.align}" name="align" min="{0.1}" max="{2.5}" step="{0.01}">
			{t.alignment}
		</InputRange>
		<InputRange output bind:value="{state.cohesion}" name="cohesion" min="{0.01}" max="{2}" step="{0.01}">
			{t.cohesion}
		</InputRange>
		<InputRange output bind:value="{state.separate}" name="separate" min="{0.1}" max="{2.5}" step="{0.01}">
			{t.separation}
		</InputRange>
	</fieldset>
	<fieldset>
		<legend>
			{t.appearance}
		</legend>
		<InputRange output bind:value="{state.scale}" name="scale" min="{1}" max="{5}" step="{0.1}">
			{t.scale}
		</InputRange>
	</fieldset>
	<fieldset>
		<legend>
			{t.quadtree}
		</legend>
		<InputSwitch bind:checked="{state.qtree}" name="qtree">
			{t["qtree-optimization"]}
		</InputSwitch>
		<InputSwitch bind:checked="{state.showQTree}" disabled="{!state.qtree}" name="showQTree">
			{t["qtree-appearance"]}
		</InputSwitch>
		<InputSwitch bind:checked="{state.showPerception}" disabled="{!state.qtree}" name="showPerception">
			{t["perception-appearance"]}
		</InputSwitch>
		<InputRange output bind:value="{state.perception}" disabled="{!state.qtree}" name="perception" min="{50}" max="{250}">
			{t.perception}
		</InputRange>
	</fieldset>
</SketchControls>
