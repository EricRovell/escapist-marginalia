<script lang="ts">
	import { getContext } from "svelte";
	import { Button, InputNumber } from "@components";
	import type { Settings } from "./challenge.types";
	import styles from "./setup.module.css";

	const t = getContext<Record<string, string>>("t");

	export let settings: Settings = {
		numberMin: 16,
		numberMax: 255,
		radixFrom: 10,
		radixTo: 2
	};
</script>

<form class="{styles.form}" on:submit|preventDefault>
	<h4>{t.setup}</h4>
	<InputNumber
		min="{1}"
		max="{10 ** 6 - 1}"
		name="number-min"
		value="{settings.numberMin}"
	>
		{t["number-min"]}
	</InputNumber>
	<InputNumber
		min="{2}"
		max="{10 ** 6}"
		name="number-max"
		value="{settings.numberMax}"
	>
		{t["number-max"]}
	</InputNumber>
	<InputNumber
		min="{2}"
		max="{36}"
		name="radix-from"
		value="{settings.radixFrom}"
	>
		{t["radix-from"]}
	</InputNumber>
	<InputNumber
		min="{2}"
		max="{36}"
		name="radix-to"
		value="{settings.radixTo}"
	>
		{t["radix-to"]}
	</InputNumber>
	<Button type="submit">
		{t.begin}
	</Button>
</form>
