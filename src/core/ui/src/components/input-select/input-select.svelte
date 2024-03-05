<script lang="ts">
	import type { InputSelectOption } from "./input-select.types";
	import styles from "./input-select.module.css";

	export let disabled = false;
	export let name: string;
	export let options: InputSelectOption[] = [];
	export let value: string = options.find(item => item.selected === true)?.value || "";
</script>

<label class="{styles.wrapper}">
	<slot />
	<select
		bind:value
		class="{styles.select}"
		{disabled}
		{name}
		on:change
	>
		{#each options as { value, label, selected }}
			<option {value} {selected}>
				{label}
			</option>
		{/each}
	</select>
</label>
