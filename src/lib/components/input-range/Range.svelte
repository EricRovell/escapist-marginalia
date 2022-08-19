<script lang="ts">
	import styles from "./range.module.css";

	export let disabled = false;
	export let max = 100;
	export let min = 0;
	export let step = 1;
	export let tooltip = false;
	export let value: number;
</script>

<label
	class={styles.container}
	class:tooltip
	style:--range-max="{max}"
	style:--range-min="{min}"
	style:--range-value="{value}"
>
	<slot />
	<input
		bind:value
		class={styles.range}
		class:min={value === min}
		{disabled}
		{min}
		{max}
		{step}
		type="range"
		on:change
	/>
	<output class={styles.output} class:visually-hidden={!tooltip}>
		{value}
	</output>
</label>