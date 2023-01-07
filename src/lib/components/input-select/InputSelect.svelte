<script lang="ts" context="module">
	export interface Option {
		label: string;
		value: string;
	}
</script>

<script lang="ts">
	import styles from "./input-select.module.css";

	export let disabled = false;
	export let name: string;
	export let options: Option[];
	export let value: string;
</script>

<label class="{styles.wrapper}">
	<slot />
	<select
		bind:value
		class="{styles.select}"
		{disabled}
		{name}
	>
		{#each options as { value, label }}
			<option {value}>{label}</option>
		{/each}
	</select>
</label>
