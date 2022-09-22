<script lang="ts">
	import styles from "./switch.module.css";

	export let className = "";
	export let checked = false;
	export let disabled = false;
	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
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
	/>
</label>
