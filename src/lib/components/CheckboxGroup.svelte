<script lang="ts" context="module">
	export interface Options {
		label: string;
		value: string;
		checked?: boolean;
	}
</script>

<script lang="ts">
	export let legend: string;
	export let name: string;
	export let options: Array<Options>;
	
	export let group: string[] = [];
</script>

<fieldset class="card">
	<legend>{legend}</legend>
	{#each options as { label, value }}
		<label>
			<input
				type="checkbox"
				{name}
				{value}
				bind:group
				disabled={group.length === 1 && group[0] === value}
			/>
			{label}
		</label>
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

	label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--font-size-s);
	}

	label:hover {		
		cursor: pointer;
		user-select: none;
	}

	input {
		width: 1.25em;
		height: 1.25em;
	}
</style>