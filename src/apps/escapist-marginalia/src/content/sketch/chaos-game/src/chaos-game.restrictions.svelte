<script lang="ts">
	import type { VerticeRestrictionRule } from "chaos-game";
	import { Button, InputText, InputNumber, InputSwitch } from "ui";
	import { clamp } from "utils/math";
	import { getContext } from "svelte";
	import type { Translation } from "../translations/types";

	export let sides: number;
	export let forbidden = false;
	export let value: VerticeRestrictionRule[] = [];

	const t = getContext<Translation>("t");

	let input: VerticeRestrictionRule[] = [];

	const addItem = () => {
		if (input.length >= sides) {
			return;
		}

		input = [ ...input, {
			index: -1 - 1 * input.length,
			values: [],
			forbidden
		}];
	};

	const removeItems = () => {
		input = [];
		value = [];
	};

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const index = target.dataset.index;

		if (target.type === "checkbox") {
			input[index].forbidden = target.checked;
		}

		if (target.type === "number") {
			input[index].index = clamp(+target.value, -sides, -1);
		}

		if (target.type === "text") {
			const distances = target.value.split(",").map(value => {
				return clamp(Number(value), 1, sides);
			});

			input[index].values = [ ...new Set(distances) ];
		}

		value = [];

		for (const rule of input) {
			if (!value.length || value.some(item => item.index !== rule.index)) {
				value = [ ...value, rule ];
			}
		}
	};
</script>

<fieldset on:input="{handleChange}">
	<legend>
		<slot />
	</legend>
	{#if !input.length}
		<aside class="message">
			<p class="message">
				{t.MESSAGE_RESTRICTIONS_1}
			</p>
			<p>
				{t.MESSAGE_RESTRICTIONS_2}
			</p>
		</aside>
	{/if}
	{#if input.length}
		<div class="rule labels">
			<span>{t.VERTICE}</span>
			<span>{t.DISTANCES}</span>
			<span>{t.FORBIDDEN}</span>
		</div>
	{/if}
	{#each input as _, i}
		<div class="rule">
			<InputNumber value="{-1 - 1 * i}" name="restrictions" data-index="{i}" min="{-sides}" max="{-1}" />
			<InputText name="restrictions" data-index="{i}" placeholder="{t.PLACEHOLDER_DISTANCES}" />
			<InputSwitch name="restrictions" data-index="{i}" />
		</div>
	{/each}
	<div class="controls">
		<Button on:click={addItem} disabled="{input.length === sides}">
			{t.ADD_RULE}
		</Button>
		<Button appearance="outline"  on:click="{removeItems}" disabled="{input.length === 0}">
			{t.RESET}
		</Button>
	</div>
</fieldset>

<style>
	.rule {
		display: grid;
		grid-template: 1fr / 10ch 1fr auto;
		align-items: center;
		gap: var(--space-5-rel);
		font-size: var(--font-size-00);
	}

	.labels {
		align-items: flex-start;
	}

	.controls {
		display: grid;
		grid-template: 1fr / 1fr 1fr;
		justify-self: center;
		gap: var(--space-3);
		width: fit-content;
		margin-block-start: var(--space-2-rel);
		font-size: var(--font-size-00);
	}

	.message {
		display: grid;
		gap: var(--space-2-rel);
		color: var(--surface-2-text-less-contrast);
	}
</style>
