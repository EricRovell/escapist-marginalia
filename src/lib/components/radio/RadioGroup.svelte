<script lang="ts">
	import { setContext } from "svelte";
	import styles from "./radio.module.css";

	export let className = "";
	export let name: string;
	export let legend: string;

	setContext("name", {	name });
</script>

<fieldset class="{styles.fieldset} {className}" on:change>
	<legend>{legend}</legend>
	<slot />
</fieldset>
