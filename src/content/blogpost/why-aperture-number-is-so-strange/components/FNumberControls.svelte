<script lang="ts">
	import { Radio } from "@components";
	import styles from "./f-number-controls.module.css";

	export let legend: string;
	export let name: string;
	export let value = 5.6;

	const fnumbers = [ 1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22 ];
</script>

<Radio.Group
	className={styles.radio}
	on:change={e => value = Number(e.target.value)}
	{name}
	{legend}
>
	{#each fnumbers as fnumber, i}
		<Radio.Button	value="{i.toString()}">
			f/{fnumber}
		</Radio.Button>
	{/each}
</Radio.Group>
