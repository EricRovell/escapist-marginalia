<script lang="ts">
	import { setContext } from "svelte";
	import styles from "./radio.module.css";

	export let className = "";
	export let name: string;
	export let legend: string | undefined = undefined;

	setContext("name", { name });
</script>

<fieldset class="{styles.fieldset} {className}" on:change>
	<legend>
		<slot name="title">
			{legend}
		</slot>
	</legend>
	<slot />
</fieldset>
