<script lang="ts">
	import styles from "./switch.module.css";

	export let className = "";
	export let disabled = false;
	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
</script>

<label class={`${styles.switch} ${className}`}>
	<slot />
	<input
		class={styles.input}
		{disabled}
		{name}
		type="checkbox"
		role="switch"
		{value}
		on:change
	/>
</label>
