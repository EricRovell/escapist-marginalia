<script lang="ts" context="module">
	import type { Color, ColorString } from "./input-color.types";
	import {
		convertColorToString,
		getContrast,
		parseColorString
	} from "./input-color.helpers";
</script>

<script lang="ts">
	import Picker from "./input-color.picker.svelte";
	import { Modal } from "../modal";
	import { clickOutside, shortcut } from "$lib/actions";
	import { media } from "$lib/stores";
	import styles from "./input-color.module.css";

	export let disabled = false;
	export let name: string;
	export let open = false;
	export let value: ColorString = "hsl(0 50% 50% / 1)";
	export let valueAsObject: Color = parseColorString(value);

	// stores the picked color in order to restore the state on cancel
	let temporalValue: Color = { ...valueAsObject };

	let picker: HTMLFormElement;
	let swatch: HTMLOutputElement;
	let position = "bottom";

	let hiddenInput: HTMLInputElement;

	export const close = () => open = false;

	const handleCancel = () => {
		temporalValue = { ...valueAsObject };
		close();
	};

	const handleSelect = (e: CustomEvent<Color>) => {
		valueAsObject = e.detail;
		value = convertColorToString(e.detail);
		valueAsObject = { ...temporalValue };

		hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
		close();
	};

	const handlePointerDown = () => {
		if (open || $media["mobile"]) {
			return;
		}

		const swatchRect = swatch.getBoundingClientRect();
		const pickerRect = picker.getBoundingClientRect();
		let newPosition = "";

		if (swatchRect.bottom + pickerRect.height > window.innerHeight) {
			newPosition = "up";
		} else {
			newPosition = "down";
		}

		if (swatchRect.right + pickerRect.width > window.innerWidth) {
			newPosition += "-left";
		} else {
			newPosition += "-right";
		}

		position = newPosition;
	};
</script>

<details
	bind:open
	class="{styles["color-picker"]}"
	class:top="{position.includes("up")}"
	class:right="{position.includes("right")}"
	class:disabled
	use:clickOutside={{
		active: !$media["mobile"] && open,
		callback: handleCancel
	}}
	use:shortcut={{
		active: !$media["mobile"] && open,
		code: "Escape",
		callback: node => {
			handleCancel();
			node.querySelector("summary").focus();
		}
	}}
	on:pointerdown="{handlePointerDown}"
>
	<summary>
		<span>
			<slot />
		</span>
		<output
			bind:this="{swatch}"
			class="{styles.swatch}"
			style="
				--input-color-value: {value};
				--input-color-contrast: {getContrast(valueAsObject)}"
		/>
	</summary>
	{#if !$media["mobile"]}
		<Picker
			bind:element="{picker}"
			bind:valueAsObject="{temporalValue}"
			focusTrap
			{name}
			on:cancel="{handleCancel}"
			on:cancel
			on:change
			on:select="{handleSelect}"
			on:select
			{open}
		/>
	{/if}
	<input type="text" {name} bind:value bind:this="{hiddenInput}" class="{styles.hidden}" />
</details>

{#if $media["mobile"]}
	<Modal bind:open on:close="{handleCancel}">
		<Picker
			bind:element="{picker}"
			bind:valueAsObject="{temporalValue}"
			className="{styles.modal}"
			{name}
			on:cancel="{handleCancel}"
			on:cancel
			on:change
			on:select="{handleSelect}"
			on:select
			{open}
		/>
	</Modal>
{/if}
