<script lang="ts">
	import { Range, SketchControls, Switch, InputColor } from "@components";
	import { options, optionsImmutable } from "./digital-rain.options";

	export let t: Record<string, string>;
	export let state: typeof options = {
		...options
	};

	const charOptions = new Set([
		"digits", "katakana", "math", "uppercaseLetters"
	]);

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const name = target.name;

		if (!charOptions.has(name)) {
			return;
		}

		const value = target.checked;

		if (value) {
			// @ts-expect-error It's fine, `Set` check was done
			state.chars = [ ...new Set([ ...state.chars, name ]) ];
		} else {
			state.chars = state.chars.filter(item => item != name);
		}
	};
</script>

<SketchControls bind:state on:reset {optionsImmutable} {options} on:change="{handleChange}">
	<fieldset>
		<legend>
			{t.general}
		</legend>
		<Range output bind:value="{state.scale}" name="scale" min="{1}" max="{25}">
			{t["font-size"]}
		</Range>
		<Range output bind:value="{state.depth}" name="depth" min="{0.01}" max="{1}" step="{0.01}">
			{t.depth}
		</Range>
		<InputColor bind:value="{state.color}" name="color">
			{t.color}
		</InputColor>
		<InputColor bind:value="{state.background}" name="background">
			{t.background}
		</InputColor>
	</fieldset>
	<fieldset>
		<legend>
			{t.behavior}
		</legend>
		<Switch bind:checked="{state.distributed}" name="distributed">
			{t.distributed}
		</Switch>
		<Switch bind:checked="{state.randomColors}" name="randomColors">
			{t["random-colors"]}
		</Switch>
	</fieldset>
	<fieldset>
		<legend>
			{t.symbols}
		</legend>
		<Switch name="digits" checked>
			{t.digits}
		</Switch>
		<Switch name="katakana" checked>
			{t.katakana}
		</Switch>
		<Switch name="math" checked>
			{t["math"]}
		</Switch>
		<Switch name="uppercaseLetters" checked>
			{t["uppercase"]}
		</Switch>
	</fieldset>
</SketchControls>
