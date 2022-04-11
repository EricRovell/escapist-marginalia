<script lang="ts" context="module">
	import type { SwitchGroupOptions } from "./switch.types";
</script>

<script lang="ts">
	import { Switch } from "@components";
	import styles from "./switch-group.module.css";

	export let legend: string;
	export let name: string;
	export let options: Array<SwitchGroupOptions>;
	
	export let group: string[] = [];

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { value, checked } = target;
		group = checked
			? [ ...group, value ]
			: group.filter(item => item !== value);
	};
</script>

<fieldset class={`card ${styles.fieldset}`}>
	<legend class={styles.legend}>{legend}</legend>
	{#each options as { label, value }}
		{@const disabled = group.length === 1 && group[0] === value}
		<Switch
			{disabled}
			{name}
			{value}
			on:change={handleChange}
		>
			{label}
		</Switch>
	{/each}
</fieldset>