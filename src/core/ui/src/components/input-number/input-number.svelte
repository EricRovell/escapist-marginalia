<script lang="ts">
	import { validate, type Validator } from "../../helpers/validator";
	import styles from "./input-number.module.css";

	export let className = "";
	export let id: string | undefined = undefined;
	export let list: string | undefined = undefined;
	export let max: number | undefined = undefined;
	export let min: number | undefined = undefined;
	export let name: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let readonly = false;
	export let required = false;
	export let step: number | undefined = undefined;
	export let value = 0;
	export let validators: Validator<number | string>[] = [];

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
		validity = validate(+target.value, ...validators);
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
		{max}
		{min}
		{name}
		on:input="{handleInput}"
		on:input
		{placeholder}
		{readonly}
		{required}
		{step}
		type="number"
		{...$$restProps}
	/>
	{#if validity.dirty && !validity.valid && validity.message}
		<span class="{styles["error-message"]}">
			{validity.message}
		</span>
	{/if}
	<slot name="datalist" />
</label>
