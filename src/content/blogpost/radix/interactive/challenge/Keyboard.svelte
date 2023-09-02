<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte";
	import { Button, Icon } from "@components";
	import { iconDelete } from "@icons";
	import { radix36, buildPattern } from "../../util";
	import styles from "./keyboard.module.css";

	export let radix = 10;
	export let maxlength = 32;
	export let value: string[] = [];

	const t: Record<string, string> = getContext("t")["exercise"];
	const dispatch = createEventDispatcher();

	$: pattern = buildPattern(radix);

	/**
	 * Handles the value management.
	 */
	const handleInput = (key: string) => {
		if (key === "check") {
			dispatch("input", { key: "check" });
			return;
		}

		else if (key === "undo") {
			value = value.slice(0, -1);
			return;
		}

		else if (key === "reset") {
			value = [];
			return;
		}

		else if (value.length < maxlength) {
			value = [ ...value, key ];
		}
	};

	/**
	 * Handles button clicks inside the form.
	 * One event listener instead each for each button.
	 */
	const handleClick = (e: MouseEvent) => {
		const el = e.target as HTMLElement;

		if (el.nodeName !== "BUTTON") {
			return;
		}

		const key = el.dataset.key;

		dispatch("input", { key });
		handleInput(key);
	};

	/**
	 * Handles the keyboard input when the form is focused.
	 */
	const handleKeypress = (e: KeyboardEvent) => {
		const key = e.key;
		dispatch("input", { key });

		if (key === "Backspace") {
			handleInput("undo");
		}

		if (key === "Delete") {
			handleInput("reset");
		}

		if (key === "Enter") {
			handleInput("check");
		}

		if (pattern.test(key)) {
			handleInput(key.toUpperCase());
		}
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- eslint-disable-next-line svelte/valid-compile -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form
	on:click={handleClick}
	tabindex="0"
	on:keydown={handleKeypress}
	class="{styles.keyboard}"
	on:submit|preventDefault
>
	{#each radix36(radix) as numeral, index}
		<Button
			className="{styles.char}"
			data-key="{numeral}"
			disabled="{value.length >= maxlength}"
			title="{index.toString()}"
		>
			{numeral}
		</Button>
	{/each}
	<Button
		className="{styles.char}"
		data-key="undo"
		disabled="{!value.length}"
		title="{t.undo}"
	>
		<Icon path="{iconDelete}" />
	</Button>
	<Button
		disabled="{!value.length}"
		data-key="reset"
		title="{t.reset}"
	>
		{t.reset}
	</Button>
	<Button
		disabled="{!value.length}"
		data-key="check"
		title="{t.check}"
	>
		{t.check}
	</Button>
</form>
