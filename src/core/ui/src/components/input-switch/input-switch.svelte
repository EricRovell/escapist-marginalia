<script lang="ts">
	import styles from "./input-switch.module.css";

	export let className = "";
	export let checked = false;
	export let disabled = false;
	export let name: string | undefined = undefined;
	export let value: string | undefined = "on";
</script>

<label class={`${styles.switch} ${className}`} class:disabled>
	<slot />
	<input
		aria-checked="{checked}"
		class={styles.input}
		bind:checked
		bind:value
		{disabled}
		{name}
		type="checkbox"
		role="switch"
		on:change
		{...$$restProps}
	/>
</label>
