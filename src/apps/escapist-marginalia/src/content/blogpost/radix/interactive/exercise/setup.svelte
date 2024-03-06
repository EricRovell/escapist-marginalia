<script lang="ts">
	import { getContext } from "svelte";
	import { Button, InputNumber } from "ui";

	import type { Settings } from "./challenge.types";
	import type { Translation } from "../../translations/types";
	import styles from "./setup.module.css";

	const t = getContext<Translation>("t");

	export let settings: Settings = {
		numberMin: 16,
		numberMax: 255,
		radixFrom: 10,
		radixTo: 2
	};
</script>

<form class="{styles.form}" on:submit|preventDefault>
	<h4>{t.SETUP}</h4>
	<InputNumber
		min="{1}"
		max="{10 ** 6 - 1}"
		name="number-min"
		value="{settings.numberMin}"
	>
		{t.NUMBER_MIN}
	</InputNumber>
	<InputNumber
		min="{2}"
		max="{10 ** 6}"
		name="number-max"
		value="{settings.numberMax}"
	>
		{t.NUMBER_MAX}
	</InputNumber>
	<InputNumber
		min="{2}"
		max="{36}"
		name="radix-from"
		value="{settings.radixFrom}"
	>
		{t.RADIX_FROM}
	</InputNumber>
	<InputNumber
		min="{2}"
		max="{36}"
		name="radix-to"
		value="{settings.radixTo}"
	>
		{t.RADIX_TO}
	</InputNumber>
	<Button type="submit">
		{t.BEGIN}
	</Button>
</form>
