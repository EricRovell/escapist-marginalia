<script lang="ts" context="module">
	import type { Color } from "./input-color.types";
	import {
		convertColorToString,
		getContrast,
		parseColorString
	} from "./input-color.helpers";
</script>

<script lang="ts">
	import Picker from "./InputColorPicker.svelte";
	import { Modal } from "../modal";
	import { clickOutside, shortcut } from "$lib/actions";
	import { media } from "$lib/stores";
	import styles from "./input-color.module.css";

	export let disabled = false;
	export let name: string;
	export let open = false;
	export let value = "hsl(0 50% 50% / 1)";
	export let valueAsObject: Color = parseColorString(value);

	console.log(valueAsObject);

	let picker: HTMLFormElement;
	let swatch: HTMLOutputElement;
	let position = "bottom";

	let hiddenInput: HTMLInputElement;

	export const close = () => open = false;

	const handleCancel = () => {
		valueAsObject = valueAsObject;
		close();
	};

	const handleSubmit = (e: CustomEvent<Color>) => {
		valueAsObject = e.detail;
		value = convertColorToString(e.detail);

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
		callback: close
	}}
	use:shortcut={{
		active: !$media["mobile"] && open,
		code: "Escape",
		callback: node => {
			close();
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
			focusTrap
			{name}
			on:change
			on:pick="{handleSubmit}"
			on:cancel="{handleCancel}"
			{open}
			{value}
			{valueAsObject}
		/>
	{/if}
	<input type="text" {name} bind:value bind:this="{hiddenInput}" class="{styles.hidden}" />
</details>

{#if $media["mobile"]}
	<Modal bind:open>
		<Picker
			className="{styles.modal}"
			{name}
			on:change
			on:pick="{handleSubmit}"
			on:cancel="{handleCancel}"
			{open}
			{value}
			{valueAsObject}
		/>
	</Modal>
{/if}
