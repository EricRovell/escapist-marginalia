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

<fieldset>
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
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		padding: var(--space-s);
		padding-top: var(--space-s);
		border: var(--border-1);
		border-radius: var(--radius-medium);
		font-size: var(--font-size-2);
	}

	legend {
		margin-bottom: var(--space-xs);
		text-transform: capitalize;
	}

	label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--font-size-1);
	}

	label:hover {		
		cursor: pointer;
		user-select: none;
	}
</style>