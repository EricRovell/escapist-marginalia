<script lang="ts">
	import styles from "./input-color.module.css";

	export let className = "";
	export let disabled = false;
	export let id: string | undefined = undefined;
	export let list: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let required = false;
	export let value = "#000000";
</script>

<label class="{styles.label} {className}">
	<slot />
	<input
		bind:value
		class="{styles.input}"
		{disabled}
		{id}
		{list}
		{name}
		on:input
		{required}
		type="color"
	/>
	<slot name="datalist" />
</label>
