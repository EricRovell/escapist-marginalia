<script lang="ts">
	import { validate } from "@utils/helpers";
	import type { Validator } from "@types";
	import styles from "./input-text.module.css";

	export let className = "";
	export let id: string | undefined = undefined;
	export let list: string | undefined = undefined;
	export let maxlength: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let name: string | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let readonly = false;
	export let required = false;
	export let size: number | undefined = undefined;
	export let spellcheck = false;
	export let value = "";
	export let validators: Validator<string>[] = [];

	let validity = {
		dirty: false,
		valid: true,
		message: ""
	};

	// for parent use
	export let valid = validity.valid;

	const handleInput = (e: InputEvent) => {
		if (!validity.dirty) {
			validity.dirty = true;
		}

		const target = e.target as HTMLInputElement;
		validity = validate(target.value, ...validators);
		valid = validity.valid;
	};
</script>

<label class="{styles.label} {className}">
	<slot />
	<input
		bind:value
		class="{styles.input}"
		class:valid="{validity.dirty && validity.valid}"
		class:invalid="{validity.dirty && !validity.valid}"
		{id}
		{list}
		{maxlength}
		{minlength}
		{name}
		on:input="{handleInput}"
		on:input
		{pattern}
		{placeholder}
		{readonly}
		{required}
		{size}
		{spellcheck}
		type="text"
	/>
	{#if validity.dirty && !validity.valid}
		<span class="{styles["error-message"]}">
			{validity.message}
		</span>
	{/if}
	<slot name="datalist" />
</label>
