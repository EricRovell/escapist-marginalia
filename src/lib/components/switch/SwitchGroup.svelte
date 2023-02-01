<script lang="ts" context="module">
	import type { SwitchGroupOptions } from "./switch.types";
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Switch from "./Switch.svelte";
	import Icon from "../icons/Icon.svelte";
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

<fieldset class={styles.fieldset} on:change={() => dispatch("switch", { group, name })}>
	<legend class={styles.legend}>{legend}</legend>
	{#each options as { checked, disabled, icon, label, value }}
		<Switch
			{checked}
			{disabled}
			{name}
			{value}
			on:change={handleChange}
		>
			{#if icon}
				<Icon
					path={icon}
					title={label}
				/>
			{/if}
			{label}
		</Switch>
	{/each}
</fieldset>