<script lang="ts" context="module">
	import type { Settings } from "./challenge.types";
</script>

<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte";
	import { fade } from "svelte/transition";
	import { Button } from "ui";
	import { randInt } from "utils/random";

	import { Number, MathExp } from "../../components";
	import Keyboard from "./keyboard.svelte";
	import { radix } from "@ericrovell/radix";
	import { decoder } from "../../util";
	import type { Translation } from "../../translations/types";
	import styles from "./exercise.module.css";

	export let settings: Settings;

	const generateNumber = () => {
		dirty = false;
		return randInt(settings.numberMin, settings.numberMax);
	};

	let dirty = false;
	let number = generateNumber();
	let valid = false;
	let value: string[] = [];

	const dispatch = createEventDispatcher();
	const t = getContext<Translation>("t");

	const handleInput = (e: CustomEvent<{ key: string }>) => {
		dirty = false;
		const { key } = e.detail;
		if (key === "check") {
			dirty = true;
			valid =  number === radix(value, settings.radixTo, { decode: decoder }).decimal;
		}
	};

	const handleFinish = () => {
		value = [];
		dispatch("finish");
	};
</script>

<section class="{styles.numbers}">
	<Number
		number="{radix(number).setRadix(settings.radixFrom).toString()}"
		radix="{settings.radixFrom}"
	/>
	<MathExp
		math={!dirty ? String.raw`\to` : valid ? "=" : String.raw`\neq`}
	/>
	<Number
		number="{dirty ? value.join("") : "?"}"
		radix="{settings.radixTo}"
	/>
</section>
<section class="{styles["numerals-wrapper"]} wide">
	<ol class="{styles.numerals} custom-scroll inline">
		{#each value as char}
			<li class="{styles.numeral}">
				<span>{char}</span>
			</li>
		{:else}
			<li class="{styles["numerals-placeholder"]}">
				<p>{t.PLACEHOLDER_NUMERALS}</p>
			</li>
		{/each}
	</ol>
	{#if dirty}
		<output
			transition:fade|local
			class="{styles.status}"
			class:invalid={!valid}
			class:valid={valid}
		>
			{valid ? t.CORRECT : t.INCORRECT}
		</output>
	{/if}
</section>
<Keyboard
	bind:value
	maxlength={radix(number).setRadix(settings.radixTo).getRanks().length + 5}
	on:input={handleInput}
	radix="{settings.radixTo}"
/>
<section class="{styles.actions}">
	<Button on:click={handleFinish}>
		{t.NEW_EXERCISE}
	</Button>
	<Button on:click={() => number = generateNumber()}>
		{t.ANOTHER_NUMBER}
	</Button>
</section>
