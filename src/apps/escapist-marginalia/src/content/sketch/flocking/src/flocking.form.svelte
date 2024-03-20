<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange, InputSwitch } from "ui";

	import { SketchControls } from "$lib/components";
	import { DEFAULT_OPTIONS, IMMUTABLE_OPTIONS } from "./flocking.options";
	import type { Translation } from "../translations/types";

	const t = getContext<Translation>("t");

	export let state: typeof DEFAULT_OPTIONS = {
		...DEFAULT_OPTIONS
	};
</script>

<SketchControls
	bind:state
	on:reset
	options="{DEFAULT_OPTIONS}"
	optionsImmutable="{IMMUTABLE_OPTIONS}"
>
	<fieldset>
		<legend>
			{t.BEHAVIOR}
		</legend>
		<InputRange output bind:value="{state.boids}" name="boids" min="{10}" max="{250}">
			{t.BOIDS}
		</InputRange>
		<InputSwitch bind:checked="{state.bound}" name="bound">
			{t.BOUND}
		</InputSwitch>
		<InputRange output bind:value="{state.align}" name="align" min="{0.1}" max="{2.5}" step="{0.01}">
			{t.ALIGNMENT}
		</InputRange>
		<InputRange output bind:value="{state.cohesion}" name="cohesion" min="{0.01}" max="{2}" step="{0.01}">
			{t.COHESION}
		</InputRange>
		<InputRange output bind:value="{state.separate}" name="separate" min="{0.1}" max="{2.5}" step="{0.01}">
			{t.SEPARATION}
		</InputRange>
	</fieldset>
	<fieldset>
		<legend>
			{t.APPEARANCE}
		</legend>
		<InputRange output bind:value="{state.scale}" name="scale" min="{1}" max="{5}" step="{0.1}">
			{t.SCALE}
		</InputRange>
	</fieldset>
	<fieldset>
		<legend>
			{t.QTREE}
		</legend>
		<InputSwitch bind:checked="{state.qtree}" name="qtree">
			{t.QTREE_OPTIMIZATION}
		</InputSwitch>
		<InputSwitch bind:checked="{state.showQTree}" disabled="{!state.qtree}" name="showQTree">
			{t.QTREE_APPEARANCE}
		</InputSwitch>
		<InputSwitch bind:checked="{state.showPerception}" disabled="{!state.qtree}" name="showPerception">
			{t.PERCEPTION_APPEARANCE}
		</InputSwitch>
		<InputRange output bind:value="{state.perception}" disabled="{!state.qtree}" name="perception" min="{50}" max="{250}">
			{t.PERCEPTION}
		</InputRange>
	</fieldset>
</SketchControls>
