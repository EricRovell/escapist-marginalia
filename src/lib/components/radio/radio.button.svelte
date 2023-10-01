<script lang="ts">
	import { getContext } from "svelte";
	import styles from "./radio.module.css";

	export let checked = false;
	export let disabled = false;
	export let title: string | undefined = undefined;
	export let value: string | number;

	const { name } = getContext<{ name: string }>("name");
</script>

<label class="{styles.label}" {title}>
	<input
		{checked}
		class="{styles.radio}"
		{disabled}
		{name}
		on:change
		type="radio"
		{value}
	/>
	<span>
		<slot />
	</span>
</label>
