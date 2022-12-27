<script lang="ts">
	import { Range, SketchControls, Switch, InputColor } from "@components";
	import { options, optionsImmutable } from "./digital-rain.options";

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
			Letters
		</legend>
		<Range output bind:value="{state.scale}" name="scale" min="{1}" max="{25}">
			Font Size
		</Range>
		<Range output bind:value="{state.depth}" name="depth" min="{0.01}" max="{1}" step="{0.01}">
			Rain depth
		</Range>
		<InputColor bind:value="{state.color}">
			Color
		</InputColor>
	</fieldset>
	<fieldset>
		<legend>
			Behaviour
		</legend>
		<Range output bind:value="{state.fade}" name="fade" min="{0.05}" max="{0.25}" step="{0.001}">
			Fading
		</Range>
		<Switch bind:checked="{state.distributed}" name="distributed">
			Distributed
		</Switch>
	</fieldset>
	<fieldset>
		<legend>
			Symbols
		</legend>
		<Switch name="digits" checked>
			Digits
		</Switch>
		<Switch name="katakana" checked>
			Katakana
		</Switch>
		<Switch name="math" checked>
			Math Symbols
		</Switch>
		<Switch name="uppercaseLetters" checked>
			Uppercase Letters
		</Switch>
	</fieldset>
</SketchControls>
