<script lang="ts" context="module">
	import type { Color } from "./input-color.types";
	import { colorDefault, convertColorToString } from "./input-color.helpers";
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { InputRange } from "../input-range";
	import { Button } from "../button";
	import { trapFocus } from "../../actions";
	import { t } from "./locale";
	import styles from "./input-color.module.css";

	export let className = "";
	export let element: HTMLFormElement | null = null;
	export let focusTrap = false;
	export let locale: string = "en";
	export let open = false;
	export let name: string;
	export let value = "hsl(0 50% 50% / 1)";
	export let valueAsObject: Color = colorDefault;

	const dispatch = createEventDispatcher();

	const handleCancel = () => {
		dispatch("cancel");
	};

	const handleSelect = () => {
		dispatch("select", valueAsObject);
	};

	const handleChange = (e: Event) => {
		e.stopImmediatePropagation();
	};

	$: value = convertColorToString(valueAsObject);
</script>

<form
	bind:this="{element}"
	class="{styles.form} {className}"
	on:change
	on:submit|preventDefault="{handleSelect}"
	style="
		--input-color-hue: {valueAsObject.hue};
		--input-color-saturation: {valueAsObject.saturation}%;
		--input-color-lightness: {valueAsObject.lightness}%;"
	use:trapFocus="{{
		active: focusTrap && open,
		selector: "input[type=range], button"
	}}"
>
	<header>
		{t[locale].HEADER}
		<output
			class="{styles.swatch}"
			style="--input-color-value: {value};"
		/>
	</header>
	<fieldset>
		<InputRange
			bind:value="{valueAsObject.hue}"
			className="{styles.hue}"
			name="{name}-hue"
			max="{360}"
			output
			on:change="{handleChange}"
		>
			{t[locale].HUE}
		</InputRange>
		<InputRange
			bind:value="{valueAsObject.saturation}"
			className="{styles.saturation}"
			name="{name}-saturation"
			output
			on:change="{handleChange}"
		>
			{t[locale].SATURATION}
		</InputRange>
		<InputRange
			bind:value="{valueAsObject.lightness}"
			className="{styles.lightness}"
			name="{name}-lightness"
			output
			on:change="{handleChange}"
		>
			{t[locale].LIGHTNESS}
		</InputRange>
		<InputRange
			bind:value="{valueAsObject.opacity}"
			className="{styles.opacity}"
			max="{1}"
			name="{name}-opacity"
			output
			on:change="{handleChange}"
			step="{0.01}"
		>
			{t[locale].OPACITY}
		</InputRange>
	</fieldset>
	<fieldset>
		<Button type="submit" appearance="ghost">
			{t[locale].SELECT}
		</Button>
		<Button type="button" on:click="{handleCancel}" appearance="ghost">
			{t[locale].CANCEL}
		</Button>
	</fieldset>
</form>
