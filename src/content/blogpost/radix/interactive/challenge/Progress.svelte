<script lang="ts" context="module">
	import type { Settings } from "./challenge.types";
</script>

<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte";
	import { fade } from "svelte/transition";
	import { Button, MathExp } from "@components";
	import Keyboard from "./Keyboard.svelte";
	import { randInt } from "@utils/random";
	import { radix } from "@ericrovell/radix";
	import { decoder } from "../../util";
	import styles from "./challenge.module.css";

	export let settings: Settings;

	let dirty = false;
	let number = generateNumber();
	let valid = false;
	let value: string[] = [];

	const dispatch = createEventDispatcher();
	const t = getContext<Record<string, string>>("t");

	function generateNumber() {
		dirty = false;
		return randInt(settings.numberMin, settings.numberMax);
	}

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
	<span class="{styles.number}">
		{radix(number).setRadix(settings.radixFrom).toString()}<sub>{settings.radixFrom}</sub>
	</span>
	<MathExp
		math={!dirty ? String.raw`\to` : valid ? "=" : String.raw`\neq`}
	/>
	<span class="{styles.number}">
		{#if dirty}
			{value.join("")}<sub>{settings.radixTo}</sub>
		{:else}
			?<sub>{settings.radixTo}</sub>
		{/if}
	</span>
</section>
<section class="{styles["numerals-wrapper"]}">
	<ol class="{styles.numerals} custom-scroll inline">
		{#each value as char}
			<li class="{styles.numeral}">
				<span>{char}</span>
			</li>
		{:else}
			<li class="{styles["numerals-placeholder"]}">
				<p>{t["numerals-placeholder"]}</p>
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
			{valid ? t.correct : t.incorrect}
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
		{t["new-exercise"]}
	</Button>
	<Button on:click={() => number = generateNumber()}>
		{t["another-number"]}
	</Button>
</section>
