<script lang="ts">
	import styles from "./input-range.module.css";

	export let className = "";
	export let disabled = false;
	export let element: HTMLInputElement | null = null;
	export let max = 100;
	export let min = 0;
	export let name = "";
	export let output = false;
	export let step = 1;
	export let value: number;
</script>

<label
	class="{styles.container} {className}"
	style:--range-max="{max}"
	style:--range-min="{min}"
	style:--range-value="{value}"
>
	<div>
		<slot />
	</div>
	<output
		class={styles.output}
		class:visible={output}
	>
		<slot name="output">
			{value}
		</slot>
	</output>
	<input
		bind:this="{element}"
		bind:value
		class={styles.range}
		class:min={value === min}
		{disabled}
		{name}
		{min}
		{max}
		{step}
		type="range"
		on:change
		on:input
		on:blur
	/>
</label>
