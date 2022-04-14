<script lang="ts" context="module">
	import type { SwitchGroupOptions } from "./switch.types";
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Switch } from "@components";
	import styles from "./switch-group.module.css";

	export let legend: string;
	export let name: string;
	export let options: Array<SwitchGroupOptions>;	
	export let group: string[] = [];

	const dispatch = createEventDispatcher();

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { value, checked } = target;
		group = checked
			? [ ...group, value ]
			: group.filter(item => item !== value);
	};
</script>

<fieldset class={`card ${styles.fieldset}`} on:change={() => dispatch("switch", { group, name })}>
	<legend class={styles.legend}>{legend}</legend>
	{#each options as { checked, disabled, label, value }}
		<Switch
			{checked}
			{disabled}
			{name}
			{value}
			on:change={handleChange}
		>
			{label}
		</Switch>
	{/each}
</fieldset>