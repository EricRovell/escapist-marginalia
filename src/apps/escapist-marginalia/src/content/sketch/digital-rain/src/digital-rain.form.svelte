<script lang="ts">
	import { InputColor, InputRange, InputSwitch } from "ui";

	import { SketchControls } from "@components";
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
		<InputRange output bind:value="{state.scale}" name="scale" min="{1}" max="{25}">
			{t["font-size"]}
		</InputRange>
		<InputRange output bind:value="{state.depth}" name="depth" min="{0.01}" max="{1}" step="{0.01}">
			{t.depth}
		</InputRange>
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
		<InputSwitch bind:checked="{state.distributed}" name="distributed">
			{t.distributed}
		</InputSwitch>
		<InputSwitch bind:checked="{state.randomColors}" name="randomColors">
			{t["random-colors"]}
		</InputSwitch>
	</fieldset>
	<fieldset>
		<legend>
			{t.symbols}
		</legend>
		<InputSwitch name="digits" checked>
			{t.digits}
		</InputSwitch>
		<InputSwitch name="katakana" checked>
			{t.katakana}
		</InputSwitch>
		<InputSwitch name="math" checked>
			{t["math"]}
		</InputSwitch>
		<InputSwitch name="uppercaseLetters" checked>
			{t["uppercase"]}
		</InputSwitch>
	</fieldset>
</SketchControls>
