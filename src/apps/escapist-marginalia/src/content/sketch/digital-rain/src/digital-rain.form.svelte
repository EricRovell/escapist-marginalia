<script lang="ts">
	import { getContext } from "svelte";
	import { InputColor, InputRange, InputSwitch } from "ui";

	import { SketchControls } from "$lib/components";
	import { DEFAULT_OPTIONS, IMMUTABLE_OPTIONS } from "./digital-rain.options";
	import type { Translation } from "../translations/types";

	export let state: typeof DEFAULT_OPTIONS = {
		...DEFAULT_OPTIONS
	};

	const t = getContext<Translation>("t");

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

<SketchControls
	bind:state
	on:change="{handleChange}"
	on:reset
	optionsImmutable="{IMMUTABLE_OPTIONS}"
	options="{DEFAULT_OPTIONS}"
>
	<fieldset>
		<legend>
			{t.GENERAL}
		</legend>
		<InputRange output bind:value="{state.scale}" name="scale" min="{1}" max="{25}">
			{t["font-size"]}
		</InputRange>
		<InputRange output bind:value="{state.depth}" name="depth" min="{0.01}" max="{1}" step="{0.01}">
			{t.DEPTH}
		</InputRange>
		<InputColor bind:value="{state.color}" name="color">
			{t.COLOR}
		</InputColor>
		<InputColor bind:value="{state.background}" name="background">
			{t.BACKGROUND}
		</InputColor>
	</fieldset>
	<fieldset>
		<legend>
			{t.BEHAVIOR}
		</legend>
		<InputSwitch bind:checked="{state.distributed}" name="distributed">
			{t.DISTRIBUTED}
		</InputSwitch>
		<InputSwitch bind:checked="{state.randomColors}" name="randomColors">
			{t.RANDOM_COLORS}
		</InputSwitch>
	</fieldset>
	<fieldset>
		<legend>
			{t.SYMBOLS}
		</legend>
		<InputSwitch name="digits" checked>
			{t.DIGITS}
		</InputSwitch>
		<InputSwitch name="katakana" checked>
			{t.KATAKANA}
		</InputSwitch>
		<InputSwitch name="math" checked>
			{t.MATH}
		</InputSwitch>
		<InputSwitch name="uppercaseLetters" checked>
			{t.UPPERCASE}
		</InputSwitch>
	</fieldset>
</SketchControls>
