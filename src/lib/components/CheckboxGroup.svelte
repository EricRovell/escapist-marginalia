<script lang="ts" context="module">
	export interface Options {
		label: string;
		value: string;
		checked?: boolean;
	}
</script>

<script lang="ts">
	import { Switch } from "@components";

	export let legend: string;
	export let name: string;
	export let options: Array<Options>;
	
	export let group: string[] = [];

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { value, checked } = target;
		group = checked
			? [ ...group, value ]
			: group.filter(item => item !== value);
	};
</script>

<fieldset class="card">
	<legend>{legend}</legend>
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

<style>
	fieldset {
		font-size: var(--font-size-m);
	}

	legend {
		text-transform: capitalize;
		padding: 0 5px;
		white-space: nowrap;
	}
</style>