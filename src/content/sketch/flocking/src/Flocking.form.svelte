<script lang="ts">
	import { Switch, Range, SketchControls } from "@components";
	import { options, optionsImmutable } from "./flocking.options";

	export let state: typeof options = {
		...options
	};
</script>

<SketchControls bind:state on:reset {optionsImmutable} {options}>
	<fieldset>
		<legend>
			Behaviour
		</legend>
		<Range output bind:value="{state.boids}" name="boids" min="{10}" max="{250}">
			Boids
		</Range>
		<Switch bind:checked="{state.bound}" name="bound">
			Bound
		</Switch>
		<Range output bind:value="{state.align}" name="align" min="{0.1}" max="{2.5}" step="{0.01}">
			Align
		</Range>
		<Range output bind:value="{state.cohesion}" name="cohesion" min="{0.01}" max="{2}" step="{0.01}">
			Cohesion
		</Range>
		<Range output bind:value="{state.separate}" name="separate" min="{0.1}" max="{2.5}" step="{0.01}">
			Separation
		</Range>
	</fieldset>
	<fieldset>
		<legend>
			Appearance
		</legend>
		<Range output bind:value="{state.scale}" name="scale" min="{1}" max="{5}" step="{0.1}">
			Scale
		</Range>
	</fieldset>
	<fieldset>
		<legend>
			Quad Tree
		</legend>
		<Switch bind:checked="{state.qtree}" name="qtree">
			QuadTree optimization
		</Switch>
		<Switch bind:checked="{state.showQTree}" disabled="{!state.qtree}" name="showQTree">
			Show QuadTree
		</Switch>
		<Switch bind:checked="{state.showPerception}" disabled="{!state.qtree}" name="showPerception">
			Show Perception
		</Switch>
		<Range output bind:value="{state.perception}" disabled="{!state.qtree}" name="perception" min="{50}" max="{250}">
			Perception
		</Range>
	</fieldset>
</SketchControls>

<!-- <form on:submit|preventDefault on:change="{handleChange}">
	<fieldset>
		<legend>
			Behaviour
		</legend>
		<Range output bind:value="{state.boids}" name="boids" min="{10}" max="{250}">
			Boids
		</Range>
		<Switch bind:checked="{state.bound}" name="bound">
			Bound
		</Switch>
		<Range output bind:value="{state.align}" name="align" min="{0.1}" max="{2.5}" step="{0.01}">
			Align
		</Range>
		<Range output bind:value="{state.cohesion}" name="cohesion" min="{0.01}" max="{2}" step="{0.01}">
			Cohesion
		</Range>
		<Range output bind:value="{state.separate}" name="separate" min="{0.1}" max="{2.5}" step="{0.01}">
			Separation
		</Range>
	</fieldset>
	<fieldset>
		<legend>
			Appearance
		</legend>
		<Range output bind:value="{state.scale}" name="scale" min="{1}" max="{5}" step="{0.1}">
			Scale
		</Range>
	</fieldset>
	<fieldset>
		<legend>
			Quad Tree
		</legend>
		<Switch bind:checked="{state.qtree}" name="qtree">
			QuadTree optimization
		</Switch>
		<Switch bind:checked="{state.showQTree}" disabled="{!state.qtree}" name="showQTree">
			Show QuadTree
		</Switch>
		<Switch bind:checked="{state.showPerception}" disabled="{!state.qtree}" name="showPerception">
			Show Perception
		</Switch>
		<Range output bind:value="{state.perception}" disabled="{!state.qtree}" name="perception" min="{50}" max="{250}">
			Perception
		</Range>
	</fieldset>
	<Button on:click="{handleReset}">
		Reset
	</Button>
</form>
 -->