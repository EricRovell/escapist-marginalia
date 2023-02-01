<script lang="ts" context="module">
	export interface Option {
		label: string;
		value: string;
		selected?: boolean;
	}
</script>

<script lang="ts">
	import styles from "./input-select.module.css";

	export let disabled = false;
	export let name: string;
	export let options: Option[];
	export let value: string = options
		.find(item => item.selected === true).value || "";
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
